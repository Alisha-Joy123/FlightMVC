const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);
//route.get('/index', services.homeRoutes);

/**
 *  @description add flights
 *  @method GET /add-flight
 */
route.get('/add-flight', services.add_flight)
route.get('/search-flight', services.search_flight)


route.get('/api/flights', controller.find);
/**
 *  @description for update flight
 *  @method GET /update-flight
 */
route.get('/update-flight', services.update_flight)


// API
route.post('/api/flight', controller.create);
route.get('/api/flights', controller.find);
route.put('/api/flights/:id', controller.update);
route.delete('/api/flights/:id', controller.delete);


// route.post('/api/searchByDestination', services.searchByDestination)
// route.post('/api/searchByD/', controller.searchByD)

route.get('/api/searchByDestination', controller.searchByDestination)
route.get('/api/searchByDate', controller.searchByDate)
//route.post('/api/searchByD/', controller.searchByD)

module.exports = route