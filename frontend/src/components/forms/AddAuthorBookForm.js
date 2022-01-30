import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddAuthorBookForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/author-book";

  const authorIdInputRef = useRef();
  const bookIdInputRef = useRef();
  const publisherIdInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
        authorId: authorIdInputRef.current.value,
        bookId: bookIdInputRef.current.value,
        publisherId: publisherIdInputRef.current.value,
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
          <label htmlFor="authorId">Autor ID: </label>
          <input type="text" id="authorId" ref={authorIdInputRef} />
        </div>
        <div>
          <label htmlFor="bookId">Książka ID: </label>
          <input type="text" id="bookId" ref={bookIdInputRef} />
        </div>
        <div>
          <label htmlFor="publisherId">Wydawca ID: </label>
          <input type="text" id="publisherId" ref={publisherIdInputRef} />
        </div>

        <button>Dodaj relację</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddAuthorBookForm;
