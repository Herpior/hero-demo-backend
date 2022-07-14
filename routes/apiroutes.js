const express = require("express");
const heroModel = require('../models/hero');

let router = express.Router();

//db

router.get("/heroes", function (req, res) {
    let query = {};
    heroModel.find(query, function(err, items){
        if (err){
            console.log("error querying items, err: "+err);
            return res.status(500).json({message:"internal server error"});
        } 
        return res.status(200).json(items);
    })
    
})

router.post("/heroes", function (req, res) {
    if (!req.body || !req.body.name) {
        return res.status(400).json({ message: "Bad request" });
    }

    let hero = new heroModel({
        name: req.body.name
    })
    hero.save(function (err) {
        if (err) {
            console.log("failed to save hero, err: " + err);
            return res.status(500).json({ message: "internal server error" });
        }
        return res.status(201).json(hero);
    })
})

router.delete("/heroes/:id", function (req, res) {
    return res.status(200).json({ message: "success" });
    
})

router.put("/heroes/:id", function (req, res) {
    if (!req.body) {
        return res.status(400).json({ message: "Bad request" });
    }
    if(!req.body.name) {
		return res.status(400).json({message:"Bad request"});
	}
    let hero ={
        name: req.body.name
    }
    heroModel.replaceOne( { _id:req.params.id }, hero, function(err){
        if(err) {
            console.log("Failed to edit hero. Reason:",err);
            return res.status(500).json({message:"Internal server error"});
        }
        return res.status(200).json({ message: "success" });
    })
})

module.exports = router;