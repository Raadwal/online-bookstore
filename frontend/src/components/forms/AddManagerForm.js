import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddManagerForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/manager";

  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      name: nameInputRef.current.value,
      surname: surnameInputRef.current.value,
      phone: phoneInputRef.current.value,
      email: emailInputRef.current.value,
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
          <label htmlFor="name">Imię: </label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor="surname">Nazwisko: </label>
          <input type="text" id="surname" ref={surnameInputRef} />
        </div>
        <div>
          <label htmlFor="phone">Telefon: </label>
          <input type="text" id="phone" ref={phoneInputRef} />
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input type="text" id="email" ref={emailInputRef} />
        </div>

        <button>Dodaj kierownika</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddManagerForm;
