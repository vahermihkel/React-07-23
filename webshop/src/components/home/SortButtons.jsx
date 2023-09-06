import React from 'react'
import { useTranslation } from 'react-i18next';

function SortButtons(props) {

  const {t} = useTranslation();

  const sortAZ = () => {
    props.products.sort((a, b) => a.name.localeCompare(b.name));
    props.setProducts(props.products.slice())
  }
 
  const sortZA = () => {
    props.products.sort((a, b) => b.name.localeCompare(a.name));
    props.setProducts(props.products.slice())
  }
 
  const sortPriceAsc = () => {
    props.products.sort((a, b) => a.price - b.price);
    props.setProducts(props.products.slice())
  }
 
  const sortPriceDesc = () => {
    props.products.sort((a, b) => b.price - a.price);
    props.setProducts(props.products.slice())
  }

  return (
    <React.Fragment>
      <button onClick={() => sortAZ()}>{t("sortAZ")} </button>
      <button onClick={() => sortZA()}>{t("sortZA")}</button>
      <button onClick={() => sortPriceAsc()}>{t("sortPA")}</button>
      <button onClick={() => sortPriceDesc()}>{t("sortPD")}</button>
    </React.Fragment>
  )
}

export default SortButtons