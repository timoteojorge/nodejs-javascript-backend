var express = require('../config/express')();
//Passamos o express como parametro e o Supertest se integra com o express
// Dessa forma não precisamos subir o servidor nem passar o endereço completo para o teste
//passamos apenas a rota e o supertest resolve usando o express
var request = require('supertest')(express);
describe('#ProdutosController', function(){

    beforeEach(function(done){
        //Pesquisar pela biblioteca node-database-cleaner (evita deletes na mão como abaixo)
        var conn = express.infra.connectionFactory();
        conn.query('delete from produtos;', function(ex, result){
            
            if(!ex){
                done();
            }
        });
    });

    it('#listagem json', function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-type',/json/) 
        .expect(200,done);
    });

    it('#Cadastro de novo produto com dados inválidos', function(done){
        request.post('/produtos')
        .send({titulo:'',descricao:'novo livro'})
        .expect(400,done);
    });

    it('#Cadastro de novo produto com dados válidos', function(done){
        request.post('/produtos')
        .send({titulo:'Titulo',descricao:'novo livro',preco:20.50})
        .expect(302,done);
    });
});
