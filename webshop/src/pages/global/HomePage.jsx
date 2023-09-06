import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
 
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
// import productsFromFile from "../../data/products.json"
// import cartFromFile from "../../data/cart.json"
import config from "../../data/config.json"; 
import styles from "../../css/HomePage.module.css";
import { Button as BButton, Spinner } from 'react-bootstrap';
import Button from '@mui/material/Button';
import CarouselGallery from '../../components/home/CarouselGallery';
import SortButtons from '../../components/home/SortButtons';
// import "../../css/HomePage.module.css";

function HomePage () {                        // .filter(product => product.active === true)
  const [products, setProducts] = useState([]); // väljanäidatav: 60, 240, 600, 120
  const [dbProducts, setDbProducts] = useState([]); // andmebaasist: alati 600
  const {t} = useTranslation();
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(config.products)
      .then(res => res.json())
      .then(json => {
        setProducts(json.slice() || []);
        setDbProducts(json.slice() || []);
        setLoading(false);
      });

    fetch(config.categories)
      .then(res => res.json())
      .then(json => setCategories(json || []));
  }, []);

  const reset = () => {
    setProducts(dbProducts.slice());
  }

  const filterByCategory = (categoryClicked) => {
    const result = dbProducts.filter(product => product.category === categoryClicked);
    setProducts(result);
  }
 
  const addCart = (chosenProduct) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    // peame tuvastama, kas ta on ostukorvis või ei ole
    const index = cart.findIndex(cartProduct => cartProduct.product.id === chosenProduct.id);
    if (index >= 0) {
      // peame suurendama kogust
      cart[index].quantity = cart[index].quantity + 1;
      // cart[index].quantity += 1;
      // cart[index].quantity++;
    } else {
      cart.push({"quantity": 1,"product": chosenProduct});
    }
   
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(t("itemAddedToCart"));
  }

  if (isLoading === true) {
    return <Spinner variant="success" />
  }
 
  return (
    <div>
      <CarouselGallery />
      <div> {t("ttlProd")} {products.length} {t("pcs")} </div>
      <button onClick={reset}>Reset</button>
      <br /> 
      <SortButtons 
          products={products}
          setProducts={setProducts}
        />
      <br /> <br />
      {categories.map(category => <button key={category.name} onClick={() => filterByCategory(category.name)}>{t(category.name)}</button>)}
      <br /> <br/>
 
      <div className={styles.products}>
        {products.map((product) => (
        <div key={product.id} className={styles.product}>
          <img src={product.image} alt="" />
          <div className={styles.name}> {product.name} </div>
          <div> {product.price.toFixed(2)} €</div>
          <Button variant="contained" onClick={() => addCart(product)}>{t("addCart")}</Button>
          <Link to={"/product/" + product.id}>
            <BButton>{t("lookCloser")} </BButton>
          </Link>
        </div>
        ))}
      </div>

       <ToastContainer
        position="bottom-right"
        theme="dark"
      />  
    </div>
  )
 
 
}
 
export default HomePage