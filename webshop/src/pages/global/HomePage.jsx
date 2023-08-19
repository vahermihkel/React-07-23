import React, { useState } from "react";
import productsFromFile from "../../data/products.json";

function HomePage() {
  const [products, setProducts] = useState(productsFromFile);

  return (
    <div>
      <div>Total products: {products.length} pcs</div>
      <br />
      <button>Sort A-Z</button>
      <button>Sort Z-A</button>
      <button>Sort price asc</button>
      <button>Sort price desc</button>
      <br /><br />
      <button>memory bank</button>
      <button>usb drive</button>
      <button>coins</button>
      <button>gold</button>
      <button>gold tester</button>
      <button>bracelet</button>
      <br /><br />
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt="" />
          <div>{product.name}</div>
          <div>{product.price} €</div>
          <button>add-to-cart</button>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
