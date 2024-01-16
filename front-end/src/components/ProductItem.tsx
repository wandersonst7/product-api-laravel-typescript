import { Link } from "react-router-dom";
import { IProductResponse } from "../interfaces/IProductResponse";
import "./ProductItem.css";

type Props = {
    product: IProductResponse;
    handleDelete(id: number): void
}

const ProductItem = ({ product, handleDelete } : Props) => {
  return (
    <div className="product-item">
        <h3>{ product.name }</h3>
        <p>Preço: <span> R$ { product.price } </span></p>
        <p>Estoque: <span> { product.quantity } </span></p>
        <div className="buttons-product">
            <Link id="edit" to={`/product/${product.id}`}>Editar</Link>
            <button id="delete" onClick={ () => handleDelete(product.id) }>Excluir</button>
        </div>
    </div>
  )
}

export default ProductItem