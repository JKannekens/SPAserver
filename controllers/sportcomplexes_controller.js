const SportComplex = require('../models/sportcomplex.model');

module.exports = {
  readAll(req, res, next) {
      SportComplex.find({})
          .then( (SportComplex) => {
              res.send(SportComplex);
          })
          .catch( (err) => next(err));

  },

  readOne(req, res, next) {
      const sportcomplexId = req.params.id;

      SportComplex.findOne({ _id: sportcomplexId })
          .then( (SportComplex) => {
              res.send(SportComplex);
          })
          .catch( (err) => next(err));
  },

  create(req, res, next) {
    const sportcomplexProps = req.body;

    SportComplex.create(sportcomplexProps)
        .then(sportcomplex => res.send(sportcomplex))
        .catch(next);
  },

  edit(req, res, next) {
      const sportcomplexId = req.params.id;
      const sportcomplexProps = req.body;

      SportComplex.findByIdAndUpdate({ _id: sportcomplexId }, sportcomplexProps, {new: true})
          .then( (SportComplex) => {
              res.send(SportComplex);
          })
          .catch( (err) => next(err));
  },

  delete(req, res, next) {
      const sportcomplexId = req.params.id;

      SportComplex.findByIdAndRemove({ _id: sportcomplexId })
          .then(sportcomplex => res.status(204).send(sportcomplex))
          .catch(next);
  }
};