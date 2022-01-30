import { useEffect, useState } from "react";
import axios from "axios";
import AdvancedReportsNavigation from "../layout/AdvancedReportsNavigation";

import classes from "./Reports.module.css";

function PublisherEarningsReport() {
  const [publishers, getPublishers] = useState([]);
  const url = "http://127.0.0.1:8000/views/publisher-earnings";

  const getAllPublishers = () => {
    axios.get(url).then((res) => {
      getPublishers(res.data);
    });
  };

  useEffect(() => getAllPublishers(), []);

  return (
    <div>
      <AdvancedReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w33}>Nazwa</span>
          <span className={classes.w33}>Ilość sprzedanych książek</span>
          <span className={classes.w33}>Zarobki</span>
        </div>
        <div className={classes.dataWrapper}>
          {publishers.map((publisher) => (
            <div key={publisher.name} className={classes.element}>
              <span className={classes.w33}>{publisher.name}</span>
              <span className={classes.w33}>{publisher.soldBooks}</span>
              <span className={classes.w33}>{publisher.earnings}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublisherEarningsReport;
