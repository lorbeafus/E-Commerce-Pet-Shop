import { db } from "../firebase/config"
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"

export const categories = [
  { id: "all", label: "Todos" },
  { id: "food", label: "Alimentos y Premios" },
  { id: "toys", label: "Juguetes" },
  { id: "grooming", label: "Higiene" },
  { id: "collars", label: "Collares y Correas" },
  { id: "accessories", label: "Accesorios" }
];

export const getProducts = async (categoryId) => {
  try {
    const productsCollection = collection(db, "products");
    let q;
    
    if (categoryId && categoryId !== "all") {
      q = query(productsCollection, where("category", "==", categoryId));
    } else {
      q = productsCollection;
    }
    
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such product!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
};

// We keep the old data here just as reference for the seed script
const products = [
  {
    id: 1,
    title_es: "Anillo Masticable Premium",
    title_pt: "Anel Mastigável Premium",
    description_es: "Juguete resistente de goma natural para perros. Ideal para la salud dental y horas de diversión. Diseñado para masticar sin riesgo.",
    description_pt: "Brinquedo de borracha natural durável para cães. Ideal para saúde dental e horas de diversão. Projetado para mastigar sem riscos.",
    price: 12.99,
    originalPrice: 16.99,
    discount: 20,
    category: "toys",
    rating: 4.8,
    reviews: 362,
    image: "/product_chew_ring.png",
    colors: ["#5BA89D", "#E8C87A", "#D4756B"]
  },
  {
    id: 2,
    title_es: "Hueso de Madera Natural",
    title_pt: "Osso de Madeira Natural",
    description_es: "Hueso de madera natural para masticar. Sin químicos, 100% seguro para tu mascota. Perfecto para cachorros y perros adultos.",
    description_pt: "Osso de madeira natural para mastigar. Sem produtos químicos, 100% seguro para o seu animal de estimação. Perfeito para filhotes e cães adultos.",
    price: 9.99,
    originalPrice: 14.99,
    discount: 33,
    category: "toys",
    rating: 4.6,
    reviews: 193,
    image: "/product_wooden_bone.png",
    colors: ["#D4A574", "#8B6F47"]
  },
  {
    id: 3,
    title_es: "Juguete de Cuerda de Algodón",
    title_pt: "Brinquedo de Corda de Algodão",
    description_es: "Cuerda de algodón trenzado para jugar a tirar. Refuerza el vínculo con tu mascota mientras se divierte.",
    description_pt: "Corda de algodão trançada para cabo de guerra. Fortalece o vínculo com seu pet enquanto ele se diverte.",
    price: 8.49,
    originalPrice: 11.99,
    discount: 29,
    category: "toys",
    rating: 4.7,
    reviews: 248,
    image: "/product_rope_toy.png",
    colors: ["#C9B896", "#887656"]
  },
  {
    id: 4,
    title_es: "Alimento Premium para Perros",
    title_pt: "Ração Premium para Cães",
    description_es: "Alimento premium con ingredientes naturales seleccionados. Rico en proteínas y nutrientes esenciales para una dieta balanceada.",
    description_pt: "Alimento premium com ingredientes naturais selecionados. Rico em proteínas e nutrientes essenciais para uma dieta balanceada.",
    price: 34.99,
    originalPrice: 42.99,
    discount: 19,
    category: "food",
    rating: 4.9,
    reviews: 587,
    image: "/product_dog_food.png",
    colors: []
  },
  {
    id: 5,
    title_es: "Collar de Cuero para Perros",
    title_pt: "Coleira de Couro para Cães",
    description_es: "Collar de cuero genuino con hebilla dorada. Elegante, resistente y cómodo para el uso diario de tu mascota.",
    description_pt: "Coleira de couro legítimo com fivela dourada. Elegante, resistente e confortável para o uso diário do seu pet.",
    price: 24.99,
    originalPrice: 32.99,
    discount: 24,
    category: "collars",
    rating: 4.8,
    reviews: 315,
    image: "/product_collar.png",
    colors: ["#C4956A", "#2C1B0E", "#8B4513"]
  },
  {
    id: 6,
    title_es: "Shampoo de Aseo para Mascotas",
    title_pt: "Shampoo de Higiene para Pets",
    description_es: "Shampoo de aseo con ingredientes naturales. Limpia suavemente, deja el pelo suave y brillante con un aroma fresco.",
    description_pt: "Shampoo de higiene com ingredientes naturais. Limpa suavemente, deixa os pelos macios e brilhantes com um aroma fresco.",
    price: 15.99,
    originalPrice: 19.99,
    discount: 20,
    category: "grooming",
    rating: 4.5,
    reviews: 204,
    image: "/product_shampoo.png",
    colors: []
  },
  {
    id: 7,
    title_es: "Cama Acogedora para Mascotas",
    title_pt: "Cama Aconchegante para Pets",
    description_es: "Cama redonda ultra suave de felpa. El lugar perfecto para que tu mascota descanse cómodamente durante todo el día.",
    description_pt: "Cama redonda de pelúcia ultra macia. O lugar perfeito para seu pet descansar confortavelmente o dia todo.",
    price: 45.99,
    originalPrice: 59.99,
    discount: 23,
    category: "accessories",
    rating: 4.9,
    reviews: 421,
    image: "/product_chew_ring.png",
    colors: ["#C8D7BD", "#E8D5B7", "#9BA88E"]
  },
  {
    id: 8,
    title_es: "Premios Naturales para Perros",
    title_pt: "Petiscos Naturais para Cães",
    description_es: "Galletas orgánicas horneadas con ingredientes 100% naturales. El snack saludable que tu perro merece.",
    description_pt: "Biscoitos orgânicos assados com ingredientes 100% naturais. O lanche saudável que seu cão merece.",
    price: 11.99,
    originalPrice: 15.99,
    discount: 25,
    category: "food",
    rating: 4.7,
    reviews: 339,
    image: "/product_wooden_bone.png",
    colors: []
  }
];

export default products;
