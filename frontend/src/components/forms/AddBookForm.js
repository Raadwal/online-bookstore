import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddBookForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/book";

  const titleInputRef = useRef();
  const publisherIdInputRef = useRef();
  const isbnInputRef = useRef();
  const genreInputRef = useRef();
  const pagesNumberInputRef = useRef();
  const releaseDateInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      title: titleInputRef.current.value,
      publisherId: publisherIdInputRef.current.value,
      isbn: isbnInputRef.current.value,
      genre: genreInputRef.current.value,
      pages: pagesNumberInputRef.current.value,
      publicationDate: releaseDateInputRef.current.value,
      price: priceInputRef.current.value,
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
          <label htmlFor="title">Tytuł książki: </label>
          <input type="text" id="title" ref={titleInputRef} />
        </div>
        <div>
          <label htmlFor="publisherId">Wydawca ID: </label>
          <input type="text" id="publisherId" ref={publisherIdInputRef} />
        </div>
        <div>
          <label htmlFor="isbn">ISBN: </label>
          <input type="text" id="isbn" ref={isbnInputRef} />
        </div>
        <div>
          <label htmlFor="genre">Gatunek: </label>
          <input type="text" id="genre" ref={genreInputRef} />
        </div>
        <div>
          <label htmlFor="pagesNumber">Liczba stron: </label>
          <input type="text" id="pagesNumber" ref={pagesNumberInputRef} />
        </div>
        <div>
          <label htmlFor="releaseDate">Data wydania: </label>
          <input type="text" id="releaseDate" ref={releaseDateInputRef} />
        </div>
        <div>
          <label htmlFor="price">Cena: </label>
          <input type="text" id="price" ref={priceInputRef} />
        </div>
        <div>
          <label htmlFor="description">Opis książki: </label>
          <textarea id="description" rows="2" cols="2" ref={descriptionInputRef} />
        </div>

        <button>Dodaj książkę</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddBookForm;
