import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";
import products from "../data/products";

export const seedDatabase = async () => {
  try {
    const productsCollection = collection(db, "products");
    
    for (const product of products) {
      // We exclude the local ID to let Firebase generate its own, 
      // or we can keep it if we want to use specific IDs.
      await addDoc(productsCollection, product);
    }
    
    console.log("¡Base de datos sembrada con éxito! 🐾");
    alert("¡Base de datos sembrada con éxito!");
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
    alert("Error al sembrar la base de datos. Revisa la consola.");
  }
};
