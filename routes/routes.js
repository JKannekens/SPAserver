const SportComplexesController = require('../controllers/sportcomplexes_controller');

module.exports = (app) => {

    app.get('/api/sportcomplexes', SportComplexesController.readAll)

    app.get('/api/sportcomplexes/:id', SportComplexesController.readOne);

    app.post('/api/sportcomplexes', SportComplexesController.create);

    app.put('/api/sportcomplexes/:id', SportComplexesController.edit);

    app.delete('/api/sportcomplexes/:id', SportComplexesController.delete);
};