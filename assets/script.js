// This is all the places for the hall of fame 
const ordinalNumbers = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'];

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

askQuestion(0);
