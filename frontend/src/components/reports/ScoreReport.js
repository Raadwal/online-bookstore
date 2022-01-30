import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function ScoreReport() {
  const [scores, getScores] = useState([]);
  const url = "http://127.0.0.1:8000/score";

  const getAllScores = () => {
    axios.get(url).then((res) => {
      getScores(res.data);
    });
  };

  useEffect(() => getAllScores(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w20}>Książka ID</span>
          <span className={classes.w20}>Wydawca ID</span>
          <span className={classes.w20}>Klient ID</span>
          <span className={classes.w20}>Ocena</span>
          <span className={classes.w20}>Komentarz</span>
        </div>
        <div className={classes.dataWrapper}>
          {scores.map((score) => (
            <div key={score.bookId + ":" + score.clientId} className={classes.element}>
              <span className={classes.w20}>{score.bookId}</span>
              <span className={classes.w20}>{score.publisherId}</span>
              <span className={classes.w20}>{score.clientId}</span>
              <span className={classes.w20}>{score.score}</span>
              <span className={classes.w20}>{score.comment}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScoreReport;
