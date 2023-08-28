import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
 
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import productsFromFile from "../../data/products.json"
// import cartFromFile from "../../data/cart.json"
 
function HomePage () {                        // .filter(product => product.active === true)
  const [products, setProducts] = useState(productsFromFile);
  const {t} = useTranslation();

  const reset = () => {
    setProducts(productsFromFile);
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
 
  const filterMemoryBank = () => {
    const result = products.filter(product => product.category === "memory bank")
    setProducts(result)
  }
 
  const filterUSBDrive = () => {
    const result = products.filter(product => product.category === "usb drive")
    setProducts(result)
  }

  const filterGold = () => {
    const compare = products.filter(product => product.category.match("gold"));
    setProducts(compare);
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
 
  return (
    <div>
      <div> {t("ttlProd")} {products.length} {t("pcs")} </div>
      <button onClick={reset}>Reset</button>
      <br /> 
      <button onClick={() => sortAZ()}>{t("sortAZ")} </button>
      <button onClick={() => sortZA()}>{t("sortZA")}</button>
      <button onClick={() => sortPriceAsc()}>{t("sortPA")}</button>
      <button onClick={() => sortPriceDesc()}>{t("sortPD")}</button>
      <br /> <br />
      <button onClick={() => filterMemoryBank()}>{t("filtMB")}</button>
      <button onClick={() => filterUSBDrive()}>{t("filtUSBD")}</button>
      <button onClick={() => filterGold()}>Filter gold</button>
      <br /> <br/>
 
      {products.map((product) => (
      <div key={product.id}>
        <img src={product.image} alt="" />
        <div> {product.name} </div>
        <div> {product.price.toFixed(2)} €</div>
        <button onClick={() => addCart(product)}>{t("addCart")}</button>
        <Link to={"/product/" + product.id}>
          <button>{t("lookCloser")} </button>
        </Link>
      </div>
 
      ))}
       <ToastContainer
        position="bottom-right"
        theme="dark"
      />  
    </div>
  )
 
 
}
 
export default HomePage