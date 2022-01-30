const router = require("express").Router();
const response = require("./../models/response");

module.exports = (pool) => {

  router.post("/book", async (req, res) => {
    let responseMessage;
    const body = req.body;

    const title = body.title;
    const isbn = body.isbn;
    const genre = body.genre;
    const pages = body.pages;
    const releaseDate = body.releaseDate;
    const price = body.price;
    const bookDescription = body.bookDescription;

    const publisherName = body.publisherName;
    const publisherPhone = body.publisherPhone;
    const publisherWebsite = body.publisherWebsite;
    
    const authorName = body.authorName;
    const authorSurname = body.authorSurname;
    const authorBirthDate = body.authorBirthDate;
    const authorBirthPlace = body.authorBirthPlace;
    const authorDescription = body.authorDescription;

    const sql = `SELECT ksiegarnia.dodaj_ksiazke
                ('${title}', '${isbn}', '${genre}', '${pages}', '${releaseDate}', '${price}', '${bookDescription}', 
                    '${authorName}', '${authorSurname}', '${authorBirthDate}', '${authorBirthPlace}', '${authorDescription}', 
                    '${publisherName}', '${publisherPhone}', '${publisherWebsite}')`;
   
    try {
      await pool.query(sql);
      responseMessage = response.message(true, "Rekord został dodany do bazy!");
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas dodawania rekordu: " + err);
    }
    
    res.send(responseMessage);
  });

  router.post("/warehouse", async (req, res) => {
    let responseMessage;
    const body = req.body;

    const warehouseName = body.warehouseName;
    const warehousePhone = body.warehousePhone;

    const managerName = body.managerName;
    const managerSurname = body.managerSurname;
    const managerPhone = body.managerPhone;
    const managerMail = body.managerMail;

    const country = body.country;
    const city = body.city;
    const postalCode = body.postalCode;
    const street = body.street;
    const building = body.building;
    const flat = body.flat;
 
    const sql = `SELECT ksiegarnia.dodaj_magazyn
                ('${warehouseName}', '${warehousePhone}', 
                '${managerName}', '${managerSurname}', '${managerPhone}', '${managerMail}', 
                '${country}', '${city}', '${postalCode}', '${street}', '${building}', '${flat}')`;
   
    try {
      await pool.query(sql);
      responseMessage = response.message(true, "Rekord został dodany do bazy!");
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas dodawania rekordu: " + err);
    }
    
    res.send(responseMessage);
  });

  router.post("/add-books-warehouse", async (req, res) => {
    let responseMessage;
    const body = req.body;

    const warehouseId = body.warehouseId;
    const bookId = body.bookId;
    const quantity = body.quantity;
 
    const sql = `SELECT ksiegarnia.dodaj_ksiazki_magazyn('${warehouseId}', '${bookId}', '${quantity}')`;
   
    try {
      await pool.query(sql);
      responseMessage = response.message(true, "Rekord został dodany do bazy!");
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas dodawania rekordu: " + err);
    }
    
    res.send(responseMessage);
  });

  return router;
};
