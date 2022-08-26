const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/vote')

const Pusher = require('pusher');

var pusher = new Pusher({
    appId : "1433302",
    key : "cfa4b06555370ffa6124",
    secret : "5e4ed79bb2836922f4b2",
    cluster : "sa1",
    useTLS: true,
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({sucess: true, votes: votes }));
});

router.post('/', (req,res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    }
new Vote(newVote).save().then(vote => {
    pusher.trigger('enquete', 'votacao', {
        points: parseInt(vote.points),
        os: vote.os
    });
    return res.json({sucess: true , message : 'Obrigado por votar'})
 });
});

module.exports = router;