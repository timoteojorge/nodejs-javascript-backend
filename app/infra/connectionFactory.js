var mysql = require('mysql');

function createDbConnection(){
	return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'admin',
			database: 'casadocodigo_nodejs'
		});
}

//wrapper
//Evita que a conexão seja aberta assim que aplicação sobe
//Conexão é instanciada apenas quando é chamada
module.exports = function(){
	return createDbConnection;
}