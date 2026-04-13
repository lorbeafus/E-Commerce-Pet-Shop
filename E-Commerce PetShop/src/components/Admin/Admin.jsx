import { useState, useEffect } from "react"
import { db } from "../../firebase/config"
import { collection, addDoc } from "firebase/firestore"
import { categories, getProducts, updateProduct, deleteProduct } from "../../firebase/productService"
import { useLanguage } from "../context/LanguageContext"
import { useAuth } from "../context/AuthContext"
import "./Admin.css"

const Admin = () => {
  const { t } = useLanguage()
  const { user, login, logout, loading: authLoading } = useAuth()
  
  // Login States
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  // Admin States
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
    reviews: 0,
    stock: 0
  })

  useEffect(() => {
    if (user) {
      fetchProducts()
    }
  }, [user])

  const fetchProducts = async () => {
    const data = await getProducts("all")
    setProducts(data)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError("")
    setLoginLoading(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(loginEmail)) {
      setLoginError("Por favor, ingresa un formato de email válido.")
      setLoginLoading(false)
      return
    }

    try {
      await login(loginEmail, loginPassword)
    } catch (err) {
      console.error(err)
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setLoginError("Credenciales incorrectas. Verifica tu email y contraseña.")
      } else {
        setLoginError("Ocurrió un error al intentar iniciar sesión.")
      }
    } finally {
      setLoginLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "originalPrice" || name === "discount" || name === "stock"
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
      // Validaciones detalladas
      if (!formData.title_es.trim() || !formData.title_pt.trim()) {
        throw new Error("Los títulos no pueden estar vacíos o contener solo espacios.")
      }

      if (Number(formData.price) <= 0) {
        throw new Error("El precio debe ser un número mayor a 0.")
      }

      if (Number(formData.discount) < 0 || Number(formData.discount) > 100) {
        throw new Error("El descuento debe estar entre 0 y 100.")
      }

      if (Number(formData.stock) < 0 || !Number.isInteger(Number(formData.stock))) {
        throw new Error("El stock debe ser un número entero mayor o igual a 0.")
      }

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
        discount: Number(formData.discount),
        stock: Number(formData.stock)
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
      reviews: 0,
      stock: 0
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

  // Render Login if no user
  if (!user) {
    return (
      <div className="admin-container login-view">
        <div className="admin-overlay"></div>
        <div className="admin-card login-card">
          <div className="admin-header login-header">
            <div className="admin-icon login-logo">🐾</div>
            <h1>Acceso Administrativo</h1>
            <p>Ingresa tus credenciales para gestionar la tienda</p>
          </div>

          <form className="admin-form login-form" onSubmit={handleLogin}>
            {loginError && <div className="admin-error login-error">{loginError}</div>}
            
            <div className="form-group login-group">
              <label htmlFor="loginEmail">Email</label>
              <div className="input-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input 
                  type="email" id="loginEmail" required 
                  value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@petshop.com"
                />
              </div>
            </div>

            <div className="form-group login-group">
              <label htmlFor="loginPassword">Contraseña</label>
              <div className="input-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input 
                  type="password" id="loginPassword" required 
                  value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="admin-btn-primary login-btn" disabled={loginLoading}>
              {loginLoading ? "Iniciando sesión..." : "Entrar al Panel"}
            </button>
          </form>

          <div className="admin-footer login-footer">
            <p>© 2026 PetShop Admin - Sistema Seguro</p>
          </div>
        </div>
      </div>
    )
  }

  // Render Dashboard if logged in
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
              <div className="form-group">
                <label>Stock Disponible</label>
                <input type="number" name="stock" required value={formData.stock} onChange={handleChange} />
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
                  <p className="admin-prod-stock">Stock: {product.stock ?? 0}</p>
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
