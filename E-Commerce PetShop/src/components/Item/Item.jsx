import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext.jsx"
import { useCart } from "../context/CartContext.jsx"
import "./Item.css"

const Item = ({ product }) => {
  const { id, price, originalPrice, discount, rating, reviews, image, colors } = product
  const { t, language } = useLanguage()
  const { addToCart } = useCart()
  
  const displayTitle = product[`title_${language}`] || product.title_es || product.title
  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)

  // Auto-hide toast after 2 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const getProductImage = (path) => {
    if (!path) return ""
    if (path.startsWith("http")) return path
    const baseUrl = import.meta.env.BASE_URL
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl
    return `${cleanBase}${path}`
  }

  const handleIncrement = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setQuantity(prev => prev + 1)
  }

  const handleDecrement = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (quantity > 1) setQuantity(prev => prev - 1)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, quantity)
    setShowToast(true)
    setQuantity(1) // Reset quantity after adding
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < fullStars ? "star-filled" : "star-empty"}`}>
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <article className="item-card">
      {showToast && (
        <div className="item-card-toast">
          {t("cart_added_success")}
        </div>
      )}

      <Link to={`/detail/${id}`} className="item-card-link">
        <div className="item-card-image-wrapper">
          {discount > 0 && (
            <span className="item-card-badge">{discount}% {t("item_discount")}</span>
          )}
          <img
            src={getProductImage(image)}
            alt={displayTitle}
            className="item-card-image"
            loading="lazy"
          />
        </div>

        <div className="item-card-body">
          <div className="item-card-rating">
            <div className="item-card-stars">{renderStars(rating)}</div>
            <span className="item-card-reviews">({reviews} {t("item_reviews")})</span>
          </div>

          <h3 className="item-card-title">{displayTitle}</h3>

          <div className="item-card-pricing">
            <span className="item-card-price">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="item-card-original-price">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>

      <div className="item-card-actions">
        <div className="item-card-counter" onClick={(e) => e.stopPropagation()}>
          <button className="item-card-qty-btn" onClick={handleDecrement}>−</button>
          <span className="item-card-qty-value">{quantity}</span>
          <button className="item-card-qty-btn" onClick={handleIncrement}>+</button>
        </div>
        
        <button className="item-card-add-btn" onClick={handleAddToCart}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {t("detail_add_to_cart")}
        </button>
      </div>
    </article>
  )
}

export default Item
