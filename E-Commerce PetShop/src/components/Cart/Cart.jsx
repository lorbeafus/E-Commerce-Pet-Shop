import { useState } from "react"
import { useCart } from "../context/CartContext.jsx"
import { useLanguage } from "../context/LanguageContext.jsx"
import { Link } from "react-router-dom"
import { createOrder } from "../../firebase/orderService.js"
import "./Cart.css"

const Cart = () => {
    const { cart, clearCart, removeFromCart, totalPrice, totalQuantity } = useCart()
    const { t, language } = useLanguage()
    
    // Checkout states
    const [showCheckout, setShowCheckout] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [buyer, setBuyer] = useState({
        name: "",
        phone: "",
        email: "",
        emailConfirm: ""
    })
    const [error, setError] = useState("")

    const getProductImage = (path) => {
        if (!path) return ""
        if (path.startsWith("http")) return path
        const baseUrl = import.meta.env.BASE_URL
        const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl
        return `${cleanBase}${path}`
    }

    const handleInputChange = (e) => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        // Regex patterns
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        const phoneRegex = /^[0-9\s\-+()]+$/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!buyer.name || !buyer.phone || !buyer.email) {
            setError(t("checkout_error_fields"))
            return
        }

        if (!buyer.name.trim() || !nameRegex.test(buyer.name)) {
            setError(t("checkout_error_name"))
            return
        }

        if (!phoneRegex.test(buyer.phone)) {
            setError(t("checkout_error_phone"))
            return
        }

        if (!emailRegex.test(buyer.email)) {
            setError(t("checkout_error_email_format"))
            return
        }

        if (buyer.email !== buyer.emailConfirm) {
            setError(t("checkout_error_email"))
            return
        }

        setLoading(true)

        const order = {
            buyer: {
                name: buyer.name,
                phone: buyer.phone,
                email: buyer.email
            },
            items: cart.map(item => ({
                id: item.id,
                title: item[`title_${language}`] || item.title_es || item.title,
                price: item.price,
                quantity: item.quantity
            })),
            total: totalPrice >= 50 ? totalPrice : totalPrice + 10
        }

        try {
            const id = await createOrder(order)
            setOrderId(id)
            clearCart()
        } catch (err) {
            console.error(err)
            setError("Error al procesar la orden")
        } finally {
            setLoading(false)
        }
    }

    // Success Screen
    if (orderId) {
        return (
            <div className="cart-success">
                <div className="cart-success-content">
                    <span className="success-icon">🎉</span>
                    <h1>{t("checkout_success_title")}</h1>
                    <p>{t("checkout_order_id")}:</p>
                    <div className="order-badge">{orderId}</div>
                    <Link to="/" className="success-btn">{t("cart_continue")}</Link>
                </div>
            </div>
        )
    }

    // Empty Cart Screen
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
            {!showCheckout ? (
                <>
                    <h1 className="cart-title">{t("cart_title")} ({totalQuantity} {t("cart_items")})</h1>
                    <div className="cart-content">
                        <div className="cart-items">
                            {cart.map((item) => {
                                const displayTitle = item[`title_${language}`] || item.title_es || item.title
                                return (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-image">
                                            <img src={getProductImage(item.image)} alt={displayTitle} />
                                        </div>
                                        <div className="cart-item-info">
                                            <h3>{displayTitle}</h3>
                                            <p className="cart-item-category">{item.category}</p>
                                        </div>
                                        <div className="cart-item-quantity">
                                            <span className="cart-label">{t("cart_quantity")}</span>
                                            <span className="cart-value">{item.quantity}</span>
                                        </div>
                                        <div className="cart-item-price">
                                            <span className="cart-label">{t("cart_unit_price")}</span>
                                            <span className="cart-value">${item.price.toFixed(2)}</span>
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
                                )
                            })}
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
                                <button className="cart-checkout-btn" onClick={() => setShowCheckout(true)}>{t("cart_checkout")}</button>
                                <button className="cart-clear-btn" onClick={clearCart}>{t("cart_clear")}</button>
                                <Link to="/" className="cart-continue-link">{t("cart_continue")}</Link>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="checkout-container">
                    <button className="checkout-back" onClick={() => setShowCheckout(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                        Volver al Carrito
                    </button>
                    <div className="checkout-card">
                        <h2>{t("checkout_form_title")}</h2>
                        <form className="checkout-form" onSubmit={handleSubmit}>
                            {error && <div className="checkout-error">{error}</div>}
                            <div className="checkout-group">
                                <label>{t("checkout_name")}</label>
                                <input type="text" name="name" required value={buyer.name} onChange={handleInputChange} />
                            </div>
                            <div className="checkout-group">
                                <label>{t("checkout_phone")}</label>
                                <input type="tel" name="phone" required value={buyer.phone} onChange={handleInputChange} />
                            </div>
                            <div className="checkout-group">
                                <label>{t("checkout_email")}</label>
                                <input type="email" name="email" required value={buyer.email} onChange={handleInputChange} />
                            </div>
                            <div className="checkout-group">
                                <label>{t("checkout_email_confirm")}</label>
                                <input type="email" name="emailConfirm" required value={buyer.emailConfirm} onChange={handleInputChange} />
                            </div>
                            <button type="submit" className="checkout-submit-btn" disabled={loading}>
                                {loading ? "..." : t("checkout_submit")}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart

