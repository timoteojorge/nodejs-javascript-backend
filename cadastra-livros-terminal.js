var http = require('http');

var configuracoes = {
    hostname:'localhost',
    port: 3000,
    method: 'post',
    path: '/produtos',
    // Content Negotiation :Cliente informa o que deseja receber
    // comuns: text/html, application/json
    headers: {
        'Accept': 'application/json',
        // Cliente informa o que está enviando no request
        'Content-type':'application/json'
    }
};

var client = http.request(configuracoes,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log('Corpo'+body);   
    })
});

var produto = {
    titulo: '',
    descricao: 'node, javascript e um pouco sobre http',
    preco: 100
};


//invoca o request
//Cadastra o produto no banco
client.end(JSON.stringify(produto));