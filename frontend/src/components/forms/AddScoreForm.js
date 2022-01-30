import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddScoreForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/score";

  const bookIdInputRef = useRef();
  const publisherIdInputRef = useRef();
  const clientIdInputRef = useRef();
  const scoreInputRef = useRef();
  const commentInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      bookId: bookIdInputRef.current.value,
      publisherId: publisherIdInputRef.current.value,
      clientId: clientIdInputRef.current.value,
      score: scoreInputRef.current.value,
      comment: commentInputRef.current.value,
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
          <label htmlFor="bookId">Book ID: </label>
          <input type="text" id="bookId" ref={bookIdInputRef} />
        </div>
        <div>
          <label htmlFor="publisherId">Wydawca ID: </label>
          <input type="text" id="publisherId" ref={publisherIdInputRef} />
        </div>
        <div>
          <label htmlFor="clientId">Klient ID: </label>
          <input type="text" id="clientId" ref={clientIdInputRef} />
        </div>
        <div>
          <label htmlFor="score">Ocena: </label>
          <input type="text" id="score" ref={scoreInputRef} />
        </div>
        <div>
          <label htmlFor="comment">Opis książki: </label>
          <textarea id="comment" rows="2" cols="2" ref={commentInputRef} />
        </div>

        <button>Dodaj ocenę książki</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddScoreForm;
