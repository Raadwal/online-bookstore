import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function WarehousesReport() {
  const [warehouses, getWarehouses] = useState([]);
  const url = "http://127.0.0.1:8000/warehouse";

  const getAllWarehouses = () => {
    axios.get(url).then((res) => {
      getWarehouses(res.data);
    });
  };

  useEffect(() => getAllWarehouses(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w20}>Magazyn ID</span>
          <span className={classes.w20}>Kierownik ID</span>
          <span className={classes.w20}>Adres ID</span>
          <span className={classes.w20}>Nazwa</span>
          <span className={classes.w20}>Telefon</span>
        </div>
        <div className={classes.dataWrapper}>
          {warehouses.map((warehouse) => (
            <div key={warehouse.warehouseId} className={classes.element}>
            <span className={classes.w20}>{warehouse.warehouseId}</span>
              <span className={classes.w20}>{warehouse.managerId}</span>
              <span className={classes.w20}>{warehouse.addressId}</span>
              <span className={classes.w20}>{warehouse.name}</span>
              <span className={classes.w20}>{warehouse.phone}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WarehousesReport;
