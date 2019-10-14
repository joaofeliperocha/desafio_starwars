const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Planeta")
//chamando o swapi
//const aparicoes = require("../controllers/controller")
const Planeta = mongoose.model("planetas")

//Swapi
const swapi = require('swapi-node')
const fetch = require('node-fetch');

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

    //Número de aparições em filmes
    
    //swapi.get('https://swapi.co/api/planets/?search=' + req.body.nome).then((result) => {
       // a(result.results[0].films.length)
   // })
    const a = (param)=> {
        console.log(param + " aparições em filmes")
    }
    
    if(erros.length > 0){
        res.render("admin/addplanetas", {erros: erros})
    }else{
        const novoPlaneta = {
            nome: req.body.nome,
            clima: req.body.clima,
            terreno: req.body.terreno,
            aparicoes: req.body.aparicoes
        }

        new Planeta(novoPlaneta).save().then(() => {
            req.flash("success_msg", "Planeta " + req.body.nome + " adicionado com sucesso!")
            //Redireciona para alguma página
            res.redirect("/admin/")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao adicionar o planeta, tente novamente!")
            //console.log("Erro ao salvar planeta!")
            res.redirect("/admin/")
        }) 
    }
})

router.get('/planetas/aparicoes/', (req, res) => {
    res.render("admin/aparicoes")
})

router.post("/planetas/delete", (req, res) => {
    Planeta.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Planeta excluído com sucesso")
        res.redirect("/admin/planetas")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao excluir o planeta")
        res.redirect("/admin/planetas")
    })
})

//busca por id

module.exports = router