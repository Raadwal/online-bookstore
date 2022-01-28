const router = require("express").Router();
const response = require("./../models/response");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.magazyn";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          warehouseId: element["magazyn_id"],
          managerId: element["kierownik_id"],
          addressId: element["adres_id"],
          name: element["nazwa"],
          phone: element["telefon"],
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

    const managerId = body.managerId;
    const addressId = body.addressId;
    const name = body.name;
    const phone = body.phone;

    const sql = "INSERT INTO ksiegarnia.magazyn(kierownik_id, adres_id, nazwa, telefon) VALUES($1, $2, $3, $4)";
    const values = [managerId, addressId, name, phone];

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
