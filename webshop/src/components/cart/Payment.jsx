import React from 'react'

function Payment(props) {

  const pay = () => {
    const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
    const paymentBody = {
      "api_username": "e36eb40f5ec87fa2", // turvaelement
      "account_name": "EUR3D1", // konto
      "amount": props.sum, // tellimuse summa
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

  return (
    <button onClick={pay}>Maksma</button>
  )
}

export default Payment