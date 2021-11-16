const router = require("express").Router();
const authController = require("../controllers/auth");
const validationMiddleware = require("../middleware/validationMiddleware");
const { check } = require("express-validator");

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .normalizeEmail()
      .escape()
      .withMessage("E-mail peab olema korrektselt vormistatud!"),
    check("password")
      .isLength({ min: 8 })
      .escape()
      .withMessage("Parool peab olema vähemalt 8 tähemärki pikk!"),
  ],
  validationMiddleware,
  authController.login
);

router.post(
  "/signup",
  [
    check("firstName")
      .isLength({ min: 3 })
      .withMessage("Eesnimi peab olema vähemalt 3 tähemärki pikk!")
      .trim()
      .exists()
      .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
      .escape()
      .withMessage("Eesnimi peab sisaldama ainult tähti!"),
    check("lastName")
      .isLength({ min: 3 })
      .withMessage("Perenimi peab olema vähemalt 3 tähemärki pikk!")
      .trim()
      .exists()
      .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
      .escape()
      .withMessage("Perenimi peab sisaldama ainult tähti!"),
    check("email")
      .isEmail()
      .normalizeEmail()
      .escape()
      .withMessage("E-mail peab olema korrektselt vormistatud!"),
    check("password")
      .isStrongPassword()
      .escape()
      .withMessage("Parool peab olema vähemalt 8 tähemärki pikk, sisaldama vähemalt ühte suurt ja ühte väikest tähte ning vähemalt ühte sümbolit!"),
  ],
  validationMiddleware,
  authController.signup
);

module.exports = router;
