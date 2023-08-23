import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import productsFromFile from "../../data/products.json";

function AddProduct() {
  const nameRef = useRef();
  const idRef = useRef();
  const priceRef = useRef();
  const pictureRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();
  const {t} = useTranslation();

  const addNewProduct = () => {
    if (idRef.current.value === "") {
      toast.error(t("Tühja IDga ei saa toodet lisada!"));
      return; // funktsioon ei lähe edasi siit kohast
    }

    if (nameRef.current.value === "") {
      toast.error(t("Tühja nimetusega ei saa toodet lisada!"));
      return;
    }

    //  nameRef.current.value[0].toLowerCase() === nameRef.current.value[0]
    if (nameRef.current.value[0].toUpperCase() !== nameRef.current.value[0]) {
      toast.error(t("Väikse tähega ei saa toote nime alustada!"));
      return;
    }

    if (pictureRef.current.value.includes(" ")) {
      toast.error(t("Tühikuga ei saa pildi aadressi lisada!"));
      return;
    }
    
    // if (nameRef.current.value === "") {
    //   toast.error(t("Tühja nimetusega ei saa toodet lisada!"));
    // } else {
      toast.success(t("success") + nameRef.current.value);
      productsFromFile.push({
        name: nameRef.current.value,
        id: Number(idRef.current.value),
        price: Number(priceRef.current.value),
        image: pictureRef.current.value,
        category: categoryRef.current.value,
        description: descriptionRef.current.value,
        active: activeRef.current.checked,
      });
    // }
    idRef.current.value = "";
    nameRef.current.value = "";
    priceRef.current.value = "";
    pictureRef.current.value = "";
    categoryRef.current.value = "";
    descriptionRef.current.value = "";
    activeRef.current.checked = false;
  };

  // 2 aastat - 10 inimest tööl, 5 arendajat
  // Tiimijuht koordineerib kliendiga tööd, arendajate tööd koordineerib

  // Testija töö on avastada vigu - Quality Assurance
  // Arendaja süü ei ole kui kliendile läheb vigane - esimesed kuud 0
  // Analüütik - "tahan toodete lisamist" - "lisamise võimekus", "lisamise kontrollid"
  //            "tahan makset" - arendajate käest küsib mis on aeg, mis teil selle peale kuluks 
  //                                ja öelge kui tihti võiks vead juhtuda
  //            hanke pakkumine - kõige parem proovitöö + kõige väiksem tunnihind
  // Disainer teeb Figmas arendajatele vaateid

  const [idUnique, setIdUnique] = useState(true);

  const checkIdUniqueness = () => {
    const index = productsFromFile.findIndex(product => product.id === Number(idRef.current.value));
    // const product = productsFromFile.find(product => product.id === Number(idRef.current.value));
    // const result = productsFromFile.filter(product => product.id === Number(idRef.current.value));

    // if (result.length === 0) {
    // if (product === undefined) {
    if (index === -1) { // KUI seda toodet pole, aga otsitakse järjekorranumbrit, siis index on -1
      setIdUnique(true);
    } else {
      setIdUnique(false);
    }
  }

  return (
    <div>
       {idUnique === false && <div>Id ei ole unikaalne!</div>}
      <label>Product id</label> <br />
      <input className={idUnique === false ? "error" : undefined} onChange={checkIdUniqueness} ref={idRef} type="number" />
      <br />
      <label>Product name</label> <br />
      <input ref={nameRef} type="text" />
      <br />
      <label>Product price</label> <br />
      <input ref={priceRef} type="number" />
      <br />
      <label>Product picture</label> <br />
      <input ref={pictureRef} type="text" />
      <br />
      <label>Product category</label> <br />
      <input ref={categoryRef} type="text" />
      <br />
      <label>Product description</label> <br />
      <input ref={descriptionRef} type="text" />
      <br />
      <label>Product active</label> <br />
      <input ref={activeRef} type="checkbox" />
      <br />
      <button disabled={idUnique === false} onClick={addNewProduct}>Add</button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />  
    </div>
  );
}

export default AddProduct;
