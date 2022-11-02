var FlightDB = require('../model/flight');

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
}
// create and save new flight
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new flight
    const flight = new FlightDB({
        flightNo  : req.body.flightNo ,
        airlines  : req.body.airlines ,
        source  : req.body.source ,
        destination : req.body.destination ,
        duration : req.body.duration,
        departureDate  : req.body.departureDate ,
        status : req.body.status
    })

    // save flight in the database
    flight
        .save(flight)
        .then(data => {
            //res.send(data)
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all flights/ retrive and return a single flight
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        FlightDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found flight with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving flight with id " + id})
            })

    }else{
        FlightDB.find()
            .then(flight => {
                res.send(flight)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving flight information" })
            })
    }

    
}


// retrieve and return search by sestionation
exports.searchByDestination = (req, res)=>{
    if(req.query.destination){
        
        const regex = new RegExp(escapeRegex(req.query.destination),'gi');

        FlightDB.find({"$or":[{"destination": regex}]})
            .then(data => {
                res.render("search_flight", { flights : data})
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving flight information" })
            })
        }

    
}

exports.searchByDate = (req, res)=>{
    if(req.query.date){
        
        const regex = new RegExp(req.query.date,'gi');

        FlightDB.find({"$or":[{"departureDate": regex}]})
            .then(data => {
                res.render("search_flight", { flights : data})
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving flight information" })
            })
        }

    
}
// Update a new idetified flight by flight id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    FlightDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update flight with ${id}. Maybe flight not found!`})
            }else{
                res.send(data)
                //res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update flight information"})
        })
}



// Delete a flight with specified flight id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    FlightDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "flight was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete flight with id=" + id
            });
        });
}