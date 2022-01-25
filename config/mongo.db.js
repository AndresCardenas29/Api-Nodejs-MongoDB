const mongoose = require('mongoose');

const dbConnect = () => {
  const DB_URI = process.env.DB_URI || 3000;
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },(err, res) => {
    if(!err){
      console.log(`##### Conectado a MongoDB a la BDD ${res.connection.name} #####`);
    }else{
      console.error(`##### Error de Conexion #####\n${err}`);
    }
  });
}

module.exports = { dbConnect}