import React, { useEffect, useRef, useState } from 'react'
import config from "../../data/config.json";

function MaintainCategories() {
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef();

  // uef
  useEffect(() => {
    fetch(config.categories)
      .then(res => res.json())
      .then(json => setCategories(json || []));
  }, []);

  const addCategory = () => {
    categories.push({"name": categoryRef.current.value});
    setCategories(categories.slice());
    fetch(config.categories, {
      method: "PUT",
      body: JSON.stringify(categories)
    })
  }
  // võtmiseks: "GET" <--- get päring on by default ehk seda me ei pea välja kirjutama
  // lisamiseks: "POST"
  // asendamiseks: "PUT" <--- Firebase soovib, et me asendaks kõik tooted
  // kustutamiseks: "DELETE"
  // REST operations

  const deleteCategory = (index) => {
    categories.splice(index,1);
    setCategories(categories.slice());
    fetch(config.categories, {
      method: "PUT",
      body: JSON.stringify(categories)
    })
  }

  return (
    <div>
      <label>Kategooria</label> <br />
      <input ref={categoryRef} type="text" /> <br />
      <button onClick={addCategory}>Sisesta</button> <br />
      {categories.map((category, index) => 
        <div>
          {category.name}
          <button onClick={() => deleteCategory(index)}>x</button>
        </div>)}
    </div>
  )
}

export default MaintainCategories