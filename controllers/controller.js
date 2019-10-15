
const mongoose = require('mongoose')

const Planeta = mongoose.model("planetas")
/*var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var req = new XMLHttpRequest();
var j = 5
var URLhost = 'https://swapi.co/api/planets/' + j


    req.open('GET', URLhost, true);
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            var p = response.name
            
    } else {
        console.log('Erro na solicitação de rede: ' + req.statusText);
    }});

req.send(null);

/*pegue os dados do formulario e mostrar o total de aparições ali dentro do if mesmo */
const swapi = require('swapi-node')
//Parada q o Leo fez e deu certo
/*
const a = (param)=> {
    console.log(param)
}

swapi.get('https://swapi.co/api/people/?page=2').then((result) => {
    a(result)
})*/

/*swapi.get('https://swapi.co/api/people/?page=2').then((result) => {
    console.log(result);
});*/


//AQUI ele consegue printar o numero de aparições certinho
/*const a = (param)=> {
    //return param
    console.log(param)
}

nome = "Coruscant"

swapi.get('https://swapi.co/api/planets/?search=' + nome).then((result) => {
    a(result.results[0].films.length)
})
*/
/*
nome = "Coruscant"

var url = 'https://swapi.co/api/planets/?search=' + nome

const a = (param)=> {
    //return param
    console.log(param)
}

swapi.get(url).then((result) => {
    a(result.results[0].films.length)
})*/

//Codigo daquele site

const fetch = require('node-fetch');
/*
async function getPerson(id) {
  const response = await fetch(`http://swapi.co/api/people/${id}`);
  const person = await response.json();
  return person;
}
//getPerson(1).then(person => console.log(person.name));
getPerson(1).then(person => {
    var a = person.name
    console.log(a)
});*/


//const fetch = require('node-fetch');
//getPerson(1).then(person => console.log(person.name));

/*
async function getPlanet() {
  const name = "Coruscant"
  const response = await fetch('https://swapi.co/api/planets/?search=' + name)
  const planet = await response.json()
  return planet
}

getPlanet().then(planet => {
    var a = planet.results[0].films.length
    console.log(a)
})*/

//Mais atualizado
/*
module.exports = { 
    async adicionarNoBanco (req, res){
    const {meuID} = req.params
    const doAPI = await swapi.get(`https://swapi.co/api/planets/${meuID}`)
    console.log(doAPI.data)

    /*Planeta.create({
        nome: doAPI.data.name,
        clima: doAPI.data.climate,
        terreno: doAPI.data.terrain,
        aparicoes: doAPI.data.films.length() 
    })
    return res.json(doAPI)
    }
}*/
