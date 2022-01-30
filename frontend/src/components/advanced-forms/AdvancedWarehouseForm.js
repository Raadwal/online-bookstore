import axios from "axios";
import { useRef, useState } from "react";
import AdvancedFormsNavigation from "../layout/AdvancedFormsNavigation";

import classes from "./AddForm.module.css";

function AdvancedWarehouseForm() {
  const [response, getResponse] = useState([]);
  const url = "http://127.0.0.1:8000/advanced-forms/warehouse";

  const warehouseNameInputRef = useRef();
  const warehousePhoneInputRef = useRef();

  const managerNameInputRef = useRef();
  const managerSurnameInputRef = useRef();
  const managerPhoneInputRef = useRef();
  const managerMailInputRef = useRef();

  const countryInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();
  const streetInputRef = useRef();
  const buildingInputRef = useRef();
  const flatInputRef = useRef();

  function submintHandler(event) {
    event.preventDefault();

    const data = {
      warehouseName: warehouseNameInputRef.current.value,
      warehousePhone: warehousePhoneInputRef.current.value,

      managerName: managerNameInputRef.current.value,
      managerSurname: managerSurnameInputRef.current.value,
      managerPhone: managerPhoneInputRef.current.value,
      managerMail: managerMailInputRef.current.value,

      country: countryInputRef.current.value,
      city: cityInputRef.current.value,
      postalCode: postalCodeInputRef.current.value,
      street: streetInputRef.current.value,
      building: buildingInputRef.current.value,
      flat: flatInputRef.current.value,
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
          <label htmlFor="warehouseName">Nazwa magazynu: </label>
          <input type="text" id="warehouseName" ref={warehouseNameInputRef} />
        </div>
        <div>
          <label htmlFor="warehousePhone">Telefon do magazynu::</label>
          <input type="text" id="warehousePhone" ref={warehousePhoneInputRef} />
        </div>

        <div>
          <label htmlFor="managerName">Imię kierownika: </label>
          <input type="text" id="managerName" ref={managerNameInputRef} />
        </div>
        <div>
          <label htmlFor="managerSurname">Nazwisko kierownika: </label>
          <input type="text" id="managerSurname" ref={managerSurnameInputRef} />
        </div>
        <div>
          <label htmlFor="managerPhone">Telefon kierownika:</label>
          <input type="text" id="managerPhone" ref={managerPhoneInputRef} />
        </div>
        <div>
          <label htmlFor="email">E-mail kierownika: </label>
          <input type="text" id="email" ref={managerMailInputRef} />
        </div>

        <div>
          <label htmlFor="country">Kraj: </label>
          <input type="text" id="country" ref={countryInputRef} />
        </div>
        <div>
          <label htmlFor="city">Miasto: </label>
          <input type="text" id="city" ref={cityInputRef} />
        </div>
        <div>
          <label htmlFor="postalCode">Kod pocztowy: </label>
          <input type="text" id="postalCode" ref={postalCodeInputRef} />
        </div>
        <div>
          <label htmlFor="street">Ulica: </label>
          <input type="text" id="street" ref={streetInputRef} />
        </div>
        <div>
          <label htmlFor="building">Numer budynku: </label>
          <input type="text" id="building" ref={buildingInputRef} />
        </div>
        <div>
          <label htmlFor="flat">Numer mieszkania: </label>
          <input type="text" id="flat" ref={flatInputRef} />
        </div>


        <button>Dodaj dane</button>
      </form>
      <div className={classes.result}>{response.message}</div>
    </div>
  );
}

export default AdvancedWarehouseForm;
