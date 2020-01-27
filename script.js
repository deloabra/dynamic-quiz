var timer = document.querySelector("#timer");
var navEl = document.querySelector("nav");
var main = document.querySelector("main");


//TIME VARIABLE
var time = 10;
var mainTime;

//array of quesiton objects
//objects have question string, array for answer choice strings, and correct answer choice(index number of answer choice array)
var questionArr = [
    {question: "what is my name?",
    choices: ["Brayden", "Jim", "Brady", "I don't have one"],
    answer: 0},
    
    {question: "What is the square root of 144?",
    choices: ["11", "14", "4", "12"],
    answer: 3},
    
    {question: "What is the capital of Taiwan?",
    choices: ["Hong Kong", "Taipei", "Shanghai", "Beijing"],
    answer: 1},

    {question: "What is the smalles island country?",
    choices: ["Tuvala", "Palau", "Nauru", "Malta"],
    answer: 2}];


var arrIndex = 0;

//initialize website for first enter
function init(){
    timer.textContent = "time: " + time;
    arrIndex = 0;
    displayMenu();
}

//quiz handler
function quiz(){

    //countdown
    mainTime = setInterval(function(){
        timer.textContent = "time: " + --time;
        if(time <= 0){
            //end timer and change function
            clearInterval(mainTime);
        }
    }, 1000);

    displayQuestion(questionArr[0], "");

}

//main menu
function displayMenu(){

    clearMain();

    var title = document.createElement("p");
    var subtitle = document.createElement("p");
    var start = document.createElement("button");

    //main title
    title.setAttribute("class", "mainmenu");
    title.setAttribute("style", "text-emphasis: bolder; font-size: 28px;");
    title.textContent = "Coding Quiz Challenge";
    main.appendChild(title);
    
    //description
    subtitle.setAttribute("class", "mainmenu");
    subtitle.setAttribute("style", "font-size: 22px;");
    subtitle.textContent = "This is a timed quiz. Try to end with the most time left. Each time you get a question wrong you will lose time.";
    main.appendChild(subtitle);

    //Start Quiz Button
    start.setAttribute("id", "start-button");
    start.setAttribute("class", "mainmenu");
    start.textContent = "start quiz";
    main.appendChild(start);

}

//question handler
function displayQuestion(questionData, previousResult){

    clearMain();

    //display question
    var title = document.createElement("p");
    title.setAttribute("style", "font-size: 22px; text-emphasis: bold;");
    title.textContent = questionData.question;
    main.appendChild(title);

    //display all answer choices as buttons
    for(var i = 0; i < questionData.choices.length; i++){
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("data-index", i);
        buttonEl.setAttribute("class", "answer-choice");
        buttonEl.textContent = questionData.choices[i];
        buttonEl.appendChild(document.createElement("br"));
        main.appendChild(buttonEl);
    }

    //display if last answer was correct or incorrect
    if(previousResult === "correct" || previousResult === "incorrect"){
        //horizontal line
        main.appendChild(document.createElement("hr"));

        //readying text
        var resultDisplay = document.createElement("p");

        if(previousResult === "correct"){
            resultDisplay.setAttribute("style", "color: green;");
            resultDisplay.textContent = "Correct!";
        }
        else{
            resultDisplay.setAttribute("style", "color: red;");
            resultDisplay.textContent = "Wrong!"
        }

        main.appendChild(resultDisplay);
    }

}

//clear main for reuse
function clearMain(){
    main.innerHTML = "";
}


init();

//button press handler
main.addEventListener("click", function(event){
    var element = event.target;
    if(element.matches("button")){
        quiz();
    }
    if(element.matches(".answer-choice")){
        var submission = element.getAttribute("data-index");
        var correctAnswer = "";
        if(parseInt(submission) === questionArr[arrIndex].answer){
            correctAnswer = "correct";
        }
        else{
            correctAnswer = "incorrect";
            time -= 5;
            timer.textContent = "time: " + time;
        }
        arrIndex++;
        if(arrIndex === questionArr.length){
            init();  //CHANGE THIS
        }
        else{
            displayQuestion(questionArr[arrIndex], correctAnswer);
        }
    }
});