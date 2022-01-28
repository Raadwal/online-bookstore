const router = require("express").Router();
const response = require("./../models/response");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.kierownik";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          managerId: element["kierownik_id"],
          name: element["imie"],
          surname: element["nazwisko"],
          phone: element["telefon"],
          email: element["email"],
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
    const surname = body.surname;
    const phone = body.phone;
    const email = body.email;

    const sql = "INSERT INTO ksiegarnia.kierownik(imie, nazwisko, telefon, email) VALUES($1, $2, $3, $4)";
    const values = [name, surname, phone, email];

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
