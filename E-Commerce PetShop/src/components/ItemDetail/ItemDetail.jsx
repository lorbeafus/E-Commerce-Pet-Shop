import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext.jsx"
import { useLanguage } from "../context/LanguageContext.jsx"
import "./ItemDetail.css"

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()
  const { t, language } = useLanguage()

  const { price, originalPrice, discount, rating, reviews, image, colors, category, stock } = product
  const displayTitle = product[`title_${language}`] || product.title_es || product.title
  const displayDescription = product[`description_${language}`] || product.description_es || product.description

  // Fix for local images if they start with / and aren't Cloudinary URLs
  const getProductImage = (path) => {
    if (!path) return ""
    if (path.startsWith("http")) return path
    const baseUrl = import.meta.env.BASE_URL
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl
    return `${cleanBase}${path}`
  }

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const onAdd = () => {
    if (stock > 0) {
      addToCart(product, quantity)
      setAdded(true)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`detail-star ${i < fullStars ? "detail-star-filled" : "detail-star-empty"}`}>
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <div className="item-detail">
      <Link to="/" className="detail-back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        {t("detail_back")}
      </Link>

      <div className="detail-grid">
        {/* Image */}
        <div className="detail-image-section">
          <div className="detail-image-wrapper">
            {discount > 0 && (
              <span className="detail-badge">{discount}% {t("detail_discount_badge")}</span>
            )}
            <img src={getProductImage(image)} alt={displayTitle} className="detail-image" />
          </div>
        </div>

        {/* Info */}
        <div className="detail-info-column">
          <div className="detail-header">
            <div className="detail-category-badge">{category}</div>
            <h1 className="detail-title">{displayTitle}</h1>
          </div>

          <div className="detail-rating">
            <div className="detail-stars">{renderStars(rating)}</div>
            <span className="detail-rating-number">{rating}</span>
            <span className="detail-reviews">({reviews} {t("detail_reviews")})</span>
          </div>

          <div className="detail-pricing">
            <span className="detail-price">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="detail-original-price">${originalPrice.toFixed(2)}</span>
            )}
            {discount > 0 && (
              <span className="detail-discount-tag">{t("detail_save")} {discount}%</span>
            )}
          </div>

          <p className="detail-description">{displayDescription}</p>

          <div className="detail-stock-status">
            {stock > 0 ? (
              <span className="stock-in"><span className="dot"></span> {t("stock_available")}: {stock}</span>
            ) : (
              <span className="stock-out"><span className="dot"></span> {t("out_of_stock")}</span>
            )}
          </div>

          {colors && colors.length > 0 && (
            <div className="detail-colors-section">
              <span className="detail-colors-label">{t("detail_colors_label")}</span>
              <div className="detail-colors">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    className="detail-color-btn"
                    style={{ background: color }}
                    aria-label={`${t("detail_color_option")} ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {!added ? (
            <>
              <div className="detail-quantity">
                <span className="detail-quantity-label">{t("detail_quantity_label")}</span>
                <div className="detail-quantity-controls">
                  <button className="detail-qty-btn" onClick={handleDecrement} disabled={stock <= 0}>−</button>
                  <span className="detail-qty-value">{stock > 0 ? quantity : 0}</span>
                  <button className="detail-qty-btn" onClick={handleIncrement} disabled={stock <= 0 || quantity >= stock}>+</button>
                </div>
              </div>

              <div className="detail-actions">
                <button 
                  className="detail-add-to-cart" 
                  onClick={onAdd}
                  disabled={stock <= 0}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                    <path d="M3 6h18"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  {t("detail_add_to_cart")}
                </button>
                <button className="detail-wishlist">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="detail-actions">
              <Link to="/cart" className="detail-finish-btn">
                {t("detail_go_to_cart")}
              </Link>
              <Link to="/" className="detail-continue-btn">
                {t("detail_continue")}
              </Link>
            </div>
          )}

          <div className="detail-features">
            <div className="detail-feature">
              <span className="detail-feature-icon">🚚</span>
              <span>{t("detail_shipping")}</span>
            </div>
            <div className="detail-feature">
              <span className="detail-feature-icon">↩️</span>
              <span>{t("detail_returns")}</span>
            </div>
            <div className="detail-feature">
              <span className="detail-feature-icon">✅</span>
              <span>{t("detail_quality")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
