const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

/**
 * Login module
 */
router.post("/login", async (req, res) =>{
    const user = await User.findOne({ user: req.body.user });
    if (!user) return res.status(400).send("User o password incorrectos");
    const hash = await bcrypt.compare(req.body.password, user.password);
    if (!hash) return res.status(400).send("User o password incorrectos");
    const jwtToken = user.generateJWT();
    return res.status(200).send({jwtToken});
});

module.exports = router;