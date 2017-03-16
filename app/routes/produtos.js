


module.exports = function(app){
	var listaProdutos = function(req,res,next){
		
		var connection = app.infra.connectionFactory();

		//A palavra reservada new cria um novo contexto local
		//Isso evita que o express-load bagunce o o escopo do this dentro de produtoBanco
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, result){

			if(err){
				//Diz para o express tratar o erro
				return next(err);
			}

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
		res.render('produtos/form',{errosValidacao:{}, produto:{}});
	});

	app.post('/produtos', function(req,res){
		//express com o body-parser fornece o conteudo que foi enviado pelo formulario em um json
		var produto = req.body;

		req.assert('titulo','Titulo é obrigatório').notEmpty();
		req.assert('preco','Preço é obrigatório').isFloat();
		var erros = req.validationErrors();

		if(erros){
			res.format({
				html: function(){
					res.status(400).render('produtos/form',{errosValidacao:erros,produto:produto});
				},
				json: function(){
					res.status(400).json(erros);
				}
			});
			
			return;
		}
		
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.salva(produto, function(erros, resultado){
			res.redirect('/produtos');
		});
	});

	
}