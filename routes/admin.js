const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Planeta")
const Planeta = mongoose.model("planetas")

//Swapi
const swapi = require('swapi-node')

router.get('/', (req, res) => {
    res.render('admin/index')
})
//Listar planetas
router.get('/planetas', (req, res) => {
    
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
//Adicionar planeta
router.post("/planetas/novo", (req, res) => {
    //Verificando se existe algum campo vazio
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
    //Número de aparições em filmes - só aparece no terminal  
    swapi.get('https://swapi.co/api/planets/?search=' + req.body.nome).then((result) => {
       a(result.results[0].films.length)
    })
    const a = (param)=> {
        console.log("O planeta " + req.body.nome + " aparece em " + param + " filme(s)")
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
            res.redirect("/")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao adicionar o planeta, tente novamente!")
            res.redirect("/")
        }) 
    }
})
//Remover planeta
router.post("/planetas/delete", (req, res) => {
    Planeta.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Planeta excluído com sucesso")
        res.redirect("/admin/planetas")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao excluir o planeta")
        res.redirect("/admin/planetas")
    })
})
module.exports = router