const router = require("express").Router();
const { format, parse } = require("date-and-time");

const response = require("./../models/response");
const date = require("./../models/validator-date");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.autor";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          authorId: element["autor_id"],
          name: element["imie"],
          surname: element["nazwisko"],
          birthDate: format(element["data_urodzenia"], "YYYY-MM-DD"),
          birthPlace: element["miejsce_urodzenia"],
          description: element["opis"] ? element["opis"] : "",
        });
      });
    } catch (err) {
      responseMessage = response.message(true, "Wystąpił błąd podczas pobierania rekordów: " + err);
    }

    res.send(result);
  });

  router.post("", async (req, res) => {
    let responseMessage;
    const body = req.body;

    const name = body.name;
    const surname = body.surname;
    const birthDate = body.birthDate;
    const birthPlace = body.birthPlace;
    const description = body.description;

    const sql = "INSERT INTO ksiegarnia.autor(imie, nazwisko, data_urodzenia, miejsce_urodzenia, opis) VALUES($1, $2, $3, $4, $5)";
    const values = [name, surname, birthDate, birthPlace, description];

    try {
      const res = await pool.query(sql, values);
      responseMessage = response.message(true, "Rekord został dodany do bazy!");
    } catch (err) {
      responseMessage = response.message(true, "Wystąpił błąd podczas dodawania rekordu: " + err);
    }

    res.send(responseMessage);
  });

  return router;
};
/*
validateAuthorData = (name, surname, birthDate, birthPlace) => {
  let dataCorrect = false;

  console.log(name);

  if (name && surname && birthDate) {
    if (date.validateDate(birthDate)) {
      dataCorrect = true;
    }
  }

  return dataCorrect;
};
*/
