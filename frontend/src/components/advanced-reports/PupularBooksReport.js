import { useEffect, useState } from "react";
import axios from "axios";
import AdvancedReportsNavigation from "../layout/AdvancedReportsNavigation";

import classes from "./Reports.module.css";

function PopularBooksReport() {
  const [books, getBooks] = useState([]);
  const url = "http://127.0.0.1:8000/views/popular-books";

  const getAllBooks = () => {
    axios.get(url).then((res) => {
      getBooks(res.data);
    });
  };

  useEffect(() => getAllBooks(), []);

  return (
    <div>
      <AdvancedReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w25}>Tytuł</span>
          <span className={classes.w25}>ISBN</span>
          <span className={classes.w25}>Gatunek</span>
          <span className={classes.w25}>Ilość sprzedanych sztuk</span>
        </div>
        <div className={classes.dataWrapper}>
          {books.map((book) => (
            <div key={book.isbn} className={classes.element}>
              <span className={classes.w25}>{book.title}</span>
              <span className={classes.w25}>{book.isbn}</span>
              <span className={classes.w25}>{book.genre}</span>
              <span className={classes.w25}>{book.soldQuantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularBooksReport;
