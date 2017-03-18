var app = require('./config/express.js')();

//é necessário pegar o handler do próprio nodejs para passar ao socket.io
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//disponibiliza através do express o socketio para toda a aplicação
app.set('io',io);

app.listen(3000,function(){

	console.log('Servidor rodando');

});