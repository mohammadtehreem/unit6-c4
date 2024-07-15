const express = require("express");
require("dotenv").config();
const db = require("../config/db");
const sqlConnect = require("../config/sql");
const app = express();
const userRoute = require("../routes/userRoute");
const orderRoute = require("../routes/orderRoute");
const auth = require("../middleware/auth");
const bookRoutes = require("../routes/bookRoutes");
const cors = require("cors");
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/users", userRoute);
app.use("/orders", auth, orderRoute);
app.use("/books", auth, bookRoutes);
app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.listen(port, async () => {
  await db;
  await sqlConnect;
  console.log("Server is live on http://localhost:" + port);
});
