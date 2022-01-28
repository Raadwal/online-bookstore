const router = require("express").Router();
const response = require("./../models/response");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.autor_ksiazka";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          authorId: element["autor_id"],
          bookId: element["ksiazka_id"],
          publisherId: element["wydawca_id"],
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

    const authorId = body.authorId;
    const bookId = body.bookId;
    const publisherId = body.publisherId;

    const sql = "INSERT INTO ksiegarnia.autor_ksiazka(autor_id, ksiazka_id, wydawca_id) VALUES($1, $2, $3)";
    const values = [authorId, bookId, publisherId];

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
