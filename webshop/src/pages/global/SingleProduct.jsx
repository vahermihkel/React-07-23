import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import productsFromFile from '../../data/products.json'
import { useTranslation } from 'react-i18next';
import config from '../../data/config.json'

function SingleProduct() {
  const {t} = useTranslation();
  const {productId} = useParams();
  const [products, setProducts] = useState([]);
  const found = products.find(product => product.id === Number(productId));

  useEffect(() => {
    fetch(config.products)
      .then(res => res.json())
      .then(json => setProducts(json || []));
  }, []);
 
  if (found === undefined)
  return <div>{t("notFound")} </div>
 
  return (
    <div>
      <div>{t("prodName")} {found.name} </div>
      <div>{t("prodPrice")} {found.price} € </div>
      <div>{t("prodDescription")} {found.description} </div>
      <img className='picture' src={found.image} alt="" />
      <Link to={"/"}>
        <button>Back</button>
      </Link>
    </div>
  )
}
 
export default SingleProduct