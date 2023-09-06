import React, { useState } from "react";
// import cartFile from "../../data/cart.json";
import { ToastContainer, toast } from "react-toastify";
import styles from "../../css/Cart.module.css";
import ParcelMachines from "../../components/cart/ParcelMachines";
import Payment from "../../components/cart/Payment";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));

  const removeAll = () => {
    cart.splice(0);
    setCart(cart.slice());
    toast.success("Cart was emptied successfully!");
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const decreaseQuantity = (index) => {
    // cart[index].quantity = cart[index].quantity - 1;
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
      // removeItem(index);
    }
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const increaseQuantity = (index) => {
    cart[index].quantity++;
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }


  const removeItem = (index) => {
    cart.splice(index, 1);
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const summedPrice = () => {
    let sum = 0;
    cart.forEach((cartProduct) => (sum = sum + cartProduct.product.price * cartProduct.quantity));
    return sum.toFixed(2);
  };
  
  return (
    <div>
      {cart.length > 0 && <button onClick={removeAll}>Remove all</button>}
      {cart.length > 0 && <div>Added products: {cart.length}</div>}
      {cart.map((cartProduct, index) => (
        <div className={styles.product} key={index}>
          <img className={styles.image} src={cartProduct.product.image} alt="" /> <br />
          <div className={styles.name}>{cartProduct.product.name}</div>
          <div className={styles.price}>{cartProduct.product.price.toFixed(2)} €</div>
          <div className={styles.quantity}>
            <img src="/minus.png" alt="" className={styles.button} onClick={() => decreaseQuantity(index)} />
            <div>{cartProduct.quantity} tk</div>
            <img src="/plus.png" alt="" className={styles.button} onClick={() => increaseQuantity(index)} />
          </div>
          <div className={styles.total}>{(cartProduct.product.price * cartProduct.quantity).toFixed(2)} €</div>
          <img src="/remove.png" alt="" className={styles.button} onClick={() => removeItem(index)} />
        </div>
      ))}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="colored"
      />

      {cart.length > 0 && 
        // <div className={styles["cart-bottom"]}>
        <div className={styles.cart__bottom}>
          <ParcelMachines />
          <div>Summary: {summedPrice()} $</div>
          <Payment sum={summedPrice()} />
        </div>}

      {cart.length === 0 && <div>Cart is empty</div>}
      {/* {cart.length > 0 && } */}
    </div>
  );
}

export default Cart;
