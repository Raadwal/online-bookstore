import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddOrderForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/order";

  const addressIdInputRef = useRef();
  const deliveryMethodIdInputRef = useRef();
  const bookIdInputRef = useRef();
  const publisherIdInputRef = useRef();
  const clientIdInputRef = useRef();
  const quantityInputRef = useRef();
  const orderDateInputRef = useRef();
  const statusInputRef = useRef();
  const postDateInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      addressId: addressIdInputRef.current.value,
      deliveryMethodId: deliveryMethodIdInputRef.current.value,
      bookId: bookIdInputRef.current.value,
      publisherId: publisherIdInputRef.current.value,
      clientId: clientIdInputRef.current.value,
      quantity: quantityInputRef.current.value,
      orderDate: orderDateInputRef.current.value,
      status: statusInputRef.current.value,
      postDate: postDateInputRef.current.value,
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
          <label htmlFor="addresId">Adres ID: </label>
          <input type="text" id="addresId" ref={addressIdInputRef} />
        </div>
        <div>
          <label htmlFor="deliveryMethodId">Metoda dostawy ID: </label>
          <input type="text" id="deliveryMethodId" ref={deliveryMethodIdInputRef} />
        </div>
        <div>
          <label htmlFor="bookId">Książka ID: </label>
          <input type="text" id="bookId" ref={bookIdInputRef} />
        </div>
        <div>
          <label htmlFor="publisherId"> Wydawca ID: </label>
          <input type="text" id="publisherId" ref={publisherIdInputRef} />
        </div>
        <div>
          <label htmlFor="clientId">klient ID: </label>
          <input type="text" id="clientId" ref={clientIdInputRef} />
        </div>
        <div>
          <label htmlFor="quantity">Ilość: </label>
          <input type="text" id="quantity" ref={quantityInputRef} />
        </div>
        <div>
          <label htmlFor="orderDate">Data zamówienia: </label>
          <input type="text" id="orderDate" ref={orderDateInputRef} />
        </div>
        <div>
          <label htmlFor="status">Status: </label>
          <input type="text" id="status" ref={statusInputRef} />
        </div>
        <div>
          <label htmlFor="postDate">Data wysłania: </label>
          <input type="text" id="postDate" ref={postDateInputRef} />
        </div>

        <button>Dodaj zamówienie</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddOrderForm;
