import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function PublishersReport() {
  const [publishers, getPublishers] = useState([]);
  const url = "http://127.0.0.1:8000/publisher";

  const getAllPublishers = () => {
    axios.get(url).then((res) => {
      getPublishers(res.data);
    });
  };

  useEffect(() => getAllPublishers(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w25}>Wydawca ID</span>
          <span className={classes.w25}>Nazwa</span>
          <span className={classes.w25}>Telefon</span>
          <span className={classes.w25}>Strona Internetowa</span>
        </div>
        <div className={classes.dataWrapper}>
          {publishers.map((publisher) => (
            <div key={publisher.publisherId} className={classes.element}>
              <span className={classes.w25}>{publisher.publisherId}</span>
              <span className={classes.w25}>{publisher.name}</span>
              <span className={classes.w25}>{publisher.phone}</span>
              <span className={classes.w25}>{publisher.website}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublishersReport;
