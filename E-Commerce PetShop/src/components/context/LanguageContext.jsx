import { createContext, useContext, useState } from "react"

const translations = {
  es: {
    // NavBar
    nav_home: "Inicio",
    nav_food: "Alimentos",
    nav_toys: "Juguetes",
    nav_grooming: "Higiene",
    nav_accessories: "Accesorios",
    nav_search_placeholder: "Buscar productos...",

    // ItemListContainer – Hero
    hero_badge: "🐾 #1 Tienda de Mascotas",
    hero_title: "Todo lo que tu Mascota Necesita para una Vida más Feliz y Saludable",
    hero_text: "Creemos que las mascotas merecen más que solo cuidados, merecen amor, comodidad y diversión todos los días.",
    hero_cta: "Comprar Colección Premium",
    hero_rating: "Calificación 4.9/5",
    hero_rating_sub: "Elegida por más de 245K dueños de mascotas",
    hero_badge_top: "✨ Ajuste y Comodidad Perfectos",
    hero_badge_bottom: "🎾 Juguetes en Tendencia",

    // ItemListContainer – Sections
    back_home: "Volver al Inicio",
    all_products: "Todos los Productos",
    bestsellers_title: "Nuestros Más Vendidos",
    bestsellers_subtitle: "Descubre lo que nuestros clientes dicen sobre su experiencia con nuestros productos",
    loading: "Cargando productos...",

    // Item card
    item_reviews: "Reseñas",
    item_discount: "Dto",
    item_add_to_cart_aria: "Agregar al carrito",

    // ItemDetail
    detail_back: "Volver a Productos",
    detail_reviews: "reseñas",
    detail_save: "Ahorra",
    detail_colors_label: "Colores disponibles",
    detail_color_option: "Opción de color",
    detail_quantity_label: "Cantidad",
    detail_add_to_cart: "Agregar al Carrito",
    detail_go_to_cart: "Ir al Carrito",
    detail_continue: "Seguir Comprando",
    detail_shipping: "Envío gratis a partir de $50",
    detail_returns: "Política de devolución de 30 días",
    detail_quality: "100% calidad garantizada",
    detail_discount_badge: "Dto",

    // Cart
    cart_empty_title: "Tu carrito está vacío",
    cart_empty_text: "Parece que aún no has añadido nada al carrito. ¡Explora nuestros productos!",
    cart_empty_btn: "Ver Productos",
    cart_title: "Tu Carrito",
    cart_items: "items",
    cart_quantity: "Cantidad",
    cart_unit_price: "Precio Unit.",
    cart_subtotal: "Subtotal",
    cart_remove_aria: "Eliminar producto",
    cart_summary_title: "Resumen de compra",
    cart_shipping: "Envío",
    cart_shipping_free: "Gratis",
    cart_total: "Total",
    cart_checkout: "Finalizar Compra",
    cart_clear: "Vaciar Carrito",
    cart_continue: "Continuar comprando",
    cart_added_success: "¡Agregado exitosamente! 🐾",

    // NotFound
    not_found_subtitle: "Página no encontrada",
    not_found_text: "¡Ups! Parece que esta página se fue a pasear. Vamos a llevarte de vuelta al inicio.",
    not_found_btn: "Volver al Inicio",

    // Categories
    cat_all: "Todos",
    cat_food: "Alimentos y Premios",
    cat_toys: "Juguetes",
    cat_grooming: "Higiene",
    cat_collars: "Collares y Correas",
    cat_accessories: "Accesorios",
  },

  pt: {
    // NavBar
    nav_home: "Início",
    nav_food: "Alimentos",
    nav_toys: "Brinquedos",
    nav_grooming: "Higiene",
    nav_accessories: "Acessórios",
    nav_search_placeholder: "Buscar produtos...",

    // ItemListContainer – Hero
    hero_badge: "🐾 #1 Loja de Animais",
    hero_title: "Tudo o que seu Pet Precisa para uma Vida mais Feliz e Saudável",
    hero_text: "Acreditamos que os pets merecem mais do que cuidados, merecem amor, conforto e diversão todos os dias.",
    hero_cta: "Comprar Coleção Premium",
    hero_rating: "Avaliação 4.9/5",
    hero_rating_sub: "Escolhida por mais de 245K tutores de pets",
    hero_badge_top: "✨ Ajuste e Conforto Perfeitos",
    hero_badge_bottom: "🎾 Brinquedos em Alta",

    // ItemListContainer – Sections
    back_home: "Voltar ao Início",
    all_products: "Todos os Produtos",
    bestsellers_title: "Nossos Mais Vendidos",
    bestsellers_subtitle: "Descubra o que nossos clientes dizem sobre a experiência com nossos produtos",
    loading: "Carregando produtos...",

    // Item card
    item_reviews: "Avaliações",
    item_discount: "Desc",
    item_add_to_cart_aria: "Adicionar ao carrinho",

    // ItemDetail
    detail_back: "Voltar aos Produtos",
    detail_reviews: "avaliações",
    detail_save: "Economize",
    detail_colors_label: "Cores disponíveis",
    detail_color_option: "Opção de cor",
    detail_quantity_label: "Quantidade",
    detail_add_to_cart: "Adicionar ao Carrinho",
    detail_go_to_cart: "Ir ao Carrinho",
    detail_continue: "Continuar Comprando",
    detail_shipping: "Frete grátis a partir de $50",
    detail_returns: "Política de devolução de 30 dias",
    detail_quality: "100% qualidade garantida",
    detail_discount_badge: "Desc",

    // Cart
    cart_empty_title: "Seu carrinho está vazio",
    cart_empty_text: "Parece que você ainda não adicionou nada ao carrinho. Explore nossos produtos!",
    cart_empty_btn: "Ver Produtos",
    cart_title: "Seu Carrinho",
    cart_items: "itens",
    cart_quantity: "Quantidade",
    cart_unit_price: "Preço Unit.",
    cart_subtotal: "Subtotal",
    cart_remove_aria: "Remover produto",
    cart_summary_title: "Resumo da compra",
    cart_shipping: "Frete",
    cart_shipping_free: "Grátis",
    cart_total: "Total",
    cart_checkout: "Finalizar Compra",
    cart_clear: "Esvaziar Carrinho",
    cart_continue: "Continuar comprando",
    cart_added_success: "Adicionado com sucesso! 🐾",

    // NotFound
    not_found_subtitle: "Página não encontrada",
    not_found_text: "Ops! Parece que esta página saiu para passear. Vamos te levar de volta ao início.",
    not_found_btn: "Voltar ao Início",

    // Categories
    cat_all: "Todos",
    cat_food: "Alimentos e Petiscos",
    cat_toys: "Brinquedos",
    cat_grooming: "Higiene",
    cat_collars: "Coleiras e Guias",
    cat_accessories: "Acessórios",
  },
}

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es")

  const t = (key) => translations[language][key] ?? key

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "es" ? "pt" : "es"))

  const changeLanguage = (lang) => setLanguage(lang)

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
