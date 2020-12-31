const express = require("express");
const app = express();
const mongoose = require("mongoose");

let candidateModal = require('./candidateModal');

const connectMongo = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
        mongoose.connection.on('err', (err) => {
            console.log("error", err);
            reject(err)
        })
        mongoose.connection.on('open', () => {
            resolve(true)
        })
    })
}


const insertCandidateInDB = async (req, res) => {
    const connectonStatus = await connectMongo();
    console.log("Db Connection Status", connectonStatus);
    if (connectonStatus == true) {
        let newCandidate = new candidateModal({
            name: req.body.name,
            email: req.body.email
        })
        newCandidate.save()
            .then(doc => {
                res.send({
                    'statusCode': 200,
                    'massage': req.body.name + "Inserted Successfully"
                });
            })
            .catch(err => {
                res.send({
                    'statusCode': 500,
                    'massage': err
                });
            })
    }
}

exports.insertCandidateInDB = insertCandidateInDB;