const router = require("express").Router();
const { format, parse } = require("date-and-time");
const response = require("./../models/response");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.ksiazka";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          bookId: element["ksiazka_id"],
          publisherId: element["wydawca_id"],
          title: element["tytul"],
          isbn: element["isbn"],
          genre: element["gatunek"],
          pages: element["liczba_stron"],
          publicationDate: format(element["data_wydania"], "YYYY-MM-DD"),
          price: element["cena"],
          description: element["opis"],
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

    const publisherId = body.publisherId;
    const title = body.title;
    const isbn = body.isbn;
    const genre = body.genre;
    const pages = body.pages;
    const publicationDate = body.publicationDate;
    const price = body.price;
    const description = body.description;

    const sql = "INSERT INTO ksiegarnia.ksiazka(wydawca_id, tytul, isbn, gatunek, liczba_stron, data_wydania, cena, opis) VALUES($1, $2, $3, $4, $5, $6, $7, $8)";
    const values = [publisherId, title, isbn, genre, pages, publicationDate, price, description];

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
