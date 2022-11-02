const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/flights
    axios.get('http://localhost:3000/api/flights')
        .then(function(response){
            res.render('index', { flights : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_flight = (req, res) =>{
    res.render('add_flight');
}

exports.search_flight = (req, res) =>{
    res.render('search_flight', {flights:{}});
}

exports.update_flight = (req, res) =>{
    axios.get('http://localhost:3000/api/flights', { params : { id : req.query.id }})
        .then(function(flightdata){
            res.render("update_flight", { flight : flightdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.searchByDestination = (req, res) =>{
    axios.post('http://localhost:3000/api/searchByD',{   destination:req.query.destination
      })
        .then(function(flightdata){
            res.render("search_flight", { flight : flightdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}