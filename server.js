const express = require('express');
const bodyParser = require('body-parser');
const promMid = require('express-prometheus-middleware');
const morgan = require('morgan')

const app = express();

const fs = require('fs');


app.use(morgan('combined'))


app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


const routes = require('./routes/router')(app, fs);

const server = app.listen(3000, () => {
    console.log('listening on port %s...', server.address().port);
});