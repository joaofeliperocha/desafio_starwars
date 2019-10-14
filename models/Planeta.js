const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Planeta = new Schema({
    nome: {
        type: String,
        required: true
    },
    clima: {
        type: String,
        required: true
    },
    terreno: {
        type: String,
        required: true
    },
    aparicoes: {
        type: String
    }
})
mongoose.model("planetas", Planeta)