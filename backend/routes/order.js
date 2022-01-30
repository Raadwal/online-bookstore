const router = require("express").Router();
const response = require("./../models/response");
const { format, parse } = require("date-and-time");

module.exports = (pool) => {
  router.get("", async (req, res) => {
    let result = [];
    const sql = "SELECT * FROM ksiegarnia.zamowienie";

    try {
      const res = await pool.query(sql);

      res.rows.forEach((element) => {
        result.push({
          orderId: element["zamowienie_id"],
          addressId: element["adres_id"],
          deliveryMethodId: element["metoda_id"],
          bookId: element["ksiazka_id"],
          publisherId: element["wydawca_id"],
          clientId: element["klient_id"],
          quantity: element["ilosc"],
          orderDate: format(element["data_zamowienia"], "YYYY-MM-DD"),
          status: element["status"],
          postDate: format(element["data_wyslania"], "YYYY-MM-DD"),
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
    const deliveryMethodId = body.deliveryMethodId;
    const bookId = body.bookId;
    const publisherId = body.publisherId;
    const clientId = body.clientId;
    const quantity = body.quantity;
    const orderDate = body.orderDate;
    const status = body.status;
    const postDate = body.postDate;

    const sql =
      "INSERT INTO ksiegarnia.zamowienie(adres_id, metoda_id, ksiazka_id, wydawca_id, klient_id, ilosc, data_zamowienia, status, data_wyslania) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const values = [addressId, deliveryMethodId, bookId, publisherId, clientId, quantity, orderDate, status, postDate];

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
