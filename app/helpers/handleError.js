const httpError = (res, err) => {
  console.log(err);
  res.status(500).send({error: 'Algo ocurrio'});
};

module.exports = { httpError };
