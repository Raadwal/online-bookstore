import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AdvancedFormsNavigation from "../layout/AdvancedFormsNavigation";

import classes from "./AddForm.module.css";

function AdvancedAddBooksToWarehouse() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/advanced-forms/add-books-warehouse";
  const [books, getBooks] = useState([]);
  const bookUrl = "http://127.0.0.1:8000/book";
  const [warehouses, getWarehouses] = useState([]);
  const warehouseUrl = "http://127.0.0.1:8000/warehouse";

  const getAllBooks = () => {
    axios.get(bookUrl).then((res) => {
      getBooks(res.data);
    });
  };

  const getAllWarehouses = () => {
    axios.get(warehouseUrl).then((res) => {
      getWarehouses(res.data);
    });
  };

  useEffect(() => getAllWarehouses(), []);

  useEffect(() => getAllBooks(), []);

  const warehouseIdInputRef = useRef();
  const bookIdInputRef = useRef();
  const quantityInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const data = {
      warehouseId: warehouseIdInputRef.current.value,
      bookId: bookIdInputRef.current.value,
      quantity: quantityInputRef.current.value,
    };

    data.warehouseId = data.warehouseId.split(":")[0];
    data.bookId = data.bookId.split(":")[0];

    axios.post(url, data).then((res) => {
      getResponse(res.data);
    });
  }

  return (
    <div>
      <AdvancedFormsNavigation />
      <form className={classes.form} onSubmit={submintHandler}>
        <div>
          <label htmlFor="book">Książka: </label>
          <select id="book" ref={bookIdInputRef}>
          {books.map((book) => (
              <option key={[book.bookId, book.publisherId]}>
                {book.bookId + ": " + book.title + ", " + book.isbn}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="warehouse">Magazyn: </label>
          <select id="warehouse" ref={warehouseIdInputRef}>
            {warehouses.map((warehouse) => (
              <option key={[warehouse.warehouseId, warehouse.addressId]}>{warehouse.warehouseId + ": " + warehouse.name + ", " + warehouse.phone}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity">Ilość:</label>
          <input type="text" id="quantity" ref={quantityInputRef} />
        </div>

        <button>Dodaj dane</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AdvancedAddBooksToWarehouse;
