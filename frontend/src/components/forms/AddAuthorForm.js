import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddAuthorForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/author";

  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const birthDateInputRef = useRef();
  const birthPlaceInputRef = useRef();
  const descriptionInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      name: nameInputRef.current.value,
      surname: surnameInputRef.current.value,
      birthDate: birthDateInputRef.current.value,
      birthPlace: birthPlaceInputRef.current.value,
      description: descriptionInputRef.current.value,
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
          <label htmlFor="birtDate">Data urodzenia: </label>
          <input type="text" id="birtDate" ref={birthDateInputRef} />
        </div>
        <div>
          <label htmlFor="birthPlace">Miejsce urodzenia: </label>
          <input type="text" id="birthPlace" ref={birthPlaceInputRef} />
        </div>
        <div>
          <label htmlFor="description">Opis książki: </label>
          <textarea id="description" rows="2" cols="2" ref={descriptionInputRef} />
        </div>

        <button>Dodaj autora</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddAuthorForm;
