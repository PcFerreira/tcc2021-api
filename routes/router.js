const crud = require('./crud');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('Hello');
    });
    crud(app, fs);

};

module.exports = appRouter;