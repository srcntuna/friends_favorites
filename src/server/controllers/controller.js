const db = require("../db/usersDb");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { sign, verify } = require("jsonwebtoken");
const appController = {};

appController.getAllUsers = async (req, res, next) => {
  await db.query("SELECT * from users", (err, data) => {
    if (err) throw "Error in db query";

    res.locals.users = data;
    next();
  });
};

appController.checkUserSignUp = async (req, res, next) => {
  const { fullname, username, email, password, passwordConfirm } =
    req.body.signupDetails;

  if (password !== passwordConfirm) {
    res.locals.error = {
      message: "The password and confirmation password do not match.",
    };
    return next();
  }

  const q = "SELECT * FROM users WHERE username = ? OR email = ?";
  await db.query(q, [username, email], (err, data) => {
    if (err) {
      res.send({ HEYY: "iam error", err: err });
    }
    if (data.length > 0) {
      res.locals.error = { message: "Username or email are already in use" };
      next();
    } else {
      res.locals.users = req.body.signupDetails;
      next();
    }
  });
};

appController.checkUserLogin = async (req, res, next) => {
  const { username, password } = req.body.loginDetails;

  const q = "SELECT * FROM users WHERE username = ?";

  await db.query(q, [username], (err, data) => {
    if (err) {
      res.send({ HEYY: "iam error", err: err });
    }
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, result) => {
        if (result === false) {
          res.locals.error = { message: "Incorrect username or password" };
          return next();
        } else {
          const accessToken = sign(
            { username: data[0].username, id: data[0].id },
            "roptesambir"
          );
          res.locals.token = accessToken;
          next();
        }
      });
    } else {
      res.locals.error = { message: "User doesn't exist!" };
      next();
    }
  });
};

appController.validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in" });

  try {
    const validToken = verify(accessToken, "roptesambir");
    if (validToken) {
      res.locals.user = validToken;
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = appController;
