import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function OrdersReports() {
  const [orders, getOrders] = useState([]);
  const url = "http://127.0.0.1:8000/order";

  const getAllOrders = () => {
    axios.get(url).then((res) => {
      getOrders(res.data);
    });
  };

  useEffect(() => getAllOrders(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w10}>Zamówienie ID</span>
          <span className={classes.w10}>Adres ID</span>
          <span className={classes.w10}>Metoda dostawy ID</span>
          <span className={classes.w10}>Książka ID</span>
          <span className={classes.w10}>Wydawca ID</span>
          <span className={classes.w10}>Klient ID</span>
          <span className={classes.w10}>Ilość</span>
          <span className={classes.w10}>Data zamówienia</span>
          <span className={classes.w10}>Status</span>
          <span className={classes.w10}>Data wysłania</span>
        </div>
        <div className={classes.dataWrapper}>
          {orders.map((order) => (
            <div key={order.orderId} className={classes.element}>
              <span className={classes.w10}>{order.orderId}</span>
              <span className={classes.w10}>{order.addressId}</span>
              <span className={classes.w10}>{order.deliveryMethodId}</span>
              <span className={classes.w10}>{order.bookId}</span>
              <span className={classes.w10}>{order.publisherId}</span>
              <span className={classes.w10}>{order.clientId}</span>
              <span className={classes.w10}>{order.quantity}</span>
              <span className={classes.w10}>{order.orderDate}</span>
              <span className={classes.w10}>{order.status}</span>
              <span className={classes.w10}>{order.postDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersReports;
