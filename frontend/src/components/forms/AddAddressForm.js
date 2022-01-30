import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddAddressForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/address";

  const countryInputRef = useRef();
  const cityIdInputRef = useRef();
  const postalCodeInputRef = useRef();
  const streetInputRef = useRef();
  const buildingNumberInputRef = useRef();
  const apartmentNumberInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const book = {
      country: countryInputRef.current.value,
      city: cityIdInputRef.current.value,
      postalCode: postalCodeInputRef.current.value,
      street: streetInputRef.current.value,
      buildingNumber: buildingNumberInputRef.current.value,
      apartmentNumber: apartmentNumberInputRef.current.value,
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
          <label htmlFor="country">Kraj: </label>
          <input type="text" id="country" ref={countryInputRef} />
        </div>
        <div>
          <label htmlFor="city">Miasto: </label>
          <input type="text" id="city" ref={cityIdInputRef} />
        </div>
        <div>
          <label htmlFor="postalCode">Kod pocztowy: </label>
          <input type="text" id="postalCode" ref={postalCodeInputRef} />
        </div>
        <div>
          <label htmlFor="street">Nazwa ulicy: </label>
          <input type="text" id="street" ref={streetInputRef} />
        </div>
        <div>
          <label htmlFor="buildingNumber">Numer budynku: </label>
          <input type="text" id="buildingNumber" ref={buildingNumberInputRef} />
        </div>
        <div>
          <label htmlFor="apartmentNumber">Number mieszkania: </label>
          <input type="text" id="apartmentNumber" ref={apartmentNumberInputRef} />
        </div>

        <button>Dodaj adres</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AddAddressForm;
