


module.exports = function(app){
	var listaProdutos = function(req,res){
		
		var connection = app.infra.connectionFactory();

		//A palavra reservada new cria um novo contexto local
		//Isso evita que o express-load bagunce o o escopo do this dentro de produtoBanco
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, result){
			// Content Negotiation :Cliente informa o que deseja receber
    		// comuns: text/html, application/json
			// Manda cada resposta de acordo com o que o cliente solicitou
			res.format({
				html: function(){
					res.render('produtos/lista',{lista:result});
				},
				json: function(){
					res.json(result);
				}
			});
		});

		connection.end();
	};

	

	app.get('/produtos',listaProdutos);


	app.get('/produtos/form',function(req,res){
		res.render('produtos/form');
	});

	app.post('/produtos', function(req,res){
		//express com o body-parser fornece o conteudo que foi enviado pelo formulario em um json
		var produto = req.body;
		
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.salva(produto, function(erros, resultado){
			res.redirect('/produtos');
		});
	});

	
}