import React, { useRef } from 'react'
import productsFromFile from "../../data/products.json";
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const { productId } = useParams();        //    71579190  === "71579190"
  const found = productsFromFile.find(product => product.id === Number(productId));
  //EI KÄI: const found = productsFromFile[index]
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();
  const navigate = useNavigate();

  const edit = () => {
    const index = productsFromFile.findIndex(product => product.id === Number(productId));
    productsFromFile[index] = {
      "id": Number(idRef.current.value),
      "image": imageRef.current.value,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "description": descriptionRef.current.value,
      "category": categoryRef.current.value,
      "active": activeRef.current.checked
    };
    navigate("/admin/maintain-products");
  }

  return (
    <div>
      <label>ID</label> <br />
      <input ref={idRef} defaultValue={found.id} type="number" /> <br />
      <label>Name</label> <br />
      <input ref={nameRef} defaultValue={found.name} type="text" /> <br />
      <label>Price</label> <br />
      <input ref={priceRef} defaultValue={found.price} type="number" /> <br />
      <label>Image</label> <br />
      <input ref={imageRef} defaultValue={found.image} type="text" /> <br />
      <label>Category</label> <br />
      <input ref={categoryRef} defaultValue={found.category} type="text" /> <br />
      <label>Description</label> <br />
      <input ref={descriptionRef} defaultValue={found.description} type="text" /> <br />
      <label>Active</label> <br />
      <input ref={activeRef} defaultChecked={found.active} type="checkbox" /> <br />
      <button onClick={edit}>edit</button>
    </div>
  )
}

export default EditProduct