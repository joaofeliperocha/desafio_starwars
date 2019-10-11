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
const a = (param)=> {
    console.log(param)
}
swapi.get('https://swapi.co/api/people/?page=2').then((result) => {
    a(result.results[0].name)
})