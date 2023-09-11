import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

import React, { useEffect, useState } from "react";
// import productsFromFile from "../../data/products.json"
// import cartFromFile from "../../data/cart.json"
import config from "../../data/config.json";
import styles from "../../css/HomePage.module.css";
import { Spinner } from "react-bootstrap";
import CarouselGallery from "../../components/home/CarouselGallery";
import SortButtons from "../../components/home/SortButtons";
import FilterButtons from "../../components/home/FilterButtons";
import Product from "../../components/home/Product";
// import "../../css/HomePage.module.css";

function HomePage() {
  // .filter(product => product.active === true)
  const [products, setProducts] = useState([]); // väljanäidatav: 60, 240, 600, 120
  const [dbProducts, setDbProducts] = useState([]); // andmebaasist: alati 600
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(config.products)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.slice() || []);
        setDbProducts(json.slice() || []);
        setLoading(false);
      });

    fetch(config.categories)
      .then((res) => res.json())
      .then((json) => setCategories(json || []));
  }, []);

  const reset = () => {
    setProducts(dbProducts.slice());
  };

  if (isLoading === true) {
    return <Spinner variant="success" />;
  }

  return (
    <div>
      <CarouselGallery />
      <div>
        {" "}
        {t("ttlProd")} {products.length} {t("pcs")}{" "}
      </div>
      <button onClick={reset}>Reset</button>
      <br />
      <SortButtons products={products} setProducts={setProducts} />
      <br /> <br />
      <FilterButtons
        dbProducts={dbProducts}
        setProducts={setProducts}
        categories={categories}
      />
      <br /> <br />
      <div className={styles.products}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}

export default HomePage;
