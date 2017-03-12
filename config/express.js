var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');



module.exports = function(){
	var app = express();
	//definir variaveis dentro do express
	//passando para para o express a engine (EJS)
	app.set('view engine','ejs');

	//ensina ao express onde estão as views
	//Busca o diretório a partir do arquivo app.js (local de onde se está subindo o servidor express)
	app.set('views','./app/views');

	// a função use() informa pro express para utilizar um middleware
	// ou seja, algo que vai executar quando um request chegar e antes de alguma função do nosso
	// sistema tratar essa requisição
	// o body-parser irá esperar uma requisição no formato urlencoded e irá transformar em um objeto json	
	// extended é um parametro que informa para o body-parser tentar transformar objetos json complexos (objetos dentro de objetos)
	app.use(bodyParser.urlencoded({extended:true}));

	//express-load carrega as rotas automaticamente (passando a pasta 'routes' para ele)
	load('routes',{cwd:'app'})
		// express-load carrega os módulos que estão na pasta infra (até agora, a connectionFactory)
		.then('infra')
		// Joga todos os módulos carregados na aplicação
		.into(app);

	return app;
}