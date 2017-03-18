module.exports = function(app){
    app.get("/promocoes/form",function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(erros,resultados){
            res.render('promocoes/form',{lista:resultados});
        });
        connection.end();
    });

    app.post('/promocoes',function(req,res){
       
        var promocao = req.body;
        //socket.io - envia um evento para o cliente capturar
         console.log('emitindo');
        app.get('io').emit('novaPromocao',promocao);
        console.log('emitiu');
        res.redirect('promocoes/form');
    });
}