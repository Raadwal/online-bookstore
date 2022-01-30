import { useEffect, useState } from "react";
import axios from "axios";
import AdvancedReportsNavigation from "../layout/AdvancedReportsNavigation";

import classes from "./Reports.module.css";

function LowStocksReport() {
  const [informations, getInformations] = useState([]);
  const url = "http://127.0.0.1:8000/views/low-stock";

  const getAllInformations = () => {
    axios.get(url).then((res) => {
        getInformations(res.data);
    });
  };

  useEffect(() => getAllInformations(), []);

  return (
    <div>
      <AdvancedReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w33}>Ilość sztuk we wszystkich magazynach</span>
          <span className={classes.w33}>ISBN</span>
          <span className={classes.w33}>Nazwa wydawcy</span>
          <span className={classes.w33}>Telefon do wydawcy</span>
        </div>
        <div className={classes.dataWrapper}>
          {informations.map((information) => (
            <div key={information.isbn} className={classes.element}>
              <span className={classes.w33}>{information.quantity}</span>
              <span className={classes.w33}>{information.isbn}</span>
              <span className={classes.w33}>{information.publisher}</span>
              <span className={classes.w33}>{information.phone}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LowStocksReport;
