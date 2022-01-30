import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function AddressesReport() {
  const [addresses, getAddresses] = useState([]);
  const url = "http://127.0.0.1:8000/address";

  const getAllAddresses = () => {
    axios.get(url).then((res) => {
      getAddresses(res.data);
    });
  };

  useEffect(() => getAllAddresses(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w10}>Adres ID</span>
          <span className={classes.w10}>Kraj</span>
          <span className={classes.w10}>Miasto</span>
          <span className={classes.w20}>Kod pocztowy</span>
          <span className={classes.w20}>Ulica</span>
          <span className={classes.w15}>Numer budynku</span>
          <span className={classes.w15}>Numer mieszkania</span>
        </div>
        <div className={classes.dataWrapper}>
          {addresses.map((address) => (
            <div key={address.warehouseId} className={classes.element}>
              <span className={classes.w10}>{address.addressId}</span>
              <span className={classes.w10}>{address.country}</span>
              <span className={classes.w10}>{address.city}</span>
              <span className={classes.w20}>{address.postalCode}</span>
              <span className={classes.w20}>{address.street}</span>
              <span className={classes.w15}>{address.buildingNumber}</span>
              <span className={classes.w15}>{address.apartmentNumber}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddressesReport;
