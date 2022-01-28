const router = require("express").Router();
const response = require("./../models/response");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.klient";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          clientId: element["klient_id"],
          addressId: element["adres_id"],
          name: element["imie"],
          surname: element["nazwisko"],
          phone: element["telefon"],
          email: element["email"],
          password: element["haslo"],
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

    const addressId = body.addressId;
    const name = body.name;
    const surname = body.surname;
    const phone = body.phone;
    const email = body.email;
    const password = body.password;

    const sql = "INSERT INTO ksiegarnia.klient(adres_id, imie, nazwisko, telefon, email, haslo) VALUES($1, $2, $3, $4, $5, $6)";
    const values = [addressId, name, surname, phone, email, password];

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
