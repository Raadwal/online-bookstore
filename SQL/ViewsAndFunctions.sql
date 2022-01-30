CREATE VIEW ksiegarnia.najlepsze_ksiazki AS
    SELECT tytul, isbn, ROUND(AVG(ocena)::numeric, 2) AS srednia_ocena 
    FROM ksiegarnia.ksiazka
    JOIN ksiegarnia.ocena USING(ksiazka_id)
    GROUP BY ksiazka.ksiazka_id, tytul, isbn
    ORDER BY AVG(ocena) DESC;

CREATE VIEW ksiegarnia.najlepsi_autorzy AS
    SELECT imie, nazwisko, ROUND(AVG(ocena)::numeric, 2) AS srednia_ocena
    FROM ksiegarnia.autor
    JOIN ksiegarnia.autor_ksiazka USING(autor_id)
    JOIN ksiegarnia.ksiazka USING(ksiazka_id)
    JOIN ksiegarnia.ocena USING(ksiazka_id)
    GROUP BY autor_id
    ORDER BY AVG(ocena) DESC;

CREATE VIEW ksiegarnia.najpopularniejsze_ksiazki AS 
    SELECT tytul, isbn, gatunek, SUM(ilosc) as ilosc_sprzedanych_sztuk
    FROM ksiegarnia.ksiazka
    JOIN ksiegarnia.zamowienie USING(ksiazka_id)
    GROUP BY ksiazka_id, tytul, isbn, gatunek
    ORDER BY SUM(ilosc) DESC;

CREATE VIEW ksiegarnia.najpopularniejsi_autorzy AS
    SELECT imie, nazwisko, SUM(ilosc) AS ilosc_sprzedanych_ksiazek
    FROM ksiegarnia.autor
    JOIN ksiegarnia.autor_ksiazka USING(autor_id)
    JOIN ksiegarnia.ksiazka USING(ksiazka_id)
    JOIN ksiegarnia.zamowienie USING(ksiazka_id)
    GROUP BY autor_id
    ORDER BY SUM(ilosc) DESC;

CREATE VIEW ksiegarnia.wydawnictwo_zarobki AS 
    SELECT wydawca.nazwa, SUM(ilosc) AS ilosc, ROUND(SUM(ksiazka.cena * ilosc)::numeric, 2) AS zarobki
    FROM ksiegarnia.wydawca
    JOIN ksiegarnia.ksiazka USING(wydawca_id)
    JOIN ksiegarnia.zamowienie USING(ksiazka_id)
    GROUP BY wydawca.wydawca_id
    ORDER BY SUM(ksiazka.cena) DESC;

CREATE VIEW  ksiegarnia.male_stany_magazynowe AS 
        SELECT SUM(magazyn_ksiazka.ilosc) AS ilosc, ksiazka.isbn as ISBN, wydawca.nazwa as wydawca_nazwa, wydawca.telefon as wydawca_telefon
        FROM ksiegarnia.wydawca 
        JOIN ksiegarnia.ksiazka USING(wydawca_id)
        JOIN ksiegarnia.magazyn_ksiazka USING(ksiazka_id)
        GROUP BY ksiazka.ksiazka_id, ksiazka.isbn, wydawca.nazwa, wydawca.telefon
        HAVING SUM(magazyn_ksiazka.ilosc) < 100
        ORDER BY SUM(magazyn_ksiazka.ilosc);


CREATE OR REPLACE FUNCTION ksiegarnia.dodaj_ksiazke(_tytul VARCHAR, _isbn VARCHAR, _gatunek VARCHAR, _liczba_stron INTEGER, _data_wydania DATE, _cena FLOAT, _opis_ksiazka VARCHAR, 
                                _imie VARCHAR, _nazwisko VARCHAR, _data_urodzenia DATE, _miejsce_urodzenia VARCHAR, _opis_autor VARCHAR,
                                _nazwa VARCHAR, _telefon VARCHAR, _strona VARCHAR)
  RETURNS void AS
  $BODY$
    DECLARE
        wydawcaID INTEGER DEFAULT 0;
        ksiazkaID INTEGER DEFAULT 0;
        autorID INTEGER DEFAULT 0;
        wydawcaIstnieje INTEGER DEFAULT 1;
        ksiazkaIstnieje INTEGER DEFAULT 1;
        autorIstnieje INTEGER DEFAULT 1;
    BEGIN
        IF LENGTH(_tytul) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwy tytul!';
        END IF;
        IF LENGTH(_isbn) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwy ISBN!';
        END IF;
        IF LENGTH(_gatunek) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwy gatunek!';
        END IF;
        IF _liczba_stron <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwa liczba stron!';
        END IF;
        IF _cena <= 0 THEN
            RAISE EXCEPTION 'Niewlacciwa cena!';
        END IF;

        IF LENGTH(_imie) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe imie!';
        END IF;
        IF LENGTH(_nazwisko) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe nazwisko!';
        END IF;
        IF LENGTH(_miejsce_urodzenia) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe miejsce urodzenia!';
        END IF;

        IF LENGTH(_nazwa) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe imie!';
        END IF;
        IF LENGTH(_telefon) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwy telfon!';
        END IF;
        IF(_telefon NOT LIKE '___-___-___') THEN
            RAISE EXCEPTION 'Niewlasciwy telfon!';
        END IF;

        SELECT wydawca_id INTO wydawcaID FROM ksiegarnia.wydawca WHERE nazwa = _nazwa AND telefon = _telefon AND strona_www = _strona LIMIT 1;
        IF wydawcaID IS NULL THEN
            INSERT INTO ksiegarnia.wydawca(nazwa, telefon, strona_www) VALUES(_nazwa, _telefon, _strona) RETURNING wydawca_id INTO wydawcaID;
            wydawcaIstnieje := 0;
        END IF;

        SELECT ksiazka_id INTO ksiazkaID FROM ksiegarnia.ksiazka 
        WHERE wydawca_id = wydawcaID AND tytul = _tytul AND isbn = _isbn AND gatunek = _gatunek and data_wydania = _data_wydania LIMIT 1;

        IF ksiazkaID IS NULL THEN
            INSERT INTO ksiegarnia.ksiazka(wydawca_id, tytul, isbn, gatunek, liczba_stron, data_wydania, cena, opis) 
            VALUES(wydawcaID, _tytul, _isbn, _gatunek, _liczba_stron, _data_wydania, _cena, _opis_ksiazka) RETURNING ksiazka_id INTO ksiazkaID;
            ksiazkaIstnieje := 0;
        END IF;
        
        SELECT autor_id INTO autorID FROM ksiegarnia.autor 
        WHERE imie = _imie AND nazwisko = _nazwisko AND data_urodzenia = _data_urodzenia AND miejsce_urodzenia = _miejsce_urodzenia;

        IF autorID IS NULL THEN
            INSERT INTO ksiegarnia.autor(imie, nazwisko, data_urodzenia, miejsce_urodzenia, opis) 
            VALUES(_imie, _nazwisko, _data_urodzenia, _miejsce_urodzenia, _opis_autor) RETURNING autor_id INTO autorID;
            autorIstnieje := 0;
        END IF;
        
        IF autorIstnieje = 1 AND ksiazkaIstnieje = 1 AND wydawcaIstnieje = 1 THEN
            RAISE EXCEPTION 'Podane dane zanjduja juz sie w bazie!';
        ELSE 
            INSERT INTO ksiegarnia.autor_ksiazka(autor_id, ksiazka_id, wydawca_id) 
            VALUES(autorID, ksiazkaID, wydawcaID);
        END IF;
        
    END;
  $BODY$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION ksiegarnia.dodaj_magazyn(_nazwa VARCHAR, _magazyn_telefon VARCHAR, 
                                _imie VARCHAR, _nazwisko VARCHAR, _kierownik_telefon VARCHAR, _email VARCHAR,
                                _kraj VARCHAR, _miasto VARCHAR, _kod_pocztowy VARCHAR, _ulica VARCHAR, _budynek VARCHAR, _mieszkanie VARCHAR)
  RETURNS void AS
  $BODY$
    DECLARE
        kierownikID INTEGER DEFAULT 0;
        adresID INTEGER DEFAULT 0;
        kierownikIstnieje INTEGER DEFAULT 1;
        adresIstnieje INTEGER DEFAULT 1;
    BEGIN
        IF LENGTH(_nazwa) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwy tytul!';
        END IF;
        IF (_magazyn_telefon NOT LIKE '___-___-___') THEN
            RAISE EXCEPTION 'Niewlasciwy telfon do magazynu!';
        END IF;
        
        IF LENGTH(_imie) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe imie!';
        END IF;
        IF LENGTH(_nazwisko) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe nazwisko!';
        END IF;
        IF (_magazyn_telefon NOT LIKE '___-___-___') THEN
            RAISE EXCEPTION 'Niewlasciwy telfon do kierownika!';
        END IF;

        IF LENGTH(_kraj) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe imie!';
        END IF;
        IF LENGTH(_miasto) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe imie!';
        END IF;
        IF LENGTH(_kod_pocztowy) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe imie!';
        END IF;
        IF LENGTH(_ulica) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe imie!';
        END IF;
        IF LENGTH(_budynek) <= 0 THEN
            RAISE EXCEPTION 'Niewlasciwe imie!';
        END IF;

        SELECT adres_id INTO adresID FROM ksiegarnia.adres
        WHERE kraj = _kraj AND miasto = _miasto AND kod_pocztowy = _kod_pocztowy AND ulica = _ulica AND nr_budynku = _budynek AND nr_mieszkania = _mieszkanie;

        IF adresID IS NULL THEN
            INSERT INTO ksiegarnia.adres(kraj, miasto, kod_pocztowy, ulica, nr_budynku, nr_mieszkania)
            VALUES (_kraj, _miasto, _kod_pocztowy, _ulica, _budynek, _mieszkanie) RETURNING adres_id INTO adresID;
            adresIstnieje = 0;
        END IF;

       SELECT kierownik_id INTO kierownikID FROM ksiegarnia.kierownik
       WHERE imie = _imie AND nazwisko = _nazwisko AND telefon = _kierownik_telefon AND email = _email;

        IF kierownikID IS NULL THEN
            INSERT INTO ksiegarnia.kierownik(imie, nazwisko, telefon, email)
            VALUES(_imie, _nazwisko, _kierownik_telefon, _email) RETURNING kierownik_id INTO kierownikID;
            kierownikIstnieje = 0;
        END IF;

        IF adresIstnieje = 1 THEN
            RAISE EXCEPTION 'Magazyn pod tym adresem już istnieje!';
        ELSE 
            INSERT INTO ksiegarnia.magazyn(adres_id, kierownik_id, nazwa, telefon)
            VALUES(adresID, kierownikID, _nazwa, _magazyn_telefon);
        END IF;

    END;
  $BODY$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION ksiegarnia.dodaj_ksiazki_magazyn(_magazyn_id INTEGER, _ksiazka_id INTEGER, _ilosc INTEGER)
  RETURNS void AS
  $BODY$
    DECLARE
        magazynId INTEGER DEFAULT 0;
        adresId INTEGER DEFAULT 0;
        ksiazkaId INTEGER DEFAULT 0;
        wydawcaId INTEGER DEFAULT 0;
        iloscIstnieje INTEGER DEFAULT 0;
        magazynIstnieje INTEGER DEFAULT 0;
    BEGIN
        magazynId = _magazyn_id;
        ksiazkaId = _ksiazka_id;

        SELECT adres_id INTO adresID FROM ksiegarnia.magazyn WHERE magazyn_id = magazynId LIMIT 1;
        SELECT wydawca_id INTO wydawcaId FROM ksiegarnia.ksiazka WHERE ksiazka_id = ksiazkaId LIMIT 1;

        SELECT ilosc INTO iloscIstnieje FROM ksiegarnia.magazyn_ksiazka WHERE 
        ksiazka_id = ksiazkaId AND wydawca_id = wydawcaId AND magazyn_id = magazynId AND adres_id = adresId LIMIT 1;

        IF iloscIstnieje IS NOT NULL THEN
            iloscIstnieje := iloscIstnieje + _ilosc;
            UPDATE ksiegarnia.magazyn_ksiazka SET ilosc = iloscIstnieje WHERE
            ksiazka_id = ksiazkaId AND wydawca_id = wydawcaId AND magazyn_id = magazynId AND adres_id = adresId;
        ELSE 
            INSERT INTO ksiegarnia.magazyn_ksiazka(ksiazka_id, wydawca_id, magazyn_id, adres_id, ilosc)
            VALUES(ksiazkaId, wydawcaId, magazynId, adresId, _ilosc);
        END IF;

    END;
  $BODY$
LANGUAGE 'plpgsql';