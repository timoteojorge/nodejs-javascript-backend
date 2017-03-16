var mysql = require('mysql');

function createDbConnection(){
	 if(!process.env.NODE_ENV) {
		return mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'admin',
				database: 'casadocodigo_nodejs'
			});
	 }

	  if(process.env.NODE_ENV == 'test') {
		  return mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'admin',
				database: 'casadocodigo_nodejs_test'
			});
	  }
}

//wrapper
//Evita que a conexão seja aberta assim que aplicação sobe
//Conexão é instanciada apenas quando é chamada
module.exports = function(){
	return createDbConnection;
}