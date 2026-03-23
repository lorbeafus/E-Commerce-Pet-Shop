import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getProducts, categories } from "../../data/products.js"
import ItemList from "../ItemList/itemList.jsx"
import "./ItemListContainer.css"

const ItemListContainer = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)
    const catId = categoryId || "all"
    setActiveCategory(catId)
    
    getProducts(catId).then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [categoryId])

  return (
    <div className="item-list-container">
      {/* Hero Section - only on home */}
      {!categoryId && (
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-content">
              <span className="hero-badge">🐾 #1 Tienda de Mascotas</span>
              <h1 className="hero-title">
                Todo lo que tu Mascota Necesita para una Vida más Feliz y Saludable
              </h1>
              <p className="hero-text">
                Creemos que las mascotas merecen más que solo cuidados — merecen amor, comodidad y diversión todos los días.
              </p>
              <Link to="/category/all" className="hero-cta">
                Comprar Colección Premium
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
              <div className="hero-social-proof">
                <div className="hero-avatars">
                  <span className="hero-avatar" style={{background: '#FFD93D'}}>😊</span>
                  <span className="hero-avatar" style={{background: '#6BCB77'}}>😄</span>
                  <span className="hero-avatar" style={{background: '#4D96FF'}}>🥰</span>
                </div>
                <span className="hero-rating-text">
                  <strong>Calificación 4.9/5</strong> Elegida por más de 245K dueños de mascotas
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-container">
                <div className="hero-paw-bg">🐕</div>
                <div className="hero-floating-badge hero-floating-badge-top">
                  ✨ Ajuste y Comodidad Perfectos
                </div>
                <div className="hero-floating-badge hero-floating-badge-bottom">
                  🎾 Juguetes en Tendencia
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Title */}
      {categoryId && (
        <div className="category-header">
          <Link to="/" className="back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Volver al Inicio
          </Link>
          <h1 className="category-title">
            {categories.find(c => c.id === categoryId)?.label || "Todos los Productos"}
          </h1>
        </div>
      )}

      {/* Bestsellers Section */}
      <section className="bestsellers">
        {!categoryId && (
          <>
            <h2 className="section-title">Nuestros Más Vendidos</h2>
            <p className="section-subtitle">
              Descubre lo que nuestros clientes dicen sobre su experiencia con nuestros productos
            </p>
          </>
        )}

        {/* Category Filter Pills */}
        <div className="category-filters">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === "all" ? "/" : `/category/${cat.id}`}
              className={`filter-pill ${activeCategory === cat.id ? "filter-pill-active" : ""}`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Cargando productos...</p>
          </div>
        ) : (
          <ItemList products={products} />
        )}
      </section>
    </div>
  )
}

export default ItemListContainer
