import { useState, useEffect } from "react"
import { db } from "../../firebase/config"
import { collection, addDoc } from "firebase/firestore"
import { categories, getProducts, updateProduct, deleteProduct } from "../../firebase/productService"
import { useLanguage } from "../context/LanguageContext"
import { useAuth } from "../context/AuthContext"
import "./Admin.css"

const Admin = () => {
  const { t } = useLanguage()
  const { logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  
  const [formData, setFormData] = useState({
    title_es: "",
    title_pt: "",
    description_es: "",
    description_pt: "",
    price: "",
    originalPrice: "",
    category: "food",
    discount: 0,
    rating: 5,
    reviews: 0
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const data = await getProducts("all")
    setProducts(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "originalPrice" || name === "discount" 
        ? parseFloat(value) || 0 
        : value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      throw new Error("Faltan las credenciales de Cloudinary en el archivo .env")
    }
    
    const formDataCloudinary = new FormData()
    formDataCloudinary.append("file", file)
    formDataCloudinary.append("upload_preset", uploadPreset)

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formDataCloudinary
      })
      
      const data = await response.json()

      if (!response.ok || !data.secure_url) {
        throw new Error(data.error?.message || "Cloudinary error")
      }

      return data.secure_url
    } catch (error) {
      console.error("Cloudinary upload failed:", error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = formData.image || ""

      // 1. Upload new image if provided
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile)
      } else if (!isEditing && !imageUrl) {
        throw new Error("Por favor, selecciona una imagen.")
      }

      const productData = {
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discount: Number(formData.discount)
      }

      if (isEditing) {
        // Update logic
        await updateProduct(editingId, productData)
        alert("¡Producto actualizado con éxito! ✨")
      } else {
        // Create logic
        const productsCollection = collection(db, "products")
        await addDoc(productsCollection, productData)
        alert("¡Producto creado con éxito! 🐾")
      }
      
      handleReset()
      fetchProducts()
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    // Normalize data for editing (handle legacy fields)
    const normalizedProduct = {
      ...product,
      title_es: product.title_es || product.title || "",
      title_pt: product.title_pt || "",
      description_es: product.description_es || product.description || "",
      description_pt: product.description_pt || ""
    }
    setFormData(normalizedProduct)
    setEditingId(product.id)
    setIsEditing(true)
    setImagePreview(getProductImage(product.image))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.")) {
      try {
        await deleteProduct(id)
        alert("Producto eliminado.")
        fetchProducts()
      } catch (error) {
        alert("Error al eliminar.")
      }
    }
  }

  const handleReset = () => {
    setFormData({
      title_es: "",
      title_pt: "",
      description_es: "",
      description_pt: "",
      price: "",
      originalPrice: "",
      category: "food",
      discount: 0,
      rating: 5,
      reviews: 0
    })
    setIsEditing(false)
    setEditingId(null)
    setImageFile(null)
    setImagePreview(null)
  }

  const getProductImage = (path) => {
    if (!path) return ""
    if (path.startsWith("http")) return path
    const baseUrl = import.meta.env.BASE_URL
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl
    return `${cleanBase}${path}`
  }

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-header">
          <div className="admin-header-main">
            <span className="admin-icon">⚙️</span>
            <h1>Panel de Administración</h1>
            <p>Gestiona los datos de tu Pet Shop</p>
          </div>
          <button className="admin-logout-btn" onClick={logout} title="Cerrar Sesión">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Salir
          </button>
        </div>

        <div className="admin-section">
          <div className="section-header">
            <h2>
              {isEditing ? (
                <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Editar Producto</>
              ) : (
                <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg> Crear Nuevo Producto</>
              )}
            </h2>
            {isEditing && (
              <button className="admin-btn-cancel" onClick={handleReset}>Cancelar Edición</button>
            )}
          </div>
          
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Título (Español)</label>
                <input type="text" name="title_es" required value={formData.title_es} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Título (Português)</label>
                <input type="text" name="title_pt" required value={formData.title_pt} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Precio Actual ($)</label>
                <input type="number" name="price" step="0.01" required value={formData.price} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  {categories.filter(c => c.id !== "all").map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Precio Origen ($)</label>
                <input type="number" name="originalPrice" step="0.01" value={formData.originalPrice} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Desc. (%)</label>
                <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Foto {isEditing ? "(Opcional si no deseas cambiarla)" : ""}</label>
              <div className="file-upload-wrapper">
                <input type="file" accept="image/*" onChange={handleFileChange} required={!isEditing} />
                {imagePreview && (
                  <div className="admin-image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Descripción (ES)</label>
                <textarea name="description_es" required rows="2" value={formData.description_es} onChange={handleChange}></textarea>
              </div>
              <div className="form-group">
                <label>Descrição (PT)</label>
                <textarea name="description_pt" required rows="2" value={formData.description_pt} onChange={handleChange}></textarea>
              </div>
            </div>

            <button type="submit" className={`admin-btn-primary ${isEditing ? "btn-update" : ""}`} disabled={loading}>
              {loading ? "..." : (isEditing ? "💾 Actualizar Cambios" : "✨ Guardar Producto")}
            </button>
          </form>
        </div>

        {/* Product Management Section */}
        <div className="admin-section">
          <h2>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Listado de Productos
          </h2>
          <div className="admin-products-grid">
            {products.map(product => (
              <div key={product.id} className="admin-product-card">
                <div className="admin-prod-img">
                  <img src={getProductImage(product.image)} alt="" />
                </div>
                <div className="admin-prod-info">
                  <h3>{product.title_es || product.title}</h3>
                  <p className="admin-prod-price">${product.price.toFixed(2)}</p>
                  <p className="admin-prod-cat">{product.category}</p>
                </div>
                <div className="admin-prod-actions">
                  <button className="btn-edit" onClick={() => handleEdit(product)} title="Editar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(product.id)} title="Eliminar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-footer">
          <p>© 2026 Admin Pet Shop - Gestión Total</p>
        </div>
      </div>
    </div>
  )
}

export default Admin
