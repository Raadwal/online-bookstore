import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddWarehouseForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/warehouse";

  const managerIdInputRef = useRef();
  const addressIdInputRef = useRef();
  const nameInputRef = useRef();
  const phoneInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      managerId: managerIdInputRef.current.value,
      addressId: addressIdInputRef.current.value,
      name: nameInputRef.current.value,
      phone: phoneInputRef.current.value,
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
          <label htmlFor="managerId">Kierownik ID: </label>
          <input type="text" id="managerId" ref={managerIdInputRef} />
        </div>
        <div>
          <label htmlFor="addressId">Adres ID: </label>
          <input type="text" id="addressId" ref={addressIdInputRef} />
        </div>
        <div>
          <label htmlFor="name">Nazwa: </label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor="phone">Telefon: </label>
          <input type="text" id="phone" ref={phoneInputRef} />
        </div>

        <button>Dodaj magazyn</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddWarehouseForm;
