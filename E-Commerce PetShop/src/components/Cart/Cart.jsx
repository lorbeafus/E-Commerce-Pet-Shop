import { useCart } from "../context/CartContext.jsx"
import { Link } from "react-router-dom"
import "./Cart.css"

const Cart = () => {
    const { cart, clearCart, removeFromCart, totalPrice, totalQuantity } = useCart()

    if (totalQuantity === 0) {
        return (
            <div className="cart-empty">
                <div className="cart-empty-content">
                    <span className="cart-empty-icon">🛒</span>
                    <h1>Tu carrito está vacío</h1>
                    <p>Parece que aún no has añadido nada al carrito. ¡Explora nuestros productos!</p>
                    <Link to="/" className="cart-empty-btn">Ver Productos</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">Tu Carrito ({totalQuantity} items)</h1>
            
            <div className="cart-content">
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="cart-item-info">
                                <h3>{item.title}</h3>
                                <p className="cart-item-category">{item.category}</p>
                            </div>
                            <div className="cart-item-quantity">
                                <span className="cart-label">Cantidad</span>
                                <span className="cart-value">{item.quantity}</span>
                            </div>
                            <div className="cart-item-price">
                                <span className="cart-label">Precio Unit.</span>
                                <span className="cart-value">${item.price.toFixed(2)}</span>
                            </div>
                            <div className="cart-item-subtotal">
                                <span className="cart-label">Subtotal</span>
                                <span className="cart-value">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <button 
                                className="cart-item-remove" 
                                onClick={() => removeFromCart(item.id)}
                                aria-label="Eliminar producto"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Resumen de compra</h2>
                    <div className="cart-summary-row">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="cart-summary-row">
                        <span>Envío</span>
                        <span>{totalPrice >= 50 ? "Gratis" : "$10.00"}</span>
                    </div>
                    <div className="cart-summary-total">
                        <span>Total</span>
                        <span>${(totalPrice >= 50 ? totalPrice : totalPrice + 10).toFixed(2)}</span>
                    </div>
                    
                    <div className="cart-summary-actions">
                        <button className="cart-checkout-btn">Finalizar Compra</button>
                        <button className="cart-clear-btn" onClick={clearCart}>Vaciar Carrito</button>
                        <Link to="/" className="cart-continue-link">Continuar comprando</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
