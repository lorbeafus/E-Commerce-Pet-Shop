import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { db } from "../../firebase/config"
import { collection, addDoc } from "firebase/firestore"
import { categories } from "../../firebase/productService"
import "./Admin.css"

const Admin = () => {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "food",
    discount: 0,
    rating: 5,
    reviews: 0
  })

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
      // Show preview
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
        console.error("Error de Cloudinary:", data)
        throw new Error(data.error?.message || "Cloudinary no pudo procesar la imagen.")
      }

      return data.secure_url
    } catch (error) {
      console.error("Error al subir a Cloudinary:", error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!imageFile) return alert("Por favor, selecciona una imagen.")
    
    setLoading(true)

    try {
      // 1. Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(imageFile)

      // 2. Save to Firestore
      const productsCollection = collection(db, "products")
      await addDoc(productsCollection, {
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discount: Number(formData.discount)
      })
      
      alert("¡Producto creado y foto subida con éxito! 🐾✨")
      
      // Reset form
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
      setImageFile(null)
      setImagePreview(null)
    } catch (error) {
      console.error("Error en el proceso:", error)
      alert(error.message || "Error al crear el producto. Revisa la consola y tus configuraciones.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-header">
          <span className="admin-icon">⚙️</span>
          <h1>Panel de Administración</h1>
          <p>Gestiona los datos y configuraciones de tu Pet Shop</p>
        </div>

        {/* Section: Create Product */}
        <div className="admin-section">
          <h2>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Crear Nuevo Producto
          </h2>
          
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title_es">Título (Español)</label>
                <input 
                  type="text" id="title_es" name="title_es" required
                  value={formData.title_es} onChange={handleChange}
                  placeholder="Ej: Cama Acolchada"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title_pt">Título (Português)</label>
                <input 
                  type="text" id="title_pt" name="title_pt" required
                  value={formData.title_pt} onChange={handleChange}
                  placeholder="Ex: Cama Acolchoada"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Precio Actual ($)</label>
                <input 
                  type="number" id="price" name="price" step="0.01" required
                  value={formData.price} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange}>
                  {categories.filter(c => c.id !== "all").map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="originalPrice">Precio Original ($)</label>
                <input 
                  type="number" id="originalPrice" name="originalPrice" step="0.01"
                  value={formData.originalPrice} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="discount">Descuento (%)</label>
                <input 
                  type="number" id="discount" name="discount"
                  value={formData.discount} onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="image">Foto del Producto (.jpg, .png)</label>
              <div className="file-upload-wrapper">
                <input 
                  type="file" id="image" name="image" accept="image/*" required
                  onChange={handleFileChange}
                />
                {imagePreview && (
                  <div className="admin-image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="description_es">Descripción (Español)</label>
                <textarea 
                  id="description_es" name="description_es" required rows="2"
                  value={formData.description_es} onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="description_pt">Descrição (Português)</label>
                <textarea 
                  id="description_pt" name="description_pt" required rows="2"
                  value={formData.description_pt} onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                  </svg>
                  Subiendo...
                </span>
              ) : "✨ Guardar Producto"}
            </button>
          </form>
        </div>

        <div className="admin-footer">
          <p>© 2026 Admin Pet Shop - Acceso Restringido</p>
        </div>
      </div>
    </div>
  )
}

export default Admin
