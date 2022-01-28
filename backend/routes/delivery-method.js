const router = require("express").Router();
const response = require("../models/response");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.metoda_dostawy";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          methodId: element["metoda_id"],
          name: element["nazwa"],
          price: element["cena"],
          minDeliveryTime: element["czas_dostawy_od"],
          maxDeliveryTime: element["czas_dostawy_do"],
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
    const price = body.price;
    const minDeliveryTime = body.minDeliveryTime;
    const maxDeliveryTime = body.maxDeliveryTime;

    const sql = "INSERT INTO ksiegarnia.metoda_dostawy(nazwa, cena, czas_dostawy_od, czas_dostawy_do) VALUES($1, $2, $3, $4)";
    const values = [name, price, minDeliveryTime, maxDeliveryTime];

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
