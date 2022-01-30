import axios from "axios";
import { useRef, useState } from "react";
import AdvancedFormsNavigation from "../layout/AdvancedFormsNavigation";

import classes from "./AddForm.module.css";

function AdvancedAddBook() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/advanced-forms/book";

  const bookTitleInputRef = useRef();
  const bookIsbnInputRef = useRef();
  const bookGenreInputRef = useRef();
  const bookPagesInputRef = useRef();
  const bookReleaseDateInputRef = useRef();
  const bookPriceInputRef = useRef();
  const bookDescriptionInputRef = useRef();

  const publisherNameInputRef = useRef();
  const publisherPhoneInputRef = useRef();
  const publisherWebsiteInputRef = useRef();

  const authorNameInputRef = useRef();
  const authorSurnameInputRef = useRef();
  const authorBirthDateInputRef = useRef();
  const auhtorBirthPlaceInputRef = useRef();
  const authorDescriptionInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const data = {
      title: bookTitleInputRef.current.value,
      isbn: bookIsbnInputRef.current.value,
      genre: bookGenreInputRef.current.value,
      pages: bookPagesInputRef.current.value,
      releaseDate: bookReleaseDateInputRef.current.value,
      price: bookPriceInputRef.current.value,
      bookDescription: bookDescriptionInputRef.current.value,

      publisherName: publisherNameInputRef.current.value,
      publisherPhone: publisherPhoneInputRef.current.value,
      publisherWebsite: publisherWebsiteInputRef.current.value,

      authorName: authorNameInputRef.current.value,
      authorSurname: authorSurnameInputRef.current.value,
      authorBirthDate: authorBirthDateInputRef.current.value,
      authorBirthPlace: auhtorBirthPlaceInputRef.current.value,
      authorDescription: authorDescriptionInputRef.current.value,
    };
    
    axios.post(url, data).then((res) => {
      getResponse(res.data);
    });
  }

  return (
    <div>
      <AdvancedFormsNavigation />
      <form className={classes.form} onSubmit={submintHandler}>
        <div>
          <label htmlFor="title">Tytuł książki: </label>
          <input type="text" id="title" ref={bookTitleInputRef} />
        </div>
        <div>
          <label htmlFor="isbn">ISBN:</label>
          <input type="text" id="isbn" ref={bookIsbnInputRef} />
        </div>
        <div>
          <label htmlFor="genre">Gatunek: </label>
          <input type="text" id="genre" ref={bookGenreInputRef} />
        </div>
        <div>
          <label htmlFor="pages">Liczba stron: </label>
          <input type="text" id="pages" ref={bookPagesInputRef} />
        </div>
        <div>
          <label htmlFor="releaseDate">Data wydania:</label>
          <input type="text" id="releaseDate" ref={bookReleaseDateInputRef} />
        </div>
        <div>
          <label htmlFor="price">Cena: </label>
          <input type="text" id="price" ref={bookPriceInputRef} />
        </div>
        <div>
          <label htmlFor="description">Opis książki: </label>
          <input type="text" id="description" ref={bookDescriptionInputRef} />
        </div>

        <div>
          <label htmlFor="publisherName">Wydawca: </label>
          <input type="text" id="publisherName" ref={publisherNameInputRef} />
        </div>
        <div>
          <label htmlFor="publisherPhone">Telefon do wydawcy: </label>
          <input type="text" id="publisherPhone" ref={publisherPhoneInputRef} />
        </div>
        <div>
          <label htmlFor="publisherWebsite">Strona wydawcy: </label>
          <input type="text" id="publisherWebsite" ref={publisherWebsiteInputRef} />
        </div>

        <div>
          <label htmlFor="authorName">Imię autora: </label>
          <input type="text" id="authorName" ref={authorNameInputRef} />
        </div>
        <div>
          <label htmlFor="authorSurname">Nazwisko autora: </label>
          <input type="text" id="" ref={authorSurnameInputRef} />
        </div>
        <div>
          <label htmlFor="authorSurname">Data urodzenia: </label>
          <input type="text" id="" ref={authorBirthDateInputRef} />
        </div>
        <div>
          <label htmlFor="authorBirthPlace">Miejsce urodzenia: </label>
          <input type="text" id="authorBirthPlace" ref={auhtorBirthPlaceInputRef} />
        </div>
        <div>
          <label htmlFor="authorDescription">Opis autora: </label>
          <input type="text" id="authorDescription" ref={authorDescriptionInputRef} />
        </div>


        <button>Dodaj dane</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AdvancedAddBook;
