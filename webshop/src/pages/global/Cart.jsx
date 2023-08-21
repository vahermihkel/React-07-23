import React, { useState } from 'react';
import cartFile from "../../data/cart.json";
import { ToastContainer, toast } from 'react-toastify';
 
function Cart() {
  const [cart, updateCart] = useState(cartFile);
 
  // const addItems = (choosenItem) => {
  //   cart.push(choosenItem);
  //   updateCart(cart.slice());
  // }
 
  const removeItem = (index) => {
    cart.splice(index,1);
    updateCart(cart.slice());
  }
 
  const removeAll = () => {
    cart.splice(0);
    updateCart(cart.slice());
    toast("Cart was emptied successfully!")
  }
 
  const summedPrice = () => {
    let sum = 0;
    cart.forEach(product => sum = sum + product.price);
    return sum;
  }
 
  return (
    <div>
      { cart.length > 0 && <button onClick={removeAll}>Remove all</button>}
      { cart.length > 0 && <div>Added products: {cart.length}</div>}
      {cart.map((product,index) => (
        <div key={index}>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <img src={product.image} alt="" /> <br />
          {/* <button onClick={() => addItems(product)}>Add more</button> */}
          <button onClick={() => removeItem(index)}>Remove item</button>
        </div>
      ))}
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        theme="colored"
      />
      {cart.length === 0 && <div>Cart is empty</div>}
      {cart.length > 0 && <div>Summary: {summedPrice()} $</div>}
    </div>
  )
}
 
export default Cart