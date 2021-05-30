const mongoose = require("mongoose");

const remindSchema = new mongoose.Schema({
    idUser: String,
    nameTask: String,
    startDate: {type: Date, default: Date.now},
    description: String,
    status: String
});

const Remind = mongoose.model("remind", remindSchema);
module.exports = Remind;