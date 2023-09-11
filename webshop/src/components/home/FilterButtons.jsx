import React from "react";
import { useTranslation } from 'react-i18next';

// function FilterButtons({dbProducts, setProducts, categories}) {
function FilterButtons(props) {
  // const filterMemoryBank = () => {
  //   const result = products.filter(product => product.category === "memory bank")
  //   setProducts(result)
  // }

  // const filterUSBDrive = () => {
  //   const result = products.filter(product => product.category === "usb drive")
  //   setProducts(result)
  // }

  // const filterGold = () => {
  //   const compare = products.filter(product => product.category === "gold");
  //   setProducts(compare);
  // }

  // const filterCoin = () => {
  //   const compare = products.filter(product => product.category === "coin");
  //   setProducts(compare);
  // }

  // const filterGoldTester = () => {
  //   const compare = products.filter(product => product.category === "gold tester");
  //   setProducts(compare);
  // }

  // const filterBracelet = () => {
  //   const compare = products.filter(product => product.category === "bracelet");
  //   setProducts(compare);
  // }
  
  const {t} = useTranslation();

  const filterByCategory = (categoryClicked) => {
    const result = props.dbProducts.filter(
      (product) => product.category === categoryClicked
    );
    props.setProducts(result);
  };

  return (
    <div>
      {props.categories.map((category) => (
        <button
          key={category.name}
          onClick={() => filterByCategory(category.name)}
        >
          {t(category.name)}
        </button>
      ))}
    </div>
  );
}

/* <button onClick={() => filterByCategory("memory bank")}>{t("memory bank")}</button>
      <button onClick={() => filterByCategory("usb drive")}>{t("usb drive")}</button>
      <button onClick={() => filterByCategory("gold")}>Filter gold</button> */

export default FilterButtons;
