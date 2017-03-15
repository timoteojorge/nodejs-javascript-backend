var http = require('http');
var assert = require('assert'); //biblioteca do mocha
describe('#ProdutosController', function(){
    it('#listagem json', function(done){
        var configuracoes = {
            hostname:'localhost',
            port: 3000,
            path: '/produtos',
            //Content Negotiation :Cliente informa o que deseja receber
            // comuns: text/html, application/json
            headers: {
                'Accept': 'application/json'
            }
        };

        http.get(configuracoes, function(res){
            assert.equal(res.statusCode,200);
            assert.equal(res.headers['content-type'],'application/json; charset=utf-8');
            
            // é necessário informar ao mocha qdo a função de finalização deve ser invocada
            // Se uma função não for passada o mocha vai terminar a execução do teste sem esperar pelos recursos assincronos do http
            done();
        });
        console.log("Teste de verificação de listagem json");
    });
});