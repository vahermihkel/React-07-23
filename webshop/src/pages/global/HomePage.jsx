import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
 
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
// import productsFromFile from "../../data/products.json"
// import cartFromFile from "../../data/cart.json"
import config from "../../data/config.json"; 
import styles from "../../css/HomePage.module.css";
import { Spinner } from 'react-bootstrap';
import CarouselGallery from '../../components/CarouselGallery';
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
        setProducts(json || []);
        setDbProducts(json || []);
        setLoading(false);
      });

    fetch(config.categories)
      .then(res => res.json())
      .then(json => setCategories(json || []));
  }, []);

  const reset = () => {
    setProducts(dbProducts);
  }
 
  const sortAZ = () => {
    products.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(products.slice())
  }
 
  const sortZA = () => {
    products.sort((a, b) => b.name.localeCompare(a.name));
    setProducts(products.slice())
  }
 
  const sortPriceAsc = () => {
    products.sort((a, b) => a.price - b.price);
    setProducts(products.slice())
  }
 
  const sortPriceDesc = () => {
    products.sort((a, b) => b.price - a.price);
    setProducts(products.slice())
  }
 
  // const filterMemoryBank = () => {
  //   const result = products.filter(product => product.category === "memory bank")
  //   setProducts(result)
  // }
 
  // const filterUSBDrive = () => {
  //   const result = products.filter(product => product.category === "usb drive")
  //   setProducts(result)
  // }

  // const filterGold = () => {
  //   const compare = products.filter(product => product.category === "gold");
  //   setProducts(compare);
  // }

  // const filterCoin = () => {
  //   const compare = products.filter(product => product.category === "coin");
  //   setProducts(compare);
  // }

  // const filterGoldTester = () => {
  //   const compare = products.filter(product => product.category === "gold tester");
  //   setProducts(compare);
  // }

  // const filterBracelet = () => {
  //   const compare = products.filter(product => product.category === "bracelet");
  //   setProducts(compare);
  // }

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
      <button onClick={() => sortAZ()}>{t("sortAZ")} </button>
      <button onClick={() => sortZA()}>{t("sortZA")}</button>
      <button onClick={() => sortPriceAsc()}>{t("sortPA")}</button>
      <button onClick={() => sortPriceDesc()}>{t("sortPD")}</button>
      <br /> <br />
      {/* <button onClick={() => filterByCategory("memory bank")}>{t("memory bank")}</button>
      <button onClick={() => filterByCategory("usb drive")}>{t("usb drive")}</button>
      <button onClick={() => filterByCategory("gold")}>Filter gold</button> */}
      {categories.map(category => <button key={category.name} onClick={() => filterByCategory(category.name)}>{t(category.name)}</button>)}
      <br /> <br/>
 
      <div className={styles.products}>
        {products.map((product) => (
        <div key={product.id} className={styles.product}>
          <img src={product.image} alt="" />
          <div className={styles.name}> {product.name} </div>
          <div> {product.price.toFixed(2)} €</div>
          <button onClick={() => addCart(product)}>{t("addCart")}</button>
          <Link to={"/product/" + product.id}>
            <button>{t("lookCloser")} </button>
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