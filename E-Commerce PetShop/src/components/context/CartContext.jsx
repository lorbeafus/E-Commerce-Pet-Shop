import { createContext, useState, useContext } from "react"

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (item, quantity) => {
        if (isInCart(item.id)) {
            setCart(cart.map((cartItem) => 
                cartItem.id === item.id 
                ? { ...cartItem, quantity: cartItem.quantity + quantity } 
                : cartItem
            ))
        } else {
            setCart([...cart, { ...item, quantity }])
        }
    }

    const removeFromCart = (itemId) => {
        setCart(cart.filter((item) => item.id !== itemId))
    }

    const clearCart = () => {
        setCart([])
    }

    const isInCart = (id) => {
        return cart.some((item) => item.id === id)
    }

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)
    
    const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0)

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            clearCart, 
            isInCart,
            totalQuantity,
            totalPrice 
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext