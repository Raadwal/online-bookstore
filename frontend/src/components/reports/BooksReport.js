import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function BooksReport() {
  const [books, getBooks] = useState([]);
  const url = "http://127.0.0.1:8000/book";

  const getAllBooks = () => {
    axios.get(url).then((res) => {
      getBooks(res.data);
    });
  };

  useEffect(() => getAllBooks(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.wId}>Książka ID</span>
          <span className={classes.wId}>Wydawca ID</span>
          <span className={classes.w10}>Tytuł</span>
          <span className={classes.w15}>ISBN</span>
          <span className={classes.w15}>Gatunek</span>
          <span className={classes.w5}>Strony</span>
          <span className={classes.w15}>Data wydania</span>
          <span className={classes.w10}>Cena</span>
          <span className={classes.w15}>Opis</span>
        </div>
        <div className={classes.dataWrapper}>
          {books.map((book) => (
            <div key={book.bookId} className={classes.element}>
              <span className={classes.wId}>{book.bookId}</span>
              <span className={classes.wId}>{book.publisherId}</span>
              <span className={classes.w10}>{book.title}</span>
              <span className={classes.w15}>{book.isbn}</span>
              <span className={classes.w15}>{book.genre}</span>
              <span className={classes.w5}>{book.pages}</span>
              <span className={classes.w15}>{book.publicationDate}</span>
              <span className={classes.w10}>{book.price}</span>
              <span className={classes.w15}>{book.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BooksReport;
