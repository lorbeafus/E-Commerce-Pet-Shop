import { Link } from "react-router-dom"
import "./ItemDetail.css"

const ItemDetail = ({ product }) => {
  const { title, description, price, originalPrice, discount, rating, reviews, image, colors, category } = product

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
        Volver a Productos
      </Link>

      <div className="detail-grid">
        {/* Image */}
        <div className="detail-image-section">
          <div className="detail-image-wrapper">
            {discount > 0 && (
              <span className="detail-badge">{discount}% Dto</span>
            )}
            <img src={image} alt={title} className="detail-image" />
          </div>
        </div>

        {/* Info */}
        <div className="detail-info">
          <span className="detail-category">{category}</span>
          <h1 className="detail-title">{title}</h1>

          <div className="detail-rating">
            <div className="detail-stars">{renderStars(rating)}</div>
            <span className="detail-rating-number">{rating}</span>
            <span className="detail-reviews">({reviews} reseñas)</span>
          </div>

          <div className="detail-pricing">
            <span className="detail-price">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="detail-original-price">${originalPrice.toFixed(2)}</span>
            )}
            {discount > 0 && (
              <span className="detail-discount-tag">Ahorra {discount}%</span>
            )}
          </div>

          <p className="detail-description">{description}</p>

          {colors && colors.length > 0 && (
            <div className="detail-colors-section">
              <span className="detail-colors-label">Colores disponibles</span>
              <div className="detail-colors">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    className="detail-color-btn"
                    style={{ background: color }}
                    aria-label={`Opción de color ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="detail-quantity">
            <span className="detail-quantity-label">Cantidad</span>
            <div className="detail-quantity-controls">
              <button className="detail-qty-btn">−</button>
              <span className="detail-qty-value">1</span>
              <button className="detail-qty-btn">+</button>
            </div>
          </div>

          <div className="detail-actions">
            <button className="detail-add-to-cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Agregar al Carrito
            </button>
            <button className="detail-wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
          </div>

          <div className="detail-features">
            <div className="detail-feature">
              <span className="detail-feature-icon">🚚</span>
              <span>Envío gratis a partir de $50</span>
            </div>
            <div className="detail-feature">
              <span className="detail-feature-icon">↩️</span>
              <span>Política de devolución de 30 días</span>
            </div>
            <div className="detail-feature">
              <span className="detail-feature-icon">✅</span>
              <span>100% calidad garantizada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
