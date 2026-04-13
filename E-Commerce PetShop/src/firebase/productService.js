import { db } from "./config"
import { collection, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

export const categories = [
  { id: "all", label: "cat_all" },
  { id: "food", label: "cat_food" },
  { id: "toys", label: "cat_toys" },
  { id: "grooming", label: "cat_grooming" },
  { id: "collars", label: "cat_collars" },
  { id: "accessories", label: "cat_accessories" }
]

export const getProducts = async (categoryId) => {
  try {
    const productsCollection = collection(db, "products")
    let q

    if (categoryId && categoryId !== "all") {
      q = query(productsCollection, where("category", "==", categoryId))
    } else {
      q = productsCollection
    }

    const querySnapshot = await getDocs(q)
    const products = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id }
    } else {
      console.log("No such product!")
      return null
    }
  } catch (error) {
    console.error("Error fetching product by id:", error)
    return null
  }
}

export const updateProduct = async (id, data) => {
  try {
    const docRef = doc(db, "products", id)
    await updateDoc(docRef, data)
    return true
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}

export const deleteProduct = async (id) => {
  try {
    const docRef = doc(db, "products", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting product:", error)
    throw error
  }
}
