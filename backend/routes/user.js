const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

/**
 * Register user module
 */
router.post("/registerUser", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("No hay datos para registrar");
  } else {
    if (!req.body.name) return res.status(400).send("Nombre no ingresado");
    if (!req.body.lastname) return res.status(400).send("Apellido no ingresado");
    if (!req.body.email) return res.status(400).send("Correo no ingresado");
    if (!req.body.user) return res.status(400).send("Usuario no ingresado");
    if (!req.body.password) return res.status(400).send("Contraseña no ingresado");
  } // Content validation
  let user = await User.findOne({ user: req.body.user });
  if (user) return res.status(400).send("Usuario ya registrado");
  user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Correo electronico ya registrado");
  const pass = await bcrypt.hash(req.body.password, 10);
  user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    user: req.body.user,
    password: pass,
  });
  const result = await user.save();
  if (result) {
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    res.status(400).send("No se pudo registrar el usuario");
  }
});
module.exports = router;
