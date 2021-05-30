const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

/**
 * Login module
 */
router.post("/login", async (req, res) =>{
    const user = User.findOne({ user: req.body.user});
    if (!user) return res.status(400).send("Usuario o contraseña incorrecto");
    const pass = bcrypt.compare(req.body.password, user.password);
    if (!pass) return res.status(400).send("Usuario o contraseña incorrecto");
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
});

module.exports = router;