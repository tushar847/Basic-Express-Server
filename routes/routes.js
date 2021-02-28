const { Router } = require('express');
const express = require('express');
const routes = express.Router();
const personModel = require('../model/person');

// create
routes.post('/' ,  async(req,res) => {
    const person = new personModel(
        {
            name: req.body.name,
            place: req.body.place,
            cellNo: req.body.cellNo
        }
    );
    try {
        const latesPersonCreated = await person.save();
        res.status(201).json(latesPersonCreated);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// read all 
routes.get('/', async (req, res) => {
    try{
        const person = await personModel.find();
        res.json(person);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

//read one
routes.get('/:id' , getSubscriber , (req, res) => {
    res.json(res.person);
} )

// update by id
routes.patch('/:id', getSubscriber , async (req, res) => {
    if ( req.body.name != null ){
        res.person.name = req.body.name;
    }
    if ( req.body.place != null){
        res.person.place = req.body.place;
    }
    if ( req.body.cellNo != null){
        res.person.cellNo = req.body.cellNo;
    }
    
    try{
        const updatePerson = await res.person.save();
        res.status(200).json(updatePerson);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
})

// delete
routes.delete('/:id', getSubscriber , async (req, res) => {
    try {
        await res.person.remove();
        res.status(200).json({ message: 'Deleted Succesfully !!'});
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
})




async function getSubscriber ( req, res, next) {
    let person;
    try {
        person = await personModel.findById(req.params.id);
        if (person === null ){
            return res.status(404).json({ message: 'Not Found'});
        }
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.person = person;
    next();
}


module.exports = routes;