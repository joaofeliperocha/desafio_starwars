const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Planeta")
const Planeta = mongoose.model("planetas")

router.get('/', (req, res) => {
    //res.send("Página principal")
    res.render('admin/index')
})

router.get('/planetas', (req, res) => {
    res.render("admin/planetas")
})
router.get('/planetas/add', (req, res) => {
    res.render("admin/addplanetas")
})
router.post("/planetas/novo", (req, res) => {
    const novoPlaneta = {
        nome: req.body.nome,
        clima: req.body.clima,
        terreno: req.body.terreno
    }

    new Planeta(novoPlaneta).save().then(() => {
        console.log("Planeta adicionado com sucesso!")
    }).catch((err) => {
        console.log("Erro ao salvar planeta!")
    })
})

module.exports = router