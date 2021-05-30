const express = require("express");
const mongoose = require("mongoose");
const Remind = require("./routes/remind");
const Auth = require("./routes/auth");

const User = require("./routes/user");

const app = express();

app.use(express.json());
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/remind/", Remind);

const port = process.env.PORT || 3003;
app.listen(port, () => console.log("Conexión activa en el puerto " + port));

mongoose
  .connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Conexión con mongoDB en estado ON"))
  .catch((err) => console.log("Error en la conexión con mongo DB" + err));
