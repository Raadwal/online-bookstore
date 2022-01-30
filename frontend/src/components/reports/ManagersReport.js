import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function ManagersReport() {
  const [managers, getManagers] = useState([]);
  const url = "http://127.0.0.1:8000/manager";

  const getAllManagers = () => {
    axios.get(url).then((res) => {
      getManagers(res.data);
    });
  };

  useEffect(() => getAllManagers(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w20}>Kierownik ID</span>
          <span className={classes.w20}>Imię</span>
          <span className={classes.w20}>Nazwisko</span>
          <span className={classes.w20}>Telefon</span>
          <span className={classes.w20}>E-mail</span>
        </div>
        <div className={classes.dataWrapper}>
          {managers.map((manager) => (
            <div key={manager.managerId} className={classes.element}>
            <span className={classes.w20}>{manager.managerId}</span>
              <span className={classes.w20}>{manager.name}</span>
              <span className={classes.w20}>{manager.surname}</span>
              <span className={classes.w20}>{manager.phone}</span>
              <span className={classes.w20}>{manager.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManagersReport;
