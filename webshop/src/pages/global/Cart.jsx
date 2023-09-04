import React, { useEffect, useState } from "react";
// import cartFile from "../../data/cart.json";
import { ToastContainer, toast } from "react-toastify";
import "../../css/Cart.css";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));

  // API päringutes peab alati olema useState
  // ja useState algväärtus sulgude sees peab olema seda tüüpi tühi
  // API päring võtab aega ---> näiteks 0.5sekundit
  // senikaua on koodis useState algväärtus
  const [parcelMachines, setParcelMachines] = useState([]);
  // const addItems = (choosenItem) => {
  //   cart.push(choosenItem);
  //   updateCart(cart.slice());
  // }

  // Vanem React: componentDidMount   componentWillMount
  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json()) // koos metadata'ga tagastus
      .then(json => setParcelMachines(json)) // reaalselt mis seal API päringus tagastatakse
  }, []);

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

  const pay = () => {
    const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
    const paymentBody = {
      "api_username": "e36eb40f5ec87fa2", // turvaelement
      "account_name": "EUR3D1", // konto
      "amount": summedPrice(), // tellimuse summa
      "order_reference": Math.random() * 9999999, // tellimuse nr
      "nonce": "a9b7f7e79n" + Math.random() * 9999999 + new Date(), // turvaelement
      "timestamp": new Date(), // turvaelement
      "customer_url": "https://react-07-23.web.app" // kuhu tagasi suunatakse
    };
    const paymentHeaders = {
      "Authorization": "Basic ZTM2ZWI0MGY1ZWM4N2ZhMjo3YjkxYTNiOWUxYjc0NTI0YzJlOWZjMjgyZjhhYzhjZA==",
      "Content-Type": "application/json"
    };

    fetch(url, {method: "POST", body: JSON.stringify(paymentBody), headers: paymentHeaders})
      .then(res => res.json())
      .then(json => window.location.href = json.payment_link);
  }

  // 1. HTMLs:
  // <a href />
  // <Link>
  // 2. const nav = useNavigate(); <--- siseseks suunamiseks
  // nav(json.payment_link)
  // 3. window.location.href = "https://err.ee" <--- rakendusest välja suunamiseks

  if (parcelMachines.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {cart.length > 0 && <button onClick={removeAll}>Remove all</button>}
      {cart.length > 0 && <div>Added products: {cart.length}</div>}
      {cart.map((cartProduct, index) => (
        <div className="product" key={index}>
          <img className="image" src={cartProduct.product.image} alt="" /> <br />
          <div className="name">{cartProduct.product.name}</div>
          <div className="price">{cartProduct.product.price.toFixed(2)} €</div>
          <div className="quantity">
            <img src="/minus.png" alt="" className="button" onClick={() => decreaseQuantity(index)} />
            <div>{cartProduct.quantity} tk</div>
            <img src="/plus.png" alt="" className="button" onClick={() => increaseQuantity(index)} />
          </div>
          <div className="total">{(cartProduct.product.price * cartProduct.quantity).toFixed(2)} €</div>
          <img src="/remove.png" alt="" className="button" onClick={() => removeItem(index)} />
        </div>
      ))}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="colored"
      />

      {cart.length > 0 && 
        <div>
          <select>{parcelMachines.filter(pm => pm.A0_NAME === "EE").map(pm => <option key={pm.NAME}>{pm.NAME}</option> )}</select>  
          <div>Summary: {summedPrice()} $</div>
          <button onClick={pay}>Maksma</button>
        </div>}

      {cart.length === 0 && <div>Cart is empty</div>}
      {/* {cart.length > 0 && } */}
    </div>
  );
}

export default Cart;
