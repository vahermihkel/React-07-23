import { useEffect, useRef, useState } from "react";
// import productsFromFile from "../../data/products.json";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import config from "../../data/config.json";
import "../../css/MaintainProducts.css";

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

  const deleteProduct = (index) => {
    dbProducts.splice(index, 1);
    toast.warn(t("itemRemoved"));
    setProducts(dbProducts.slice());
    // TODO: Andmebaasist kustutamine
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
          {products.map((product, index) => (
            <tr key={product.id} className={ product.active ? "active" : "inactive" }>
              <td><img src={product.image} alt="" /></td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => deleteProduct(index)}>{t("delete")}</button>
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
