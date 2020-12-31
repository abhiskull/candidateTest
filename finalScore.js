const express = require("express");
const app = express();
const mongoose = require("mongoose");
let testScoreModal = require('./testScoreModal');
const _ = require('lodash');

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

const getFinalScore = async (req, res) => {
    const connectonStatus = await connectMongo();
    console.log("Db Connection Status", connectonStatus);
    if (connectonStatus == true) {
        testScoreModal.find({}, ['name', 'test', 'totalScore'], {sort: {
            'totalScore': -1 
        }}, (err, result) => {
            if(err){
                res.send(err)
            } else{
                if(!result.length){
                    res.send("No Candidate score found");
                }else{
                    let finalReturnObj = {};
                    finalReturnObj.highestScroringCandidate = result[0].name;
                    finalReturnObj.candidatesAvgScore = [];
                    _.forEach(result, (eachResult) => {
                        let eachCandidateAvg = {
                            'name': eachResult.name,
                            'avgScore': eachResult.totalScore/eachResult.test.length
                        }
                        finalReturnObj.candidatesAvgScore.push(eachCandidateAvg)
                    })
                    res.send(finalReturnObj);
                }
            }
        })
    }
}


exports.getFinalScore = getFinalScore;