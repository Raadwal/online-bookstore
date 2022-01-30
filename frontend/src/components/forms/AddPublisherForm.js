import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddPublisherForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/publisher";

  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const websiteInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      name: nameInputRef.current.value,
      phone: phoneInputRef.current.value,
      website: websiteInputRef.current.value,
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
          <label htmlFor="name">Nazwa wydawcy: </label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor="phone">Telefon: </label>
          <input type="text" id="phone" ref={phoneInputRef} />
        </div>
        <div>
          <label htmlFor="webiste">Strona internetowa: </label>
          <input type="text" id="website" ref={websiteInputRef} />
        </div>

        <button>Dodaj wydawcę</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddPublisherForm;
