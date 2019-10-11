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
    //Listar planetas
    Planeta.find().then((planetas) => {
        res.render("admin/planetas", {planetas: planetas})
    }).catch((err) => {
        req.flash("erro_msg", "Houve um erro ao listar os planetas")
        res.render("/admin")
    })
})
router.get('/planetas/add', (req, res) => {
    res.render("admin/addplanetas")
})
router.post("/planetas/novo", (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.clima || typeof req.body.clima == undefined || req.body.clima == null){
        erros.push({texto: "Clima inválido"})
    }

    if(!req.body.terreno || typeof req.body.terreno == undefined || req.body.terreno == null){
        erros.push({texto: "Terreno inválido"})
    }

    if(erros.length > 0){
        res.render("admin/addplanetas", {erros: erros})
    }else{
        const novoPlaneta = {
            nome: req.body.nome,
            clima: req.body.clima,
            terreno: req.body.terreno
        }   
        new Planeta(novoPlaneta).save().then(() => {
            req.flash("success_msg", "Planeta adicionado com sucesso!")
            //Redireciona para alguma página
            res.redirect("/admin/")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao adicionar o planeta, tente novamente!")
            //console.log("Erro ao salvar planeta!")
            res.redirect("/admin/")
        })      
    }
})

module.exports = router