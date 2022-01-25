const checkOrigin = (req,res,next) => {

  
  console.log(req.headers);
  next();
}

module.exports = checkOrigin;