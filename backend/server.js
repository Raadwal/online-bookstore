const config = require("./config");
const express = require("express");
const cors = require("cors");
const { types, Pool, Client } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const server = app.listen(config.host.port, config.host.hostname, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);
});

const pool = new Pool({
  host: config.database.dbHost,
  port: config.database.dbPort,
  user: config.database.dbUser,
  password: config.database.dbPass,
  database: config.database.dbName,
});

app.use("/book", require("./routes/book")(pool));
app.use("/author-book", require("./routes/author-book")(pool));
app.use("/author", require("./routes/author")(pool));
app.use("/warehouse-book", require("./routes/warehouse-book")(pool));
app.use("/warehouse", require("./routes/warehouse")(pool));
app.use("/manager", require("./routes/manager")(pool));
app.use("/publisher", require("./routes/publisher")(pool));
app.use("/order", require("./routes/order")(pool));
app.use("/delivery-method", require("./routes/delivery-method")(pool));
app.use("/score", require("./routes/score")(pool));
app.use("/client", require("./routes/client")(pool));
app.use("/address", require("./routes/address")(pool));

app.use("/examples", require("./routes/examples")(pool));
app.use("/views", require("./routes/views")(pool));
app.use("/advanced-forms", require("./routes/advanced-forms")(pool));
