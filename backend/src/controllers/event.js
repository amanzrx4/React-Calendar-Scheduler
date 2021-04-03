const Event = require('../models/event');
const jwt = require('jsonwebtoken');

exports.createEvent = async (req,res,next) => {
    
    const {title,description,start,end,allDay,status,color,userId} = req.body;
    const _event = new Event({
        title,
        description,
        start,
        end,
        allDay,
        status,
        color,
        userId
    });
    _event.save((error , data) => {
      if(error)
      {
        return res.status(400).json({
          message : "ERRRRRRRRRRRRRRRRRRRRRR"
        })
      }
      if(data){
        return res.status(201).json({
          message : "Event created successfully"
        })
      }
    })
    
  
}

exports.getEvent = async (req,res,next) => {

    try{
        let eventList =  await Event.find()
        // console.log(response);

        res.status(200).send(eventList);
    }
    catch(err) {
        res.send("Error while loading Event Data")        
    }
    
}