
/*************************************************************
*               DISPLAY #1 FUNCTIONS 
*********************************************************** */

// DISPLAYS: the rule for the quiz
// WAITING FOR: user to push the "Begin" button
// NEXT: takeQuiz()
function init() {
    $("#hall").hide();

    display1.show();
    display2.hide();
    display3.hide();
        

}







/*************************************************************
*               DISPLAY #2 FUNCTIONS 
*********************************************************** */

// INPUT: number of integers to be in the return array
// OUTPUT: a random array from 1 to the input number
function randomIntArray(n){
    // create an array = ['1', '2', ... ,'n'] 
    var array = [];
    for(var i=1 ; i<=n ; i++){
      array.push(i);    
    }

    // randomize that array
    var rand = [];
    while (array.length != 0) {
      let j = Math.floor(Math.random() * array.length);
      rand.push(array[j]);
      array.splice(j, 1);
    }

    return rand;
}




// INPUT: (1) the user's response to a question (2) the correct response
// OUTPUT: TRUE if correct, FALSE if not
function checkResult(r, c){
    var result = false;
    if (r == c) {
        result = true;
    }
    return result;            
}





// INPUT: input is the question index
// OUTPUT: correct response
function askQuestion(i){

    // make a array of random numbers 1-length of array-1
    var randomArray = randomIntArray(4);    
    
    // load prompt and options
    $("#question").text(questions[i][0]);
    $("#option1").text(questions[i][randomArray[0]]);
    $("#option2").text(questions[i][randomArray[1]]);
    $("#option3").text(questions[i][randomArray[2]]);
    $("#option4").text(questions[i][randomArray[3]]);

    // return answer
    return questions[i][1];
}





/*************************************************************
*               DISPLAY #3 FUNCTIONS 
*********************************************************** */

// This is all the places for the hall of fame 
const ordinalNumbers = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'];




// INPUT: none
// OUTPUT: an array of scores in the hall of fame in decending order
function getHallScores(){
    // get hallScores from cache
    var hallScores = JSON.parse(localStorage.getItem("hallScores"));
  
    // check in hallScores is null
    if (hallScores == null) {
        hallScores = [];
    }

    return hallScores;
}



// INPUT: an array of member names(index 0) and thier scores (index 1)
// * sets the hallScore in localStorage to the new array
// OUTPUT: array of scores in HoF (decending order)
function sortScores(scores){
    // sorts the array by index 1 from largest to smallest
    for(var i=scores.length-1 ; i>=0 ; i-- ){
      for(var j=(i-1) ; j>=0 ; j--){
          if(scores[i][1] > scores[j][1]){
            var temp = scores [i];
            scores[i] = scores[j];
            scores[j] = temp;
          }
      }
    }  
    // delete scores after 10th place
    while (scores.length > 10) { scores.pop();  }

    localStorage.setItem("hallScores", JSON.stringify(scores)); 
    return scores;
}








/*

    WHEN THE DOCUMANT IS READY, LET'S BEGIN

*/
$( document ).ready( function() {

    $("#display1").show();    

    // place eventListener on the display #1 Begin button 
    $("#begin").on("click", function(e){
        takeQuiz();
    });
    
});
  
