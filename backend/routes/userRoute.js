const { Router } = require("express");
const sqlConnect = require("../config/sql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoutes = Router();
const secret_key = process.env.SECRET_KEY;
require("dotenv").config();
userRoutes.get("/", (req, res) => {
  res.send("this is users page");
});

userRoutes.post("/signup", async (req, res) => {
  bcrypt.hash(req.body.password, 8, (err, hash) => {
    if (err) console.log(err);
    sqlConnect.query(
      `SELECT * FROM users WHERE email = ? or username = ?`,
      [req.body.email, req.body.username],
      (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
          req.body.password = hash;
          sqlConnect.query(
            `INSERT INTO users SET ?`,
            { ...req.body, role: "user" },
            (err) => {
              if (err) throw err;
              else {
                res.sendStatus(201);
              }
            }
          );
        } else {
          res.status(500).send("User already exits");
        }
      }
    );
  });
});

userRoutes.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  sqlConnect.query(
    `SELECT * FROM users WHERE email = ? or username = ?`,
    [email, username],
    (err, result) => {
      if (err) throw err;
      // console.log(result);
      if (result.length == 0) {
        res.status(400).send("User not found");
      } else {
        bcrypt.compare(password, result[0].password, (err, compare) => {
          if (err) {
            console.log("bcrypt err", err);
            res.status(500);
          } else {
            if (compare) {
              const token = jwt.sign(
                { username, email, role: result[0].role },
                secret_key
              );
              res.status(200).json({ accessToken: token });
              localStorage.setItem("userEmail", JSON.stringify(email));
            } else res.send("Wrong Password");
          }
        });
      }
    }
  );
});

module.exports = userRoutes;
