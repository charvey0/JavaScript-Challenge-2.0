// set first question
var questionNumber = 0;
var correct = askQuestion(questionNumber++);

// set time and score
var time = 0;
var score = 0;




/*************************************************************
*               DISPLAY #1 FUNCTIONS 
*********************************************************** */

// DISPLAYS: the rule for the quiz
// WAITING FOR: user to push the "Begin" button
// NEXT: takeQuiz()
function init() {
    // show the correct part and link up the nav-bar
    $(".nav-link").removeClass("active");
    $("#display1").show();    
    $("#display2").hide();    
    $("#display3").hide();
    $("#nav-link-1").addClass("active");    

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

    // loop index back to 0 if last question was already asked
    if (questionNumber >= questions.length) { 
        questionNumber = 0; 
        i = 0; 
    }

    // make a array of random numbers 1-4
    var randomArray = randomIntArray(4);    
    
    // load question and options
    $("#question").text(questions[i][0]);
    $("#option1").text(questions[i][randomArray[0]]);
    $("#option2").text(questions[i][randomArray[1]]);
    $("#option3").text(questions[i][randomArray[2]]);
    $("#option4").text(questions[i][randomArray[3]]);

    // return answer
    return questions[i][1];
}

// DISPLAYS: the quiz elements 
// WAITING FOR: time to run out or user to answer all 50 questions
// NEXT: revealScore()
function takeQuiz() {
    // show the correct part and link up the nav-bar
    $(".nav-link").removeClass("active");
    $("#display1").hide();    
    $("#display2").show();    
    $("#display3").show();
    $("#nav-link-2").addClass("active");    
    
    //reset time and score
    time = 60; 
    score = 0;

    // show time and score
    $("#time").text(time);
    $("#score").text(score);


    // make trigger to count down time
    var timer = setInterval(function() {
        time--; 
        $("#time").text(time);
        if (time <= 0) { 
            clearInterval(timer);
            time = 0;
            $("#time").text(0);
            revealScore();

        }
    }, 1000);
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


// DISPLAYS: final score and notifies user if they made it to the Hall of Fame
function revealScore() {

    // if user has not started a quiz and did not finish
    if (time <= 0) {
        // get userName from localStorge, if it's not there ask user for it
        var userName = localStorage.getItem("userName");
        if (userName === null) {
            userName = prompt("Please enter your name.");
        } else if (!confirm("Is this still "+userName+"?")) {
            userName = prompt("Please enter your name.");
        }
    }

    // show the correct part and link up the nav-bar
    $(".nav-link").removeClass("active");
    $("#display1").hide();    
    $("#display2").hide();    
    $("#display3").show();
    $("#nav-link-3").addClass("active");    

    // remember userName for next time
    localStorage.setItem("userName", userName);

    // get current members and scores
    var hallScores = getHallScores();


    // check to see if user got a nonzero score
    if (score != 0) {
        $("#left-3").html("<h1 style='margin: 70px'>Your final score is: "+score+" points!</h1>");
 
        var currentScore = [userName, score];
    
        // add the new score
        hallScores.push(currentScore);
    
    } else {
        $("#left-3").html("<h1 style='margin: 70px'>Thank you for visiting the Hall of Fame!</h1>");
    }
  
    // sort and limit to 10 members
    hallScores = sortScores(hallScores); 

    //reset score
    score = 0;

    // keeps track if the user is member or not
    var isMember = false;

    $("#right-3").html("<hr class='my-4'>");

    if (hallScores.length > 0) {
        // go through each score in the hall and lists it in the right column
        for(var i=hallScores.length-1 ; i>=0 ; i--){
            if(userName == hallScores[i][0]){
                $("#right-3").prepend("<div class='btn btn-primary' style='width: 75%; margin: 10px;'>"+ordinalNumbers[i]+" place: "+hallScores[i][0]+" ("+hallScores[i][1]+" points)</div");
                isMember = true;
            } else {
                $("#right-3").prepend("<div class='btn btn-outline-primary' style='width: 75%; margin: 10px;'>"+ordinalNumbers[i]+" place: "+hallScores[i][0]+" ("+hallScores[i][1]+" points)</div");
            }
       }
    } else { $("#right-3").prepend("Not much to see here, why don't you try to be the first in the Hall of Fame!") }

    $("#right-3").prepend("<hr class='my-4'>");

    if (isMember) {
        $("#left-3").append("Congratulations of being a member of the Hall of Fame.  All your scores are highlighted to the right.");
    }
}







/***************************************************

    WHEN THE DOCUMANT IS READY, LET'S BEGIN

****************************************************/
$( document ).ready( function() {

    // place eventListener on the nav link #1 Begin button 
    $("#nav-link-1").on("click", function(){
        $(".nav-link").removeClass("active");
        $("#display1").show();    
        $("#display2").hide();    
        $("#display3").hide();
        $("#nav-link-1").addClass("active");
        time = 0;
        init();    
    });
    

    // place eventListener on the nav link #2 Begin button 
    $("#nav-link-2").on("click", function(){
        $(".nav-link").removeClass("active");
        $("#display1").hide();    
        $("#display2").show();    
        $("#display3").hide();   
        $("#nav-link-2").addClass("active");    
        time = 0;
        takeQuiz(); 
    });

    // place eventListener on the nav link #3 Begin button 
    $("#nav-link-3").on("click", function(){
        $(".nav-link").removeClass("active");
        $("#display1").hide();    
        $("#display2").hide();    
        $("#display3").show();    
        $("#nav-link-3").addClass("active");
        time = 0;
        revealScore();    
    });

    // place eventListener on the display #1 Begin button 
    $("#begin").on("click", function(){
        $(".nav-link").removeClass("active");
        $("#display1").hide();    
        $("#display2").show();    
        $("#nav-link-1").addClass("active");
        takeQuiz();
    });


    // place eventListener on the nav link #3 Begin button 
    $(".option").on("click", function (e) {

        var userChoice = e.target.innerText;
        if (checkResult(userChoice, correct)){
          // increase score
          score++;

          // let user know they got is right
          $("#result").text("Yes! You got it right!");
          $( this ).css("color", "green");

        } else { 
          // time penelty  
          time -= 5;

          // let user know they were wrong
          $( this ).removeClass("btn-success").addClass("btn-danger");
          $("#result").text("Sorry, your answer is incorrect");
        }

        // set a timer to reset the chosen option back to original style
        setTimeout(function() { 

            // show time and score
            $("#time").text(time);
            $("#score").text(score);

            // reset
            $(".option").css("color", "white").removeClass("btn-danger").addClass("btn-success");
            $("#result").text("");
        }, 500);

     correct = askQuestion(questionNumber++);

    });

    
    // give the user the rules with a button to begin the quiz
    init();    

});
