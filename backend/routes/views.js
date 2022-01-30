const router = require("express").Router();
const response = require("./../models/response");

module.exports = (pool) => {
  router.get("/best-books", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.najlepsze_ksiazki";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          title: element["tytul"],
          isbn: element["isbn"],
          avgScore: element["srednia_ocena"],
        });
      });
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas pobierania rekordów: " + err);
    }

    res.send(result);
  });

  router.get("/best-authors", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.najlepsi_autorzy";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          name: element["imie"],
          surname: element["nazwisko"],
          avgScore: element["srednia_ocena"],
        });
      });
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas pobierania rekordów: " + err);
    }

    res.send(result);
  });

  router.get("/popular-books", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.najpopularniejsze_ksiazki";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          title: element["tytul"],
          isbn: element["isbn"],
          genre: element["gatunek"],
          soldQuantity: element["ilosc_sprzedanych_sztuk"],
        });
      });
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas pobierania rekordów: " + err);
    }

    res.send(result);
  });

  router.get("/popular-authors", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.najpopularniejsi_autorzy";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          name: element["imie"],
          surname: element["nazwisko"],
          soldBooks: element["ilosc_sprzedanych_ksiazek"],
        });
      });
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas pobierania rekordów: " + err);
    }

    res.send(result);
  });

  router.get("/publisher-earnings", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.wydawnictwo_zarobki";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          name: element["nazwa"],
          soldBooks: element["ilosc"],
          earnings: element["zarobki"],
        });
      });
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas pobierania rekordów: " + err);
    }

    res.send(result);
  });

  router.get("/low-stock", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.male_stany_magazynowe";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          quantity: element["ilosc"],
          isbn: element["ISBN"],
          publisher: element["wydawca_nazwa"],
          phone: element["wydawca_telefon"],
        });
      });
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas pobierania rekordów: " + err);
    }

    res.send(result);
  });

  return router;
};
