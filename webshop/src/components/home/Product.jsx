import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Button as BButton } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import styles from "../../css/HomePage.module.css";
import { CartSumContext } from '../../store/CartSumContext';

          // props ---> props sisse tulevad võtmed, mis on parentis kirjutatud
          // {VÕTI} ---> saan kohe hakata teda muutujana kasutama
function Product({product}) {
  const { setCartSum } = useContext(CartSumContext);
  const {t} = useTranslation();

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
   
    let sum = 0;
    cart.forEach((cartProduct) => (sum = sum + cartProduct.product.price * cartProduct.quantity));
    setCartSum(sum.toFixed(2));

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(t("itemAddedToCart"));
  }

  return (
    <div className={styles.product}>
      <img src={product.image} alt="" />
      <div className={styles.name}> {product.name} </div>
      <div> {product.price.toFixed(2)} €</div>
      <Button variant="contained" onClick={() => addCart(product)}>{t("addCart")}</Button>
      <Link to={"/product/" + product.id}>
        <BButton>{t("lookCloser")} </BButton>
      </Link>
    </div>
  )
}

export default Product