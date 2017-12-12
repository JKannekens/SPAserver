const SportComplexesController = require('../controllers/sportcomplexes_controller');
const EventsController = require('../controllers/events_controller');
const SportsController = require('../controllers/sports_controller');

module.exports = (app) => {

    app.get('/api/sportcomplexes', SportComplexesController.readAll);
    app.get('/api/sportcomplexes/:id', SportComplexesController.readOne);
    app.post('/api/sportcomplexes', SportComplexesController.create);
    app.put('/api/sportcomplexes/:id', SportComplexesController.edit);
    app.delete('/api/sportcomplexes/:id', SportComplexesController.delete);

    app.get('/api/events', EventsController.readAll);
    app.get('/api/events/:id', EventsController.readOne);
    app.post('/api/events', EventsController.create);
    app.put('/api/events/:id', EventsController.edit);
    app.delete('/api/events/:id', EventsController.delete);

    app.get('/api/sports', SportsController.readAll);
    app.get('/api/sports/:id', SportsController.readOne);
    app.post('/api/sports', SportsController.createSport);
    app.post('/api/attributes', SportsController.createAttribute);
    app.post('/api/sports/attribute', SportsController.addAttributeToSport);
    app.put('/api/sports/:id', SportsController.updateSport);
    app.delete('/api/sports/:id', SportsController.removeSport);
};