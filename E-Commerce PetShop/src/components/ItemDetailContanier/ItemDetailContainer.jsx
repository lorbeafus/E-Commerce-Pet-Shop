import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../../data/products.js"
import ItemDetail from "../ItemDetail/ItemDetail.jsx"
import "./ItemDetailContainer.css"

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { productId } = useParams()

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
        <p>Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="detail-not-found">
        <span className="detail-not-found-icon">🐾</span>
        <h2>Product not found</h2>
        <p>We couldn't find the product you're looking for.</p>
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
