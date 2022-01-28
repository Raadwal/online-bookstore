const router = require("express").Router();
const response = require("./../models/response");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.adres";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          addressId: element["adres_id"],
          country: element["kraj"],
          city: element["miasto"],
          postalCode: element["kod_pocztowy"],
          street: element["ulica"],
          buildingNumber: element["nr_budynku"],
          apartmentNumber: element["nr_mieszkania"],
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

    const country = body.country;
    const city = body.city;
    const postalCode = body.postalCode;
    const street = body.street;
    const buildingNumber = body.buildingNumber;
    const apartmentNumber = body.apartmentNumber;

    const sql = "INSERT INTO ksiegarnia.adres(kraj, miasto, kod_pocztowy, ulica, nr_budynku, nr_mieszkania) VALUES($1, $2, $3, $4, $5, $6)";
    const values = [country, city, postalCode, street, buildingNumber, apartmentNumber];

    try {
      await pool.query(sql, values);
      responseMessage = response.message(true, "Rekord został dodany do bazy!");
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas dodawania rekordu: " + err);
    }

    res.send(responseMessage);
  });

  return router;
};
