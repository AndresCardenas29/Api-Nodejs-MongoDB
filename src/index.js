const [app,port] = require('./app');
const dbb = require('./database');

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});