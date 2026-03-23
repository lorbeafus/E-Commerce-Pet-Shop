const products = [
  {
    id: 1,
    title: "Anillo Masticable Premium",
    description: "Juguete resistente de goma natural para perros. Ideal para la salud dental y horas de diversión. Diseñado para masticar sin riesgo.",
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
    title: "Hueso de Madera Natural",
    description: "Hueso de madera natural para masticar. Sin químicos, 100% seguro para tu mascota. Perfecto para cachorros y perros adultos.",
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
    title: "Juguete de Cuerda de Algodón",
    description: "Cuerda de algodón trenzado para jugar a tirar. Refuerza el vínculo con tu mascota mientras se divierte.",
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
    title: "Alimento Premium para Perros",
    description: "Alimento premium con ingredientes naturales seleccionados. Rico en proteínas y nutrientes esenciales para una dieta balanceada.",
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
    title: "Collar de Cuero para Perros",
    description: "Collar de cuero genuino con hebilla dorada. Elegante, resistente y cómodo para el uso diario de tu mascota.",
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
    title: "Shampoo de Aseo para Mascotas",
    description: "Shampoo de aseo con ingredientes naturales. Limpia suavemente, deja el pelo suave y brillante con un aroma fresco.",
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
    title: "Cama Acogedora para Mascotas",
    description: "Cama redonda ultra suave de felpa. El lugar perfecto para que tu mascota descanse cómodamente durante todo el día.",
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
    title: "Premios Naturales para Perros",
    description: "Galletas orgánicas horneadas con ingredientes 100% naturales. El snack saludable que tu perro merece.",
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

const categories = [
  { id: "all", label: "Todos" },
  { id: "food", label: "Alimentos y Premios" },
  { id: "toys", label: "Juguetes" },
  { id: "grooming", label: "Higiene" },
  { id: "collars", label: "Collares y Correas" },
  { id: "accessories", label: "Accesorios" }
];

export const getProducts = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categoryId && categoryId !== "all") {
        resolve(products.filter(p => p.category === categoryId));
      } else {
        resolve(products);
      }
    }, 600);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(p => p.id === Number(id)));
    }, 400);
  });
};

export { categories };
export default products;
