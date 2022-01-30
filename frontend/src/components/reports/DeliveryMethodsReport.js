import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function DeliveryMethodsReport() {
  const [deliveryMethods, getDeliveryMethods] = useState([]);
  const url = "http://127.0.0.1:8000/delivery-method";

  const getAllDeliveryMethods = () => {
    axios.get(url).then((res) => {
      getDeliveryMethods(res.data);
    });
  };

  useEffect(() => getAllDeliveryMethods(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w10}>Metoda dostawy ID</span>
          <span className={classes.w20}>Nazwa</span>
          <span className={classes.w20}>Cena</span>
          <span className={classes.w25}>Minimalny czas dostawy</span>
          <span className={classes.w25}>Maksymalny czas dostawy</span>
        </div>
        <div className={classes.dataWrapper}>
          {deliveryMethods.map((deliveryMethod) => (
            <div key={deliveryMethod.methodId} className={classes.element}>
              <span className={classes.w10}>{deliveryMethod.methodId}</span>
              <span className={classes.w20}>{deliveryMethod.name}</span>
              <span className={classes.w20}>{deliveryMethod.price}</span>
              <span className={classes.w25}>{deliveryMethod.minDeliveryTime}</span>
              <span className={classes.w25}>{deliveryMethod.maxDeliveryTime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeliveryMethodsReport;
