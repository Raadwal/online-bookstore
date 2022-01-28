const router = require("express").Router();

const response = require("./../models/response");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.wydawca";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          publisherId: element["wydawca_id"],
          name: element["nazwa"],
          phone: element["telefon"],
          website: element["strona_www"],
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

    const name = body.name;
    const phone = body.phone;
    const website = body.website

    const sql = "INSERT INTO ksiegarnia.wydawca(nazwa, telefon, strona_www) VALUES($1, $2, $3)";
    const values = [name, phone, website];

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
