import { db } from "./config"
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDoc } from "firebase/firestore"

/**
 * Creates a new order in Firestore and updates product stock
 * @param {Object} order - Order data containing buyer info, items, and total
 * @returns {Promise<string>} - The ID of the created order
 */
export const createOrder = async (order) => {
  try {
    const ordersCollection = collection(db, "orders")
    
    // Add timestamp to the order
    const orderWithTimestamp = {
      ...order,
      date: serverTimestamp()
    }

    // 1. Create the order
    const docRef = await addDoc(ordersCollection, orderWithTimestamp)
    const orderId = docRef.id

    // 2. Update stock for each item in the order (Optional but professional)
    for (const item of order.items) {
        const productRef = doc(db, "products", item.id)
        const productSnap = await getDoc(productRef)
        
        if (productSnap.exists()) {
            const currentStock = productSnap.data().stock || 0
            await updateDoc(productRef, {
                stock: Math.max(0, currentStock - item.quantity)
            })
        }
    }

    return orderId
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}
