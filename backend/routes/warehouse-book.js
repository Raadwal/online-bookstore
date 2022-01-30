const router = require("express").Router();
const response = require("./../models/response");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.magazyn_ksiazka";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          bookId: element["ksiazka_id"],
          publisherId: element["wydawca_id"],
          warehouseId: element["magazyn_id"],
          managerId: element["kierownik_id"],
          addressId: element["adres_id"],
          quantity: element["ilosc"],
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
    const warehouseId = body.warehouseId;
    const addressId = body.addressId;
    const quantity = body.quantity;

    const sql = "INSERT INTO ksiegarnia.magazyn_ksiazka(ksiazka_id, wydawca_id, magazyn_id, adres_id, ilosc) VALUES($1, $2, $3, $4, $5)";
    const values = [bookId, publisherId, warehouseId, addressId, quantity];

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
