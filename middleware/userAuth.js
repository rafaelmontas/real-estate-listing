const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('user-auth');
  if(!token) return res.status(401).json({msg: 'Access Denied'});

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).json({msg: 'Invalid Token'});
  }
}

module.exports = verifyToken;