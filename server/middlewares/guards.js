const { corsWhiteList } = require('../corsWhiteList');

function isCorrectOrigin() {
  return (req, res, next) => {
    console.log(req.headers.origin);
    if (corsWhiteList.indexOf(req.headers.origin)) {
      next();
    } else {
      res.status(401).json({ message: 'INCORRECT ORIGIN' });
    }
  };
}

function isAuthenticated() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: 'NO_USER' });
    }
  };
}

module.exports = {
  isCorrectOrigin,
  isAuthenticated
};