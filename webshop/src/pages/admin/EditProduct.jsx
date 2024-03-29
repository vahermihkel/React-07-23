import React, { useEffect, useRef, useState } from 'react'
// import productsFromFile from "../../data/products.json";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import config from "../../data/config.json";

function EditProduct() {
  const { productId } = useParams();        //    71579190  === "71579190"
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [idUnique, setIdUnique] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const found = products.find(product => product.id === Number(productId));
  //EI KÄI: const found = productsFromFile[index]

  useEffect(() => {
    fetch(config.products)
      .then(res => res.json())
      .then(json => setProducts(json || []));

    fetch(config.categories)
      .then(res => res.json())
      .then(json => setCategories(json || []));
  }, []);

  const edit = () => {
    if (idRef.current.value === "") {
      toast.error(t("Tühjaks IDks ei saa toote ID-d muuta!"));
      return; // funktsioon ei lähe edasi siit kohast
    }

    if (nameRef.current.value === "") {
      toast.error(t("Tühjaks nimetuseks ei saa toote nime muuta!"));
      return;
    }

    //  nameRef.current.value[0].toLowerCase() === nameRef.current.value[0]
    if (nameRef.current.value[0].toUpperCase() !== nameRef.current.value[0]) {
      toast.error(t("Väikse tähega ei saa toote nime alustada!"));
      return;
    }

    if (imageRef.current.value.includes(" ")) {
      toast.error(t("Tühikuga ei saa pildi aadressi lisada!"));
      return;
    }
 
    const index = products.findIndex(product => product.id === Number(productId));
    products[index] = {
      "id": Number(idRef.current.value),
      "image": imageRef.current.value,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "description": descriptionRef.current.value,
      "category": categoryRef.current.value,
      "active": activeRef.current.checked
    };
    fetch(config.products , {
      method: "PUT", 
      body: JSON.stringify(products)
    }).then(() => navigate("/admin/maintain-products"));
  }

  const checkIdUniqueness = () => {
    if (idRef.current.value === productId) {
      setIdUnique(true);
      return;
    }
    const index = products.findIndex(product => product.id === Number(idRef.current.value));
    if (index === -1) {
      setIdUnique(true);
    } else {
      setIdUnique(false);
    }
  }

  if (found === undefined) {
    return <div>Product not found</div>
  }

  return (
    <div>
      {idUnique === false && <div>Id ei ole unikaalne!</div>}
      <label>ID</label> <br />
      <input className={idUnique === false ? "error" : undefined} ref={idRef} onChange={checkIdUniqueness} defaultValue={found.id} type="number" /> <br />
      <label>Name</label> <br />
      <input ref={nameRef} defaultValue={found.name} type="text" /> <br />
      <label>Price</label> <br />
      <input ref={priceRef} defaultValue={found.price} type="number" /> <br />
      <label>Image</label> <br />
      <input ref={imageRef} defaultValue={found.image} type="text" /> <br />
      <label>Category</label> <br />
      <select ref={categoryRef} defaultValue={found.category}>
        {categories.map(category => <option key={category.name}>{category.name}</option> )}
      </select><br />
      <label>Description</label> <br />
      <input ref={descriptionRef} defaultValue={found.description} type="text" /> <br />
      <label>Active</label> <br />
      <input ref={activeRef} defaultChecked={found.active} type="checkbox" /> <br />
      <button disabled={idUnique === false} onClick={edit}>edit</button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />  
    </div>
  )
}

export default EditProduct