const db = require("../models");
const mongoose = require("mongoose")

// Defining methods for the booksController
module.exports = {
   
    find: function (req, res) {
        console.log(req.body)
        db.User
            .find({_id: {$ne : mongoose.Types.ObjectId(req.params.user)}})
        .populate({
            path: "locations",
            match: [{ 
                
                recordedAt: { $gte: req.params.lowDate, $lte: req.params.highDate }
                ,
                // longitude: { $gt: req.params.lon - (.0000898 / Math.cos(req.params.lat)), $lt: req.params.lon + (.0000898 / Math.cos(req.params.lat))}
                // ,
                // latitude: { $gt: req.params.lat - (.0000895 / Math.sin(90 - req.params.lon)), $lt: req.params.lat} + (.0000895 / Math.sin(90 - req.params.lon)),
                minutes: { $gt:req.params.minutes - req.params.time, $lt:req.params.minutes }
        
        }]
        })
            .then(user => {
                
                res.json(user)})
            .catch(err => res.status(422).json(err));
    }
}