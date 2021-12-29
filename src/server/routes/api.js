const express = require("express");
const router = express.Router();

const db = require("../db/usersDb");
const appController = require("../controllers/controller");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// api/customers  --- USERS
router.get("/users", appController.getAllUsers, (req, res) => {
  //it is coming from Database
  res.json(res.locals.users);
});

// api/login  --- LOGIN
router.post("/login", appController.checkUserLogin, (req, res) => {
  if (res.locals.error) {
    res.json(res.locals.error);
  } else {
    res.status(200).json(res.locals.token);
  }
});

// api/insert  --- SIGN UP
router.post("/insert", appController.checkUserSignUp, (req, res) => {
  if (res.locals.error) {
    res.json(res.locals.error);
  } else {
    const { fullname, username, email, password } = res.locals.users;

    bcrypt.hash(password, saltRounds, (err, hashed) => {
      if (err) console.log(err);

      const sqlInsert =
        "INSERT INTO users (fullname,username,email,password) VALUES(?,?,?,?)";

      db.query(
        sqlInsert,
        [fullname, username, email, hashed],
        (err, result) => {
          console.log(result);
        }
      );
    });
  }
});

//api/favorites -- Create Favorite locations/menuItems

router.post("/favorites", async (req, res) => {
  const { username, location, menuItem, userFullName } = req.body.postDetails;

  console.log(req.body);

  const q =
    "INSERT INTO Favorites (username,location,menuItem,userFullName) VALUES(?,?,?,?)";

  console.log(username, location, menuItem, userFullName);

  await db.query(
    q,
    [username, location, menuItem, userFullName],
    (err, result) => {
      if (err) console.log("ERROR");
      res.json(result);
    }
  );
});

//api/favorites -- Get All Favorite locations/menuItems

router.get("/favorites", async (req, res) => {
  await db.query("SELECT * from Favorites", (err, result) => {
    if (err) console.log("ERROR");
    res.json(result);
  });
});

//api/post/:id    Getting info BY ID

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM Favorites WHERE  idFavorites = ?";

  await db.query(q, [id], (err, result) => {
    if (err) console.log("ERROR in favoritesID from DB");
    res.json(result[0]);
  });
});

router.get("/comments/:id", async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM Comments WHERE  idFavorites = ?";

  await db.query(q, [id], (err, result) => {
    if (err) console.log("ERROR in favoritesID from DB");
    res.json(result);
  });
});

router.post("/comments", appController.validateToken, async (req, res) => {
  const { commentId, comment } = req.body;
  const q = "INSERT INTO Comments (username,comment,idFavorites) VALUES(?,?,?)";

  const { username } = res.locals.user;

  await db.query(q, [username, comment, commentId], (err, result) => {
    if (err) console.log("ERROR in favoritesID from DB");
    res.json({ ...req.body, ...res.locals.user });
  });
});

module.exports = router;
