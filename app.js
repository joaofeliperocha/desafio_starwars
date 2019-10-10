//Arquivo principal
//A API Swapi já está instalada
//Carregando módulos    
    const express = require('express')
    const handlebars  = require('express-handlebars')
    const  bodyParser = require('body-parser')
    //const mongoose = require('mongoose')
    const swapi = require('swapi-node')

    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')

//Configurações
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

    //Public
        app.use(express.static(path.join(__dirname,'public')))

//Rotas
    app.use('/admin', admin)
//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando! ")
})
