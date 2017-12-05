const SportComplexesController = require('../controllers/sportcomplexes_controller');

module.exports = (app) => {

    app.get('/api', SportComplexesController.greeting);

    app.post('/api/sportcomplexes', SportComplexesController.create);
};