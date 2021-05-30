const express = require("express");
const router = express.Router();
const Remind = require("../models/remind");
const User = require("../models/user");
const Auth = require("../middleware/auth");

router.post("/registerReminder", Auth, async (req, res) => {
  verificateUser(req, res);
  if (!req.body) {
    return res.status(400).send("No hay datos para guardar");
  } else {
    if (!req.body.nameTask)
      return res.status(400).send("No se ingresó un nombre de tarea");
    if (!req.body.description)
      return res.status(400).send("No se ingresó una descripción");
  }
  const remind = new Remind({
    idUser: req.user._id,
    nameTask: req.body.nameTask,
    description: req.body.description,
    status: "to-do",
  });
  const result = await remind.save();
  if (!result)
    return res.status(400).send("No fue posible registrar el recordatorio");
  return res.status(200).send({ result });
});

router.get("/listReminder", Auth, async (req, res) => {
  verificateUser(req, res);
  const remind = await Remind.find({ idUser: req.user._id });
  if (!remind) return res.status(400).send("No hay datos para mostrar");
  res.status(200).send({ remind });
});

router.put("/updateReminder", Auth, async (req, res) => {
  verificateUser(req, res);
  const data = req.body;
  if (!req.body) {
    return res.status(400).send("No hay datos para guardar");
  } else {
    if (!req.body._id)
      return res.status(400).send("No se ha ingresado un Id de recordatorio");
    if (!req.body.nameTask)
      return res.status(400).send("No se ingresó un nombre de tarea");
    if (!req.body.description)
      return res.status(400).send("No se ingresó una descripción");
    if (!req.body.status)
      return res.status(400).send("No se ingresó un status");
  }
  const remind = await Remind.findByIdAndUpdate(req.body._id, {
    idUser: req.user._id,
    nameTask: req.body.nameTask,
    description: req.body.description,
    status: req.body.status,
  });
  if (!remind) return res.status(400).send("No se pudo editar el recordatorio");
  return res.status(200).send({ remind });
});

router.delete("/:_id", Auth, async (req, res) => {
  verificateUser(req, res);
  const remind = await Remind.findByIdAndDelete(req.params._id);
  if (!remind) return res.status(400).send("No se pudo borrar el recordatorio");
  return res.status(200).send("Recordatorio eliminado");
});

const verificateUser = (req, res) => {
  const user = User.findById(req.user._id);
  if (!user) return res.status(400).send("Usuario no existe");
};

module.exports = router;
