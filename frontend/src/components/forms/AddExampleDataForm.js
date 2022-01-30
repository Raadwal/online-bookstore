import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddExampleDataForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/examples/insert";

  const checkInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    if(checkInputRef.current.value === "WprowadzDane") {
        axios.post(url).then((res) => {
            getResponse(res.data);
          });
    } else {
        alert('Wpisz: "WprowadzDane"')
    }
  }

  return (
    <div>
      <FormsNavigation />
      <form className={classes.form} onSubmit={submintHandler}>
        <div>
          <label htmlFor="check">Wpisz ponizej: "WprowadzDane" : </label>
          <input type="text" id="check" ref={checkInputRef} />
        </div>

        <button>Wprowadź!</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddExampleDataForm;
