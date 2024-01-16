import "./Home.css";

// components
import ProductItem from "../components/ProductItem";

// hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// config
import { url } from "../config/api";

// interfaces
import { IProductResponse } from "../interfaces/IProductResponse";

// context 
import { useLoading } from "../context/useLoading";

const Home = () => {

  const { loading, setLoading } = useLoading();

  const [products, setProducts] = useState<IProductResponse[]>([])

  useEffect(() => {

    async function getAllProducts(){

      setLoading(true)
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
      }).finally(() => {
        setLoading(false)
      })
        
    }

    getAllProducts();
    

  }, [])

  async function handleDelete(id: number){

    setLoading(true)

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
    }).finally(() => {
      setLoading(false)
    })
    
  }

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className="home">
      <section>
        <h1>Home</h1>
        <Link to="/product">Cadastrar Produto</Link>
      </section>

      <div className="products">
        { products && products.map((product) => (
            <ProductItem key={product.id} handleDelete={handleDelete} product={product}/>
        ))}
      </div>
      
    </div>
  )
}

export default Home