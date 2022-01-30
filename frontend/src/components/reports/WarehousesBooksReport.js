import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function WarehousesBooksReport() {
  const [warehousesAndBooks, getWarehousesAndBooks] = useState([]);
  const url = "http://127.0.0.1:8000/warehouse-book";

  const getAllWarehousesAndBooks = () => {
    axios.get(url).then((res) => {
      getWarehousesAndBooks(res.data);
    });
  };

  useEffect(() => getAllWarehousesAndBooks(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w20}>Książka ID</span>
          <span className={classes.w20}>Wydawca ID</span>
          <span className={classes.w20}>Magazyn ID</span>
          <span className={classes.w20}>Adres ID</span>
          <span className={classes.w20}>Ilość</span>
        </div>
        <div className={classes.dataWrapper}>
          {warehousesAndBooks.map((warehouseAndBook) => (
            <div key={warehouseAndBook.warehouseId + " " + warehouseAndBook.bookId} className={classes.element}>
              <span className={classes.w20}>{warehouseAndBook.bookId}</span>
              <span className={classes.w20}>{warehouseAndBook.publisherId}</span>
              <span className={classes.w20}>{warehouseAndBook.warehouseId}</span>
              <span className={classes.w20}>{warehouseAndBook.addressId}</span>
              <span className={classes.w20}>{warehouseAndBook.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WarehousesBooksReport;
