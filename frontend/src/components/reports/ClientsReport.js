import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function ClientsReport() {
  const [clients, getClients] = useState([]);
  const url = "http://127.0.0.1:8000/client";

  const getAllClients = () => {
    axios.get(url).then((res) => {
      getClients(res.data);
    });
  };

  useEffect(() => getAllClients(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w10}>Klient ID</span>
          <span className={classes.w10}>Adres ID</span>
          <span className={classes.w15}>Imie</span>
          <span className={classes.w15}>Nazwisko</span>
          <span className={classes.w15}>Telefon</span>
          <span className={classes.w20}>E-mail</span>
          <span className={classes.w15}>Hasło</span>
        </div>
        <div className={classes.dataWrapper}>
          {clients.map((client) => (
            <div key={client.clientId} className={classes.element}>
              <span className={classes.w10}>{client.clientId}</span>
              <span className={classes.w10}>{client.addressId}</span>
              <span className={classes.w15}>{client.name}</span>
              <span className={classes.w15}>{client.surname}</span>
              <span className={classes.w15}>{client.phone}</span>
              <span className={classes.w20}>{client.email}</span>
              <span className={classes.w15}>{client.password}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientsReport;
