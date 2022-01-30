CREATE SCHEMA ksiegarnia;

CREATE SEQUENCE ksiegarnia.kierownik_kierownik_id_seq;

CREATE TABLE ksiegarnia.kierownik (
                kierownik_id INTEGER NOT NULL DEFAULT nextval('ksiegarnia.kierownik_kierownik_id_seq'),
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                telefon VARCHAR NOT NULL,
                email VARCHAR,
                CONSTRAINT kierownik_id PRIMARY KEY (kierownik_id)
);


ALTER SEQUENCE ksiegarnia.kierownik_kierownik_id_seq OWNED BY ksiegarnia.kierownik.kierownik_id;

CREATE SEQUENCE ksiegarnia.adres_adres_id_seq;

CREATE TABLE ksiegarnia.adres (
                adres_id INTEGER NOT NULL DEFAULT nextval('ksiegarnia.adres_adres_id_seq'),
                kraj VARCHAR NOT NULL,
                miasto VARCHAR NOT NULL,
                kod_pocztowy VARCHAR NOT NULL,
                ulica VARCHAR NOT NULL,
                nr_budynku VARCHAR NOT NULL,
                nr_mieszkania VARCHAR,
                CONSTRAINT adres_id PRIMARY KEY (adres_id)
);


ALTER SEQUENCE ksiegarnia.adres_adres_id_seq OWNED BY ksiegarnia.adres.adres_id;

CREATE SEQUENCE ksiegarnia.magazyn_magazyn_id_seq;

CREATE TABLE ksiegarnia.magazyn (
                magazyn_id INTEGER NOT NULL DEFAULT nextval('ksiegarnia.magazyn_magazyn_id_seq'),
                adres_id INTEGER NOT NULL,
                kierownik_id INTEGER NOT NULL,
                nazwa VARCHAR NOT NULL,
                telefon VARCHAR NOT NULL,
                CONSTRAINT magazyn_id PRIMARY KEY (magazyn_id, adres_id)
);


ALTER SEQUENCE ksiegarnia.magazyn_magazyn_id_seq OWNED BY ksiegarnia.magazyn.magazyn_id;

CREATE SEQUENCE ksiegarnia.metoda_dostawy_metoda_id_seq;

CREATE TABLE ksiegarnia.metoda_dostawy (
                metoda_id INTEGER NOT NULL DEFAULT nextval('ksiegarnia.metoda_dostawy_metoda_id_seq'),
                nazwa VARCHAR NOT NULL,
                cena REAL NOT NULL,
                czas_dostawy_od INTEGER NOT NULL,
                czas_dostawy_do INTEGER NOT NULL,
                CONSTRAINT metoda_id PRIMARY KEY (metoda_id)
);


ALTER SEQUENCE ksiegarnia.metoda_dostawy_metoda_id_seq OWNED BY ksiegarnia.metoda_dostawy.metoda_id;

CREATE SEQUENCE ksiegarnia.wydawca_wydawca_id_seq;

CREATE TABLE ksiegarnia.wydawca (
                wydawca_id INTEGER NOT NULL DEFAULT nextval('ksiegarnia.wydawca_wydawca_id_seq'),
                nazwa VARCHAR NOT NULL,
                telefon VARCHAR NOT NULL,
                strona_www VARCHAR,
                CONSTRAINT wydawca_id PRIMARY KEY (wydawca_id)
);


ALTER SEQUENCE ksiegarnia.wydawca_wydawca_id_seq OWNED BY ksiegarnia.wydawca.wydawca_id;

CREATE SEQUENCE ksiegarnia.klient_klient_id_seq;

CREATE TABLE ksiegarnia.klient (
                klient_id INTEGER NOT NULL DEFAULT nextval('ksiegarnia.klient_klient_id_seq'),
                adres_id INTEGER NOT NULL,
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                telefon VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                haslo VARCHAR NOT NULL,
                CONSTRAINT klient_id PRIMARY KEY (klient_id)
);


ALTER SEQUENCE ksiegarnia.klient_klient_id_seq OWNED BY ksiegarnia.klient.klient_id;

CREATE UNIQUE INDEX klient_idx
 ON ksiegarnia.klient
 ( email );

CREATE SEQUENCE ksiegarnia.autor_autor_id_seq;

CREATE TABLE ksiegarnia.autor (
                autor_id INTEGER NOT NULL DEFAULT nextval('ksiegarnia.autor_autor_id_seq'),
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                data_urodzenia DATE NOT NULL,
                miejsce_urodzenia VARCHAR NOT NULL,
                opis VARCHAR,
                CONSTRAINT autor_id PRIMARY KEY (autor_id)
);


ALTER SEQUENCE ksiegarnia.autor_autor_id_seq OWNED BY ksiegarnia.autor.autor_id;

CREATE SEQUENCE ksiegarnia.ksiazka_ksiazka_id_seq;

CREATE TABLE ksiegarnia.ksiazka (
                ksiazka_id INTEGER NOT NULL DEFAULT nextval('ksiegarnia.ksiazka_ksiazka_id_seq'),
                wydawca_id INTEGER NOT NULL,
                tytul VARCHAR NOT NULL,
                isbn VARCHAR NOT NULL,
                gatunek VARCHAR NOT NULL,
                liczba_stron INTEGER NOT NULL,
                data_wydania DATE NOT NULL,
                cena REAL NOT NULL,
                opis VARCHAR,
                CONSTRAINT ksiazka_id PRIMARY KEY (ksiazka_id, wydawca_id)
);


ALTER SEQUENCE ksiegarnia.ksiazka_ksiazka_id_seq OWNED BY ksiegarnia.ksiazka.ksiazka_id;

CREATE UNIQUE INDEX ksiazka_idx
 ON ksiegarnia.ksiazka
 ( isbn );

CREATE SEQUENCE ksiegarnia.zamowienie_zamowienie_id_seq;

CREATE TABLE ksiegarnia.zamowienie (
                zamowienie_id INTEGER NOT NULL DEFAULT nextval('ksiegarnia.zamowienie_zamowienie_id_seq'),
                adres_id INTEGER NOT NULL,
                metoda_id INTEGER NOT NULL,
                ksiazka_id INTEGER NOT NULL,
                klient_id INTEGER NOT NULL,
                wydawca_id INTEGER NOT NULL,
                ilosc INTEGER NOT NULL,
                data_zamowienia DATE NOT NULL,
                status VARCHAR NOT NULL,
                data_wyslania DATE,
                CONSTRAINT zamowienie_id PRIMARY KEY (zamowienie_id, adres_id, metoda_id, ksiazka_id, klient_id, wydawca_id)
);


ALTER SEQUENCE ksiegarnia.zamowienie_zamowienie_id_seq OWNED BY ksiegarnia.zamowienie.zamowienie_id;

CREATE TABLE ksiegarnia.magazyn_ksiazka (
                ksiazka_id INTEGER NOT NULL,
                wydawca_id INTEGER NOT NULL,
                magazyn_id INTEGER NOT NULL,
                adres_id INTEGER NOT NULL,
                ilosc INTEGER NOT NULL,
                CONSTRAINT magazyn_ksiazka_pk PRIMARY KEY (ksiazka_id, wydawca_id, magazyn_id, adres_id)
);


CREATE TABLE ksiegarnia.ocena (
                ksiazka_id INTEGER NOT NULL,
                wydawca_id INTEGER NOT NULL,
                klient_id INTEGER NOT NULL,
                ocena REAL NOT NULL,
                komentarz VARCHAR,
                CONSTRAINT ocena_id PRIMARY KEY (ksiazka_id, wydawca_id, klient_id)
);


CREATE TABLE ksiegarnia.autor_ksiazka (
                autor_id INTEGER NOT NULL,
                ksiazka_id INTEGER NOT NULL,
                wydawca_id INTEGER NOT NULL,
                CONSTRAINT autor_ksiazka_pk PRIMARY KEY (autor_id, ksiazka_id, wydawca_id)
);


ALTER TABLE ksiegarnia.magazyn ADD CONSTRAINT kierownik_magazyn_fk
FOREIGN KEY (kierownik_id)
REFERENCES ksiegarnia.kierownik (kierownik_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.magazyn ADD CONSTRAINT adres_magazyn_fk
FOREIGN KEY (adres_id)
REFERENCES ksiegarnia.adres (adres_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.zamowienie ADD CONSTRAINT adres_zamowienie_fk
FOREIGN KEY (adres_id)
REFERENCES ksiegarnia.adres (adres_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.klient ADD CONSTRAINT adres_klient_fk
FOREIGN KEY (adres_id)
REFERENCES ksiegarnia.adres (adres_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.magazyn_ksiazka ADD CONSTRAINT magazyn_magazyn_ksiazka_fk
FOREIGN KEY (magazyn_id, adres_id)
REFERENCES ksiegarnia.magazyn (magazyn_id, adres_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.zamowienie ADD CONSTRAINT metoda_dostawy_zamowienie_fk
FOREIGN KEY (metoda_id)
REFERENCES ksiegarnia.metoda_dostawy (metoda_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.ksiazka ADD CONSTRAINT wydawca_ksiazka_fk
FOREIGN KEY (wydawca_id)
REFERENCES ksiegarnia.wydawca (wydawca_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.zamowienie ADD CONSTRAINT klient_zamowienie_fk
FOREIGN KEY (klient_id)
REFERENCES ksiegarnia.klient (klient_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.ocena ADD CONSTRAINT klient_ocena_fk
FOREIGN KEY (klient_id)
REFERENCES ksiegarnia.klient (klient_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.autor_ksiazka ADD CONSTRAINT autor_autor_ksiazka_fk
FOREIGN KEY (autor_id)
REFERENCES ksiegarnia.autor (autor_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.autor_ksiazka ADD CONSTRAINT ksiazka_autor_ksiazka_fk
FOREIGN KEY (ksiazka_id, wydawca_id)
REFERENCES ksiegarnia.ksiazka (ksiazka_id, wydawca_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.ocena ADD CONSTRAINT ksiazka_ocena_fk
FOREIGN KEY (ksiazka_id, wydawca_id)
REFERENCES ksiegarnia.ksiazka (ksiazka_id, wydawca_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.magazyn_ksiazka ADD CONSTRAINT ksiazka_magazyn_ksiazka_fk
FOREIGN KEY (ksiazka_id, wydawca_id)
REFERENCES ksiegarnia.ksiazka (ksiazka_id, wydawca_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ksiegarnia.zamowienie ADD CONSTRAINT ksiazka_zamowienie_fk
FOREIGN KEY (ksiazka_id, wydawca_id)
REFERENCES ksiegarnia.ksiazka (ksiazka_id, wydawca_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;
