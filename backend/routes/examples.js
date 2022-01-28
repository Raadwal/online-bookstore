const router = require("express").Router();
const response = require("./../models/response");

module.exports = (pool) => {
  router.post("/insert", async (req, res) => {
    let responseMessage;
    const data = {};

    data.authorExampleDataSQL = `INSERT INTO ksiegarnia.autor(imie, nazwisko, data_urodzenia, miejsce_urodzenia, opis) VALUES 
    ('Zuzanna', 'Nowak', '1560-12-03', 'Kraków', 'Opis'),
    ('Przemysław', 'Walczak', '1943-04-14', 'Warszawa', NULL),
    ('Filip', 'Kowalczyk', '1876-10-23', 'Gdańsk', 'Opis'),
    ('Zofia', 'Kaczmarek', '1924-07-14', 'Rzeszów', NULL),
    ('Maja', 'Mazur', '1990-01-20', 'Zakopane', 'Opis'),
    ('Lena', 'Krawczyk', '1675-04-20', 'Wrocław', NULL),
    ('Szymon', 'Mazur', '1980-03-02', 'Warszawa', NULL),
    ('Aleksander', 'Kwiatkowski', '1984-08-21', 'Kraków', 'Opis'),
    ('Jakub', 'Potrowski', '1939-10-29', 'Warszawa', 'Opis'),
    ('Alicja', 'Lewandowska', '1965-01-23', 'Gdańsk', NULL)`;

    data.managerExampleDataSQL = `INSERT INTO ksiegarnia.kierownik(imie, nazwisko, telefon, email) VALUES 
    ('Tomasz', 'Stępień', '744-213-421', 'tomasz@gmail.com'),
    ('Krystyna', 'Adamczyk', '732-412-654', NULL),
    ('Ewa', 'Olszewska', '675-654-432', 'ewa@hotmail.com'),
    ('Marcin', 'Malinowski', '768-321-543', NULL),
    ('Zofia', 'Górska', '876-432-543', NULL),
    ('Marek', 'Pawlak', '796-345-325', 'marek@gmail.com'),
    ('Beata', 'Witkowska', '532-321-543', 'beata@gmail.com'),
    ('Wojciech', 'Sikora', '432-432-534', NULL),
    ('Marta', 'Majewska', '432-555-322', NULL),
    ('Ryszard', 'Zając', '876-436-324', 'ryszard@hotmail.com')`;

    data.addressExampleDataSQL = `INSERT INTO ksiegarnia.adres(kraj, miasto, kod_pocztowy, ulica, nr_budynku, nr_mieszkania) VALUES
    ('Polska', 'Warszawa', '00-012', 'Marszałkowska', '35A', '12'),
    ('Polska', 'Warszawa', '00-012', 'Złota', '123B', '5'),
    ('Polska', 'Warszawa', '00-012', 'Świętokrzyska', '3', '12'),
    ('Polska', 'Warszawa', '00-012', 'Marszałkowska', '68', ''),
    ('Polska', 'Kraków', '30-007', 'Aleja Juliusza Słowackiego', '65A', '12b'),
    ('Polska', 'Kraków', '30-007', 'Aleja Juliusza Słowackiego', '65', '3'),
    ('Polska', 'Kraków', '30-007', 'Mazowiecka', '56', ''),
    ('Polska', 'Kraków', '30-007', 'Aleja Juliusza Słowackiego', '23', ''),
    ('Polska', 'Katowice', '40-001', 'Bażantów', '144B', ''),
    ('Polska', 'Katowice', '40-001', 'Wieżowa', '23', '3A'),
    ('Polska', 'Katowice', '40-001', 'Radockiego', '76', '44'),
    ('Polska', 'Wrocław', '45-573', 'Gazowa', '14', ''),
    ('Polska', 'Wrocław', '45-573', 'Karwińska', '23A', ''),
    ('Niemcy', 'Berlin', '10178', 'Spandauer', '10C', '33'),
    ('Niemcy', 'Lipsk', '04103', 'Numberger', '33', ''),
    ('Polska', 'Gdańsk', '80-011', 'Kątowa', '87', '11'),
    ('Polska', 'Poznań', '60-001', 'Wykopy', '65', ''),
    ('Czechy', 'Praga', '10300', 'Medunkova', '432', '22'),
    ('Czechy', 'Brno', '60200', 'Kotlarska', '43', ''),
    ('Niemcy', 'Drezno', '01067', 'Freiberger', '32', ''),
    ('Polska', 'Łódź', '90-005', 'Nawrot', '42H', ''),
    ('Niemcy', 'Monachium', '80637', 'Numberger', '19', '24'),
    ('Polska', 'Kielce', '25-011', 'Kapitulna', '56', '4'),
    ('Niemcy', 'Brema', '28205', 'Am Hulsberg', '51B', '14'),
    ('Słowacja', 'Bratysława', '2412', 'Bratska', '21A', '52'),
    ('Polska', 'Olsztyn', '10-008', 'Feliksa Szrajbera', '31', '14'),
    ('Polska', 'Rzeszów', '35-000', 'Jarowa', '23', '32'),
    ('Niemcy', 'Hamburg', '20257', 'Weckmannweg', '22E', '32'),
    ('Polska', 'Białystok', '15-005', 'Henruka Sienkiewicza', '14', '44'),
    ('Polska', 'Opole', '45-006', 'Katedralna', '55', '41'),
    ('Niemcy', 'Wittenber', '06889', 'Grabo', '10F', '')`;

    data.publisherExampleDataSQL = `INSERT INTO ksiegarnia.wydawca(nazwa, telefon, strona_www) VALUES
    ('Aneks', '566-566-566', 'www.aneks.pl'),
    ('CDN', '500-505-510', ''),
    ('Bres', '200-200-200', 'www.bres.pl'),
    ('Rebis ', '340-350-350', 'www.rebis.pl'),
    ('Fogra', '400-400-400', '')`;

    data.bookExampleDataSQL = `INSERT INTO ksiegarnia.ksiazka(wydawca_id, tytul, isbn, gatunek, liczba_stron, data_wydania, cena, opis) VALUES
    ('1', 'Duma i uprzedzenie', '0-2468-8405-3', 'Klasyka', '368', '2013-03-13', '19.99', 'Opis'),
    ('1', '1984', '0-8662-0323-0', 'Dystopia', '317','2011-11-15', '29.99', ''),
    ('3', 'Wielki Gatsby', '0-7789-8008-1', 'Klasyka', '642', '2004-11-18', '24.99', 'Opis'),
    ('2', 'Zbrodnia i Kara', '0-3447-7648-4', 'Klasyka', '321', '1984-10-20', '19.99', ''),
    ('2', 'Stary Człowiek i Morze', '0-5611-2992-4', 'Klasyka', '332', '2014-12-21', '9.99', ''),
    ('5', 'Wojna i Pokój', '978-5-6977-6762-7', 'Klasyka', '413', '2017-04-22', '19.99', 'Opis'),
    ('4', 'Don Kichot', '978-7-6521-4559-4', 'Klasyka', '234', '2003-05-24', '24.99', 'Opis'),
    ('3', 'Ulysses', '978-5-7974-2108-5', 'Klasyka', '412', '2014-05-26', '19.99', 'Opis'),
    ('2', 'Dżuma', '0-4003-0878-9', 'Klasyka', '321', '2013-06-01', '19.99', '9.99'),
    ('1', 'Przebudzenie', '0-8352-5412-7', 'Klasyka', '513', '2014-01-07', '24.99', ''),
    ('5', 'Homodeus: Krótka Historia Jutra', '0-6611-0067-7', 'Popularnonaukowa', '321', '2014-03-10', '24.99', 'Opis'),
    ('3', 'Homosapiens: Od Zwirząt do Bogów', '978-1-6629-4577-9', 'Popularnonaukowa', '443', '2018-05-12', '24.99', 'Opis'),
    ('3', 'Włam się do mózgu', '978-1-4876-2529-0', 'Popularnonaukowa', '321', '2019-03-20', '24.99', ''),
    ('1', 'O mrówkach', '978-5-1560-3927-2', 'Popularnonaukowa', '321', '2013-10-14', '29.99', '')`;

    data.warehouseExampleDataSQL = `INSERT INTO ksiegarnia.magazyn(kierownik_id, adres_id, nazwa, telefon) VALUES 
    ('1', '9', 'Wiatr Magazyn', '865-323-124'),
    ('4', '17', 'Książkowo Magazyn', '765-423-453'),
    ('3', '8', 'Magazyn Dobra', '355-232-432'),
    ('5', '4', 'Bridgestone', '432-543-234'),
    ('3', '7', 'Multichem Magazyn', '543-256-256'),
    ('7', '21', 'Deltabook Magazyn', '975-344-543')`;

    data.warehouseBookExampleDataSQL = `INSERT INTO ksiegarnia.magazyn_ksiazka(ksiazka_id, wydawca_id, magazyn_id, adres_id, ilosc) VALUES
    ('1', '1', '1', '9', '200'),
    ('14', '1', '2', '17', '500'),
    ('1', '1', '2', '17', '150'),
    ('2', '1', '3', '8', '300'),
    ('3', '3', '3', '8', '40'),
    ('4', '2', '2', '17', '200'),
    ('3', '3', '1', '9', '150'),
    ('6', '5', '2', '17', '10'),
    ('9', '2', '6', '21', '100'),
    ('8', '3', '6', '21', '100'),
    ('9', '2', '5', '7', '200'),
    ('2', '1', '1', '9', '150'),
    ('11', '5', '1', '9', '300'),
    ('11', '5', '2', '17', '400'),
    ('8', '3', '2', '17', '200'),
    ('14', '1', '3', '8', '150'),
    ('2', '1', '2', '17', '500'),
    ('4', '2', '3', '8', '200'),
    ('10', '1', '1', '9', '110'),
    ('5', '2', '5', '7', '400'),
    ('12', '3', '1', '9', '500'),
    ('7', '4', '5', '7', '200'),
    ('13', '3', '1', '9', '100')`;

    data.authorBookExampleDataSQL = `INSERT INTO ksiegarnia.autor_ksiazka(autor_id, ksiazka_id, wydawca_id) VALUES
    ('3', '1', '1'),
    ('5', '2', '1'),
    ('4', '3', '3'),
    ('2', '4', '2'),
    ('1', '5', '2'),
    ('5', '5', '2'),
    ('2', '6', '5'),
    ('7', '7', '4'),
    ('4', '7', '4'),
    ('1', '8', '3'),
    ('4', '9', '2'),
    ('7', '10', '1'),
    ('3', '11', '5'),
    ('6', '11', '5'),
    ('10', '12', '3'),
    ('1', '13', '3'),
    ('8', '14', '1')`;

    data.deliveryMethodExampleDataSQL = `INSERT INTO ksiegarnia.metoda_dostawy(nazwa, cena, czas_dostawy_od, czas_dostawy_do) VALUES
    ('Kurier InPost', '13.99', '1', '2'),
    ('Kurer DPD', '11.99', '2', '4'),
    ('Kurier GLS', '12.99', '1', '2'),
    ('Kurier DHL', '13.99', '1', '3'),
    ('Paczkomat InPost', '9.99', '1', '2'),
    ('Kurier FedEx', '13.99', '1', '2'),
    ('Kurier UPS', '14.99', '1', '3');`;

    data.clientExampleDataSQL = `INSERT INTO ksiegarnia.klient(adres_id, imie, nazwisko, telefon, email, haslo) VALUES
    ('1', 'Dobromił', 'Kwiatkowski', '883-442-244', 'dobromil@gmail.com', 'Zahaszowane  hasło'),
    ('14', 'Alisa ', 'Kowalczyk', '888-234-124', 'alisa@hotmail.com', 'Zahaszowane  hasło'),
    ('22', 'Kewin', 'Przybylski', '645-432-358', 'kewin@o2.pl', 'Zahaszowane  hasło'),
    ('23', 'Patryk', 'Szymański', '432-532-312', 'patryk@gmail.com', 'Zahaszowane  hasło'),
    ('3', 'Adrianna', 'Kaźmierczak', '421-421-432', 'adrianna@outlook.com', 'Zahaszowane  hasło'),
    ('6', 'Amalia', 'Mróz', '897-346-325', 'amalia@o2.pl', 'Zahaszowane  hasło'),
    ('25', 'Faustyna', 'Górska', '324-632-145', 'faustyna@o2.pl', 'Zahaszowane  hasło'),
    ('18', 'Józef', 'Rutkowski', '436-257-268', 'jozef@gmail.com', 'Zahaszowane  hasło'),
    ('28', 'Bartłomiej', 'Cieślak', '853-326-468', 'bartlomiej@gmail.com', 'Zahaszowane  hasło'),
    ('3', 'Adrianna', 'Kalinowska', '432-788-33', 'adrianna@gmail.com', 'Zahaszowane  hasło'),
    ('4', 'Andrzej', 'Kowalczyk', '654-975-654', 'andrzej@gmail.com', 'Zahaszowane  hasło'),
    ('10', 'Dorota', 'Urbańska', '342-743-436', 'dorota@hotmail.com', 'Zahaszowane  hasło'),
    ('3', 'Amanda', 'Kamińska', '876-453-636', 'amanda@outlook.com', 'Zahaszowane  hasło'),
    ('11', 'Malwina', 'Szewczyk', '342-754-643', 'malwina@gmail.com', 'Zahaszowane  hasło'),
    ('16', 'Kazimierz', 'Mróz', '676-653-864', 'kazimierz@hotmail.com', 'Zahaszowane  hasło'),
    ('24', 'Dorian', 'Zawadzki', '978-543-453', 'dorian@outlook.com', 'Zahaszowane  hasło'),
    ('28', 'Milena', 'Lis', '677-467-321', 'milena@hotmail.com', 'Zahaszowane  hasło'),
    ('16', 'Konrad', 'Kamiński', '600-765-695', 'konrad@o2.com', 'Zahaszowane  hasło'),
    ('29', 'Denis', 'Kaczmarczyk', '875-657-467', 'denic@gmail.com', 'Zahaszowane  hasło'),
    ('30', 'Anatol', 'Ostrowski', '897-875-654', 'anatol@o2.com', 'Zahaszowane  hasło')`;

    data.orderExampleDataSQL = `INSERT INTO ksiegarnia.zamowienie(adres_id, metoda_id, ksiazka_id, wydawca_id, klient_id, ilosc, data_zamowienia, status, data_wyslania) VALUES
    ('25', '1', '1', '1', '1', '1', '2020-01-01', 'Wysłana', '2020-01-10'),
    ('28', '5', '2', '1', '5', '1', '2021-02-19', 'Wysłana', '2020-02-22'),
    ('10', '6', '10', '1', '3', '1', '2020-10-20', 'Wysłana', '2020-10-21'),
    ('16', '4', '14', '1', '2', '1', '2022-07-05', 'W przygotowaniu', NULL),
    ('14', '2', '10', '1', '8', '2', '2020-01-14', 'Wysłana', '2020-01-20'),
    ('27', '7', '12', '3', '7', '1', '2020-03-12', 'Wysłana', '2020-03-15'),
    ('6', '3', '14', '1', '4', '1', '2022-03-10', 'W przygotowaniu', NULL),
    ('30', '1', '2', '1', '11', '1', '2020-12-06', 'Wysłana', '2020-12-07'),
    ('14', '1', '2', '1', '15', '1', '2020-01-10', 'Wysłana', '2020-02-20'),
    ('11', '1', '7', '4', '20', '1', '2020-03-01', 'Wysłana', '2020-03-05'),
    ('16', '4', '14', '1', '19', '10', '2021-03-02', 'Wysłana', '2021-04-02'),
    ('11', '1', '7', '4', '20', '1', '2021-03-20', 'Wysłana', '2021-05-20'),
    ('27', '1', '13', '3', '13', '1', '2021-01-19', 'Wysłana', '2021-01-24'),
    ('25', '1', '10', '1', '16', '1', '2022-12-20', 'W przygotowaniu', NULL),
    ('27', '1', '5', '2', '1', '1', '2021-01-09', 'Wysłana', '2021-01-15'),
    ('28', '2', '7', '4', '2', '1', '2021-07-15', 'Wysłana', '2021-08-17'),
    ('2', '3', '10', '1', '4', '50', '2022-1-05', 'W przygotowaniu', NULL),
    ('3', '3', '10', '1', '8', '1', '2022-09-14', 'W przygotowaniu', NULL),
    ('5', '3', '10', '1', '9', '1', '2021-02-10', 'Wysłana', '2021-02-15'),
    ('6', '7', '9', '2', '10', '1', '2021-02-27', 'Wysłana', '2021-03-10'),
    ('6', '6', '9', '2', '11', '1', '2022-10-23', 'W przygotowaniu', NULL)`;

    data.scoreExampleDataSQL = `INSERT INTO ksiegarnia.ocena(ksiazka_id, wydawca_id, klient_id, ocena, komentarz) VALUES
    ('1', '1', '1', '10', NULL),
    ('2', '1', '4', '6', NULL),
    ('10', '1', '3', '7', 'komentarz'),
    ('11', '5', '2', '5', 'komentarz'),
    ('14', '1', '8', '4', NULL),
    ('9', '2', '12', '1', NULL),
    ('7', '4', '17', '5', NULL),
    ('6', '5', '18', '10', NULL),
    ('3', '3', '10', '7', 'komentarz'),
    ('2', '1', '11', '8', NULL),
    ('1', '1', '15', '8', 'komentarz'),
    ('1', '1', '20', '8', 'komentarz'),
    ('2', '1', '15', '6', NULL),
    ('10', '1', '5', '6', NULL),
    ('11', '5', '6', '5', 'komentarz'),
    ('14', '1', '10', '3', NULL),
    ('9', '2', '11', '10', NULL),
    ('7', '4', '5', '5', NULL),
    ('6', '5', '5', '9', 'komentarz'),
    ('3', '3', '20', '5', NULL),
    ('2', '1', '10', '10', NULL),
    ('1', '1', '5', '1', 'komentarz'),
    ('1', '1', '4', '1', 'komentarz'),
    ('2', '1', '3', '2', NULL),
    ('10', '1', '2', '4', NULL),
    ('11', '5', '1', '10', 'komentarz'),
    ('14', '1', '5', '10', NULL),
    ('9', '2', '10', '5', NULL),
    ('7', '4', '20', '10', 'komentarz'),
    ('6', '5', '16', '9', 'komentarz'),
    ('3', '3', '15', '6', NULL),
    ('2', '1', '14', '6', NULL),
    ('1', '1', '16', '4', NULL)`;

    try {
      await pool.query(data.authorExampleDataSQL);
      await pool.query(data.managerExampleDataSQL);
      await pool.query(data.addressExampleDataSQL);
      await pool.query(data.publisherExampleDataSQL);
      await pool.query(data.bookExampleDataSQL);
      await pool.query(data.warehouseExampleDataSQL);
      await pool.query(data.warehouseBookExampleDataSQL);
      await pool.query(data.authorBookExampleDataSQL);
      await pool.query(data.deliveryMethodExampleDataSQL);
      await pool.query(data.clientExampleDataSQL);
      await pool.query(data.orderExampleDataSQL);
      await pool.query(data.scoreExampleDataSQL);
      responseMessage = response.message(true, "Przykładowe dane zostały wprowadzone do bazy!");
    } catch (err) {
      responseMessage = response.message(false, "Wystąpił błąd podczas wprowadzania przykładowych danych: " + err);
    }

    res.send(responseMessage);
  });

  return router;
};
