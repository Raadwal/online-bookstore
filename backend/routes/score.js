const router = require("express").Router();
const response = require("./../models/response");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.ocena";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          bookId: element["ksiazka_id"],
          publisherId: element["wydawca_id"],
          clientId: element["klient_id"],
          score: element["ocena"],
          comment: element["komentarz"],
        });
      });
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas pobierania rekordów: " + err);
    }

    res.send(result);
  });

  router.post("", async (req, res) => {
    let responseMessage;
    const body = req.body;

    const bookId = body.bookId;
    const publisherId = body.publisherId;
    const clientId = body.clientId;
    const score = body.score;
    const comment =  body.comment;

    const sql = "INSERT INTO ksiegarnia.ocena(ksiazka_id, wydawca_id, klient_id, ocena, komentarz) VALUES($1, $2, $3, $4, $5)";
    const values = [bookId, publisherId, clientId, score, comment];

    try {
      const res = await pool.query(sql, values);
      responseMessage = response.message(true, "Rekord został dodany do bazy!");
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas dodawania rekordu: " + err);
    }

    res.send(responseMessage);
  });

  return router;
};
