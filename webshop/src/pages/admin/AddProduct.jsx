import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import productsFromfile from "../../data/products.json";

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
      productsFromfile.push({
        name: nameRef.current.value,
        id: Number(idRef.current.value),
        price: Number(priceRef.current.value),
        image: pictureRef.current.value,
        category: categoryRef.current.value,
        description: descriptionRef.current.value,
        active: activeRef.current.checked,
      });
    // }
  };

  return (
    <div>
      <label>Product id</label> <br />
      <input ref={idRef} type="number" />
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
      <button onClick={addNewProduct}>Add</button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />  
    </div>
  );
}

export default AddProduct;
