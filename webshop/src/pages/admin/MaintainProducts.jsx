import { useEffect, useRef, useState } from "react";
// import productsFromFile from "../../data/products.json";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import config from "../../data/config.json";
import styles from "../../css/MaintainProducts.module.css";

function MaintainProducts() {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();
  const searchedRef = useRef();
  const [dbProducts, setDbProducts] = useState([]); // andmebaasist: alati 600

  useEffect(() => {
    fetch(config.products)
      .then(res => res.json())
      .then(json => {
        setProducts(json || []);
        setDbProducts(json || []);
      });
  }, []);

            // siia tuleb järjekorranumber -> number 2 kui on otsingus
            // aga kustutab ära andmebaasi toodetest järjekorraga number 2
  const deleteProduct = (productId) => {
    const index = dbProducts.findIndex(product => product.id === productId);
    dbProducts.splice(index, 1); // 603 toodet -> pean nende seast kustutama
    fetch(config.products , {
      method: "PUT", 
      body: JSON.stringify(dbProducts)
    }).then(() => {
      toast.warn(t("itemRemoved"));
      searchFromProducts();
    })
  };

  const searchFromProducts = () => {
    const result = dbProducts.filter((product) =>
      product.name.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
      product.id.toString().includes(searchedRef.current.value)
    );
    setProducts(result);
  };

  return (
    <div>
      <input onChange={searchFromProducts} ref={searchedRef} type="text" />
      <div>{products.length}</div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* table head, table body, th - table header, td - table data, tr - table row */}
        <tbody>
          {products.map(product => (
            <tr key={product.id} className={ product.active ? styles.active : styles.inactive }>
              <td><img src={product.image} alt="" /></td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>{t("delete")}</button>
                <Button as={Link} to={"/admin/edit-product/" + product.id}>
                  edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
}

export default MaintainProducts;
