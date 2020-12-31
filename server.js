const express = require("express");
const PORT = 3000;
const app = express();
// const bodyParser = require('body-parser');
const insertCandidate = require('./insertCandidate');
const insertTestScore = require('./insertCandidateScore');
const finalScore = require('./finalScore');

app.use(express.json());

app.get('/', (req, res) => {
    console.log("Welcome to test................");
    res.send('');
});

app.post('/insertCandidate', (req, res) => {
    insertCandidate.insertCandidateInDB(req, res)
});

app.post('/candidateScore', (req, res) => {
    insertTestScore.insertTestScoreDB(req, res)
});

app.get('/finalCandidateScore', (req, res) => {
    finalScore.getFinalScore(req, res)
});

app.listen(PORT, () => { 
    console.log("server started - Listning PORT:- ", PORT) 
});