import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../../firebase/productService.js"
import ItemDetail from "../ItemDetail/ItemDetail.jsx"
import { useLanguage } from "../context/LanguageContext.jsx"
import "./ItemDetailContainer.css"

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { productId } = useParams()
  const { t } = useLanguage()

  useEffect(() => {
    setLoading(true)
    getProductById(productId).then((data) => {
      setProduct(data)
      setLoading(false)
    })
  }, [productId])

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="detail-loading-spinner"></div>
        <p>{t("detail_loading")}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="detail-not-found">
        <span className="detail-not-found-icon">🐾</span>
        <h2>{t("detail_not_found_title")}</h2>
        <p>{t("detail_not_found_text")}</p>
      </div>
    )
  }

  return (
    <div className="item-detail-container">
      <ItemDetail product={product} />
    </div>
  )
}

export default ItemDetailContainer

