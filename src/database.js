const {connect} = require('mongoose');

( async () => {
  try {
    const db = await connect('mongodb://nek:root@localhost/api?authSource=admin');
    console.log('DB connected to', db.connection.name);
  } catch (err) {
    console.error(`### ERROR: \n${err}`);
  }
})();