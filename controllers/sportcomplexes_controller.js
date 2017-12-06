const SportComplex = require('../models/sportcomplex.model');

module.exports = {
  greeting(req, res) {
      res.send({ hi: 'there' });
  },

  create(req, res, next) {
    const sportcomplexProps = req.body;

    SportComplex.create(sportcomplexProps)
        .then(sportcomplex => res.send(sportcomplex))
        .catch(next);
  }
};