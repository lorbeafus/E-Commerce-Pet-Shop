import { useCart } from "../context/CartContext.jsx"
import { useLanguage } from "../context/LanguageContext.jsx"
import { Link } from "react-router-dom"
import "./Cart.css"

const Cart = () => {
    const { cart, clearCart, removeFromCart, totalPrice, totalQuantity } = useCart()
    const { t } = useLanguage()

    // Fix for local images if they start with / and aren't Cloudinary URLs
    const getProductImage = (path) => {
        if (!path) return ""
        if (path.startsWith("http")) return path
        const baseUrl = import.meta.env.BASE_URL
        const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl
        return `${cleanBase}${path}`
    }

    if (totalQuantity === 0) {
        return (
            <div className="cart-empty">
                <div className="cart-empty-content">
                    <span className="cart-empty-icon">🛒</span>
                    <h1>{t("cart_empty_title")}</h1>
                    <p>{t("cart_empty_text")}</p>
                    <Link to="/" className="cart-empty-btn">{t("cart_empty_btn")}</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">{t("cart_title")} ({totalQuantity} {t("cart_items")})</h1>
            
            <div className="cart-content">
                <div className="cart-items">
                            </div>
                            <div className="cart-item-subtotal">
                                <span className="cart-label">{t("cart_subtotal")}</span>
                                <span className="cart-value">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <button 
                                className="cart-item-remove" 
                                onClick={() => removeFromCart(item.id)}
                                aria-label={t("cart_remove_aria")}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>{t("cart_summary_title")}</h2>
                    <div className="cart-summary-row">
                        <span>{t("cart_subtotal")}</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="cart-summary-row">
                        <span>{t("cart_shipping")}</span>
                        <span>{totalPrice >= 50 ? t("cart_shipping_free") : "$10.00"}</span>
                    </div>
                    <div className="cart-summary-total">
                        <span>{t("cart_total")}</span>
                        <span>${(totalPrice >= 50 ? totalPrice : totalPrice + 10).toFixed(2)}</span>
                    </div>
                    
                    <div className="cart-summary-actions">
                        <button className="cart-checkout-btn">{t("cart_checkout")}</button>
                        <button className="cart-clear-btn" onClick={clearCart}>{t("cart_clear")}</button>
                        <Link to="/" className="cart-continue-link">{t("cart_continue")}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
