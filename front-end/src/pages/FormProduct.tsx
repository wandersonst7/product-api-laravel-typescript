// hooks
import { useEffect, useState, FormEvent, ChangeEvent, } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// config
import { url } from "../config/api";

// interfaces
import { IProductRequest } from "../interfaces/IProductRequest";


const FormProduct = () => {

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const { id } = useParams();

  useEffect(() => {

    if(id){
      getProduct(Number(id));
    }

  }, [id])

  async function getProduct( id: number ){
    await fetch(url + "/products/" + id, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      }
    }).then((res) => {
      return res.json();
    }).then((resJSON) => {
      setName(resJSON.data.name);
      setPrice(resJSON.data.price);
      setQuantity(resJSON.data.quantity);
    }).catch((err) => {
      console.log(err);
    })
  }

  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();

    const productRequest : IProductRequest = {
      name: name,
      price: price,
      quantity: quantity
    }

    if(id){

      await fetch(url + "/products/" + id, {
        method: "PUT",
        body: JSON.stringify(productRequest),
        headers: {
          "Content-Type": 'application/json',
          accept: 'application/json'
        }
      }).then((res) => {
        return res.json();
      }).then((resJSON) => {
        clearStates();
        console.log(resJSON.data);
      }).catch((err) => {
        console.log(err)
      })

    }else{

      await fetch(url + "/products", {
        method: "POST",
        body: JSON.stringify(productRequest),
        headers: {
          "Content-Type": 'application/json',
          accept: 'application/json'
        }
      }).then((res) => {
        return res.json();
      }).then((resJSON) => {
        clearStates();
        console.log(resJSON.data);
      }).catch((err) => {
        console.log(err)
      })
    }

  }

  function handleChange(e:ChangeEvent<HTMLInputElement>){
    if(e.target.name === "name"){
      setName(e.target.value)
    }else if(e.target.name === "price"){
      setPrice(parseFloat(e.target.value))
    }else{
      setQuantity(parseInt(e.target.value))
    }
  }

  function clearStates(){
    setName("");
    setPrice(0);
    setQuantity(0);
  }

  return (
    <div>

      {id ? (
        <h1>Atualizar Produto</h1>
      ): (
        <h1>Cadastrar Produto</h1>
      )}
      
      <Link to="/">Home</Link>

      <form onSubmit={ handleSubmit }>
        <div className="box-input-product">
          <label htmlFor="name">Nome do Produto: </label>
          <input type="text" placeholder="Digite o nome do produto" name="name" id="name" onChange={ handleChange } value={name || ""} />
        </div>
        <div className="box-input-product">
          <label htmlFor="price">Preço do Produto: </label>
          <input type="number" placeholder="Digite o preço do produto" name="price" id="price" onChange={ handleChange } value={price || ""} />
        </div>
        <div className="box-input-product">
          <label htmlFor="quantity">Quantidade do Produto: </label>
          <input type="number" placeholder="Digite a quantidade em estoque" name="quantity" id="quantity" onChange={ handleChange } value={quantity || ""} />
        </div>
        <input type="submit" value="Salvar" />
      </form>

    </div>
  )
}

export default FormProduct