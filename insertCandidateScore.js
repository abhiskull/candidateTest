const express = require("express");
const app = express();
const mongoose = require("mongoose");

let testScoreModal = require('./testScoreModal');

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

const insertTestScoreDB = async (req, res) => {
    const connectonStatus = await connectMongo();
    console.log("Db Connection Status", connectonStatus);
    if (connectonStatus == true) {
        testScoreModal.find({name: req.body.name}, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                if (result.length) {
                    result[0].test.push(req.body.test[0]);
                    result[0].totalScore = result[0].totalScore + req.body.test[0].roundScore;
                    testScoreModal.update({name: req.body.name}, {$set: result[0]}, (err, result)=>{
                        if(err){
                            res.send({
                                'statusCode': 500,
                                'massage': err
                            });
                        } else {
                            res.send({
                                'statusCode': 200,
                                'massage': "Score for round " + req.body.test[0].roundNumber + " for " + req.body.name + " Updated Successfully"
                            })
                        }
                    });
                } else {
                    let candidateScore = new testScoreModal({
                        name: req.body.name,
                        test: req.body.test,
                        totalScore: req.body.test[0].roundScore
                    })
                    candidateScore.save()
                        .then(doc => {
                            res.send({
                                'statusCode': 200,
                                'massage': req.body.name + " Inserted Successfully"
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
        })
    }
}


exports.insertTestScoreDB = insertTestScoreDB;