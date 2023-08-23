import { useRef, useState } from "react";
import productsFromFile from "../../data/products.json";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";

function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile);
  const { t } = useTranslation();
  const searchedRef = useRef();

  const deleteProduct = (index) => {
    productsFromFile.splice(index, 1);
    toast.warn(t("itemRemoved"));
    setProducts(productsFromFile.slice());
  };

  const searchFromProducts = () => {
    const result = productsFromFile.filter((product) =>
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
      {products.map((product, index) => (
        <div key={product.id} className={ product.active ? "active" : "inactive" }>
          <img src={product.image} alt="" />
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.category}</div>
          <div>{product.description}</div>
          <button onClick={() => deleteProduct(index)}>{t("delete")}</button>
          <Button as={Link} to={"/admin/edit-product/" + product.id}>
            edit
          </Button>
        </div>
      ))}

      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
}

export default MaintainProducts;
