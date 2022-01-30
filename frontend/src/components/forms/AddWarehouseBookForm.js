import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddWarehouseBookForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/warehouse-book";

  const bookIdInputRef = useRef();
  const publisherIdInputRef = useRef();
  const warehouseIdInputRef = useRef();
  const managerIdInputRef = useRef();
  const addressIdInputRef = useRef();
  const quantityInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      bookId: bookIdInputRef.current.value,
      publisherId: publisherIdInputRef.current.value,
      warehouseId: warehouseIdInputRef.current.value,
      addressId: addressIdInputRef.current.value,
      quantity: quantityInputRef.current.value,
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
          <label htmlFor="bookId">Książka ID: </label>
          <input type="text" id="bookId" ref={bookIdInputRef} />
        </div>
        <div>
          <label htmlFor="publisherId">Wydawca ID: </label>
          <input type="text" id="publisherId" ref={publisherIdInputRef} />
        </div>
        <div>
          <label htmlFor="warehouseId">Magazyn ID: </label>
          <input type="text" id="warehouseId" ref={warehouseIdInputRef} />
        </div>
        <div>
          <label htmlFor="adresId">Adres ID: </label>
          <input type="text" id="adresId" ref={addressIdInputRef} />
        </div>
        <div>
          <label htmlFor="quantity">Ilość: </label>
          <input type="text" id="quantity" ref={quantityInputRef} />
        </div>

        <button>Dodaj książki do magazynu</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddWarehouseBookForm;
