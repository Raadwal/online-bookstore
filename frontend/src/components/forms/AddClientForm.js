import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddClientForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/client";

  const addressIdInputRef = useRef();
  const nameInputRef = useRef();
  const surnameCodeInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      addressId: addressIdInputRef.current.value,
      name: nameInputRef.current.value,
      surname: surnameCodeInputRef.current.value,
      phone: phoneInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
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
          <label htmlFor="addresId">Adres ID: </label>
          <input type="text" id="addresId" ref={addressIdInputRef} />
        </div>
        <div>
          <label htmlFor="name">Imię: </label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor="surname">Nazwisko: </label>
          <input type="text" id="surname" ref={surnameCodeInputRef} />
        </div>
        <div>
          <label htmlFor="phone"> Telefon: </label>
          <input type="text" id="phone" ref={phoneInputRef} />
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input type="text" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">Hasło: </label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>

        <button>Dodaj klienta</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddClientForm;
