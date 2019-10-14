//Arquivo principal
//A API Swapi já está instalada
//Também está instalado o axios - https://www.npmjs.com/package/axios
//Carregando módulos    
    const express = require('express')
    const handlebars  = require('express-handlebars')
    const  bodyParser = require('body-parser')
    const mongoose = require('mongoose')

    const swapi = require('swapi-node')
    const axios = require('axios')

    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')

    //Ferramentas para ajudar na validação
    const session = require("express-session")
    const flash = require("connect-flash")

    require("./models/Planeta")
    const Planeta = mongoose.model("planetas")
    const controller = require("./controllers/controller")

//Configurações

    //Sessão
        app.use(session({
            secret: "joao",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })

    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

    //Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://localhost:27017/starwars', { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }).then(() => {
            console.log("Conectado ao MongoDB")
        }).catch((error) => {
            console.log("Erro ao se conectar: " + error)})
    
    //Public
        app.use(express.static(path.join(__dirname,'public')))

        //Middlewares 
        /*app.use((req, res, next) => {
            console.log("Teste Middlewares ")
            next()
        })*/
    
            
    //const swapi = require('swapi-node');

    /*swapi.getPerson(2).then((result) => {
        console.log(result.name)
        //console.log(result);
    })*/
    
    //Swapi    
        //Ulisses
        /*const teste = async(req, res) => {
        const paapp = await axios.get('https://swapi.co/api/planets/2')
        const result = paapp.data
        return res.json(result)
    }
        teste()*/
        //https://swapi.co/api/people/?search=r2  


      
//Rotas
//Rota Home
    app.get('/', (req, res) => {
        res.render("index")
    })
    app.get('/teste', controller.adicionarNoBanco)
    //Teste - Busca pelo o nome
    
    /*app.get('/', (req, res) => {
        Planeta.find().populate("planeta").then((planetas) => {
            res.render("index", {planetas: planetas})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
        })
    })

    app.get("/planets/busca/:nome", (req, res) => {
        Planeta.findOne({nome: req.params.nome}).then((planeta) => {
            if(planeta){
                    res.render("planets/index", {planeta: planeta})
               
            }else{
                req.flash("error_msg", "Este planeta não existe")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })  
    })*/

    //Criando a rota para fazer a busca por nome
    /*app.get("/planetas/:nome", (req, res) => {
        Planeta.findOne({nome: req.params.nome}).then((planeta) => {
            if(planeta){

                Planeta.find({planeta: planeta._id}).then((planetas) => {
                    res.render("planetas/busca", {planetas: planetas})

                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao listar os planetas")
                    res.redirect("/")
                })
                //res.render("planet/index", {planeta: planeta})
            }else{
                req.flash("error_msg", "Este planeta não existe")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })       
    })*/

    app.use('/admin', admin)
//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando! ")
})
