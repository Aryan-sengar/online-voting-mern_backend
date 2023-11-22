const express = require("express");
const votingSchema = require("../model/votingSchema");
const voteRoute = express.Router();
const mongoose = require("mongoose");

voteRoute.post("/create-vote", (req, res) => {
    votingSchema.create(req.body, (err, data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

voteRoute.get("/", (req, res) => {
    votingSchema.find((err, data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

voteRoute.route("/update-vote/:id")
.get((req, res) => {
    votingSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
}).put((req, res) => {
    votingSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set: req.body},
    (err, data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

voteRoute.delete("/delete-vote/:id", (req, res) => {
    votingSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

module.exports = voteRoute;