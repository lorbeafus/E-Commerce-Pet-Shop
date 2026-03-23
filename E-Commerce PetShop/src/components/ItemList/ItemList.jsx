import Item from "../Item/Item.jsx"
import "./ItemList.css"

const ItemList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="item-list-empty">
        <span className="item-list-empty-icon">🐾</span>
        <p>No se encontraron productos en esta categoría</p>
      </div>
    )
  }
  
  return (
    <div className="item-list">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ItemList
