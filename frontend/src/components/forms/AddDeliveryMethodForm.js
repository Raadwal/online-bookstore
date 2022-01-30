import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddDeliveryMethodForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/delivery-method";

  const nameInputRef = useRef();
  const priceMethodIdInputRef = useRef();
  const minInputRef = useRef();
  const maxInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      name: nameInputRef.current.value,
      price: priceMethodIdInputRef.current.value,
      minDeliveryTime: minInputRef.current.value,
      maxDeliveryTime: maxInputRef.current.value,
    };

    axios.post(url, book).then((res) => {
      getResponse(res.data);
    });
  }

  return (
    <div>
      <FormsNavigation />
      <form className={classes.form} onSubmit={submintHandler}>
        <div>
          <label htmlFor="name">Nazwa: </label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor="price">Cena: </label>
          <input type="text" id="price" ref={priceMethodIdInputRef} />
        </div>
        <div>
          <label htmlFor="min">Minimalny czas dostawy: </label>
          <input type="text" id="min" ref={minInputRef} />
        </div>
        <div>
          <label htmlFor="max">Maksymalny czas dostawy: </label>
          <input type="text" id="max" ref={maxInputRef} />
        </div>

        <button>Dodaj metodę dostawy</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddDeliveryMethodForm;
