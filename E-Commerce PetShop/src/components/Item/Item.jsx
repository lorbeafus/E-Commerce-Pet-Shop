import { Link } from "react-router-dom"
import "./Item.css"

const Item = ({ product }) => {
  const { id, title, price, originalPrice, discount, rating, reviews, image, colors } = product

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
      <Link to={`/detail/${id}`} className="item-card-link">
        <div className="item-card-image-wrapper">
          {discount > 0 && (
            <span className="item-card-badge">{discount}% Dto</span>
          )}
          <img
            src={image}
            alt={title}
            className="item-card-image"
            loading="lazy"
          />
        </div>

        <div className="item-card-body">
          <div className="item-card-rating">
            <div className="item-card-stars">{renderStars(rating)}</div>
            <span className="item-card-reviews">({reviews} Reseñas)</span>
          </div>

          <h3 className="item-card-title">{title}</h3>

          {colors && colors.length > 0 && (
            <div className="item-card-colors">
              {colors.map((color, i) => (
                <span
                  key={i}
                  className="item-card-color"
                  style={{ background: color }}
                />
              ))}
            </div>
          )}

          <div className="item-card-pricing">
            <span className="item-card-price">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="item-card-original-price">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>

      <button className="item-card-cart-btn" aria-label="Agregar al carrito">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      </button>
    </article>
  )
}

export default Item
