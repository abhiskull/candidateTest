# candidateTest
CandidateTest 3 round ---- 3 api

Postman Service Details:- 
1) localhost:3000/insertCandidate
   method - post
   body data structure- {
  	"name":  "neha singh",
  	"email": "abc12@gmail.com"
  }
  
2) localhost:3000/candidateScore
   method - post
   body data structure- {
	  "name" : "neha singh",
	  "test": [
		  {
		  	"roundNumber" : 3,
		  	"roundScore": 3
		  }	
	  ]
   }
   
3) localhost:3000/finalCandidateScore
   method - get
