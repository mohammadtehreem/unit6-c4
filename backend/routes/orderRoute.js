const { Router } = require("express");
const sqlConnect = require("../config/sql");
const sendEmail = require("../services/email");

const orderRoute = Router();
orderRoute.get("/:id", async (req, res) => {
  try {
    sqlConnect.query(
      `SELECT * FROM users WHERE id = ?`,
      [req.params.id],
      (err, result) => {
        res.json(result);
      }
    );

    // res.send("this is order page");
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

orderRoute.post("/", (req, res) => {
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  try {
    sqlConnect.query(`INSERT INTO orders SET ?`, { ...req.body }, (err) => {
      if (err) throw err;
      else {
        res.sendStatus(201);
      }
    });
    sendEmail(
      userEmail,
      "Order Placed!",
      "<b>Your order has been placed successfully!</b>"
    );
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = orderRoute;
