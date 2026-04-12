import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getProducts } from "../../data/products.js"
import ItemList from "../ItemList/itemList.jsx"
import { useLanguage } from "../context/LanguageContext.jsx"
import heroDog from "../../assets/img/perro.png"
import "./ItemListContainer.css"

// Map category IDs to their translation keys
const CATEGORY_KEYS = {
  all: "cat_all",
  food: "cat_food",
  toys: "cat_toys",
  grooming: "cat_grooming",
  collars: "cat_collars",
  accessories: "cat_accessories",
}

const CATEGORY_IDS = ["all", "food", "toys", "grooming", "collars", "accessories"]

const ItemListContainer = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const { categoryId } = useParams()
  const { t } = useLanguage()

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
              <span className="hero-badge">{t("hero_badge")}</span>
              <h1 className="hero-title">
                {t("hero_title")}
              </h1>
              <p className="hero-text">
                {t("hero_text")}
              </p>
              <Link to="/category/all" className="hero-cta">
                {t("hero_cta")}
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
                  <strong>{t("hero_rating")}</strong> {t("hero_rating_sub")}
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-container">
                <img src={heroDog} alt="Happy Dog" className="hero-dog-image" />
                <div className="hero-floating-badge hero-floating-badge-top">
                  {t("hero_badge_top")}
                </div>
                <div className="hero-floating-badge hero-floating-badge-bottom">
                  {t("hero_badge_bottom")}
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
            {t("back_home")}
          </Link>
          <h1 className="category-title">
            {t(CATEGORY_KEYS[categoryId]) || t("all_products")}
          </h1>
        </div>
      )}

      {/* Bestsellers Section */}
      <section className="bestsellers">
        {!categoryId && (
          <>
            <h2 className="section-title">{t("bestsellers_title")}</h2>
            <p className="section-subtitle">
              {t("bestsellers_subtitle")}
            </p>
          </>
        )}

        {/* Category Filter Pills */}
        <div className="category-filters">
          {CATEGORY_IDS.map((id) => (
            <Link
              key={id}
              to={id === "all" ? "/" : `/category/${id}`}
              className={`filter-pill ${activeCategory === id ? "filter-pill-active" : ""}`}
            >
              {t(CATEGORY_KEYS[id])}
            </Link>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>{t("loading")}</p>
          </div>
        ) : (
          <ItemList products={products} />
        )}
      </section>
    </div>
  )
}

export default ItemListContainer
