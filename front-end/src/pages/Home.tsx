// hooks
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// config
import { url } from "../config/api";

// interfaces
import { IProductResponse } from "../interfaces/IProductResponse";

const Home = () => {

  const [products, setProducts] = useState<IProductResponse[]>([])

  useEffect(() => {

    async function getAllProducts(){

      await fetch(url + "/products", {
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
        }
      }).then((res) => {
        return res.json();
      }).then((responseJSON) => {
        setProducts(responseJSON.data);
      })
      .catch((err) => {
        console.log(err)
      });
        
    }

    getAllProducts();
    

  }, [])

  async function handleDelete(id: number){
    await fetch(url + "/products/" + id, {
      method: "DELETE",
      headers: {
        accept: "application/json"
      }
    }).then((res) => {
      return res.json()   
    }).then((resJSON) => {
      console.log(resJSON)
      setProducts(products.filter((product) => product.id !== id));
    }).catch((err) => {
      console.log(err)
    })
    
  }

  return (
    <>
      <h1>Home</h1>
      <Link to="/product">Cadastrar Produto</Link>
      { products && products.map((product) => (
        <div key={product.id}>
          <h3>{ product.name }</h3>
          <p>{ product.price }</p>
          <p>{ product.quantity }</p>
          <Link to={`/product/${product.id}`}>Editar</Link>
          <button onClick={ () => handleDelete(product.id) }>Excluir Produto</button>
        </div>
      ))}
    </>
  )
}

export default Home