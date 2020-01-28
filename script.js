var timer = document.querySelector("#timer");
var navEl = document.querySelector("nav");
var main = document.querySelector("main");


//TIME VARIABLE
var time;
var mainTime;

//time penalty for getting a question wrong
var penalty = 5;

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

//                                              initialize website for first enter
function init(){

    //set up local storage
    if(localStorage.scores === undefined){
        localStorage.scores = JSON.stringify([]);
    }

    time = 60;
    clearInterval(mainTime);
    timer.textContent = "time: " + time;
    arrIndex = 0;
    displayMenu();
}

//                                                      quiz handler
function quiz(){

    //countdown
    mainTime = setInterval(function(){
        timer.textContent = "time: " + --time;
        if(time <= 0){
            //end timer and change function
            clearInterval(mainTime);
            endMenu();
        }
    }, 1000);

    displayQuestion(questionArr[0]);

}

//                                                       main menu
function displayMenu(){

    clearMain();

    var title = document.createElement("p");
    var subtitle = document.createElement("p");
    var start = document.createElement("button");

    //main title
    title.setAttribute("class", "mainmenu");
    title.setAttribute("style", "text-emphasis: bolder; font-size: 28px;");
    title.textContent = "Quiz Challenge";
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

//                                          Display the current Question
function displayQuestion(questionData){

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
}

//                                 Display the result of the previous question
function displayPrevious(previousResult){

    var subMain = document.createElement("div");
    //horizontal line
    subMain.appendChild(document.createElement("hr"));

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

    subMain.appendChild(resultDisplay);
    main.appendChild(subMain);

    setTimeout(function(){
        main.removeChild(subMain)
    }, 1000);
}

//                                                          display end menu
function endMenu(){

    clearMain();

    var title = document.createElement("p");
    var subtitle = document.createElement("p");
    var submitForm = document.createElement("form");
    var textInput = document.createElement("input");
    var submitButton = document.createElement("button");

    //main title
    title.setAttribute("style", "text-emphasis: bolder; font-size: 28px;");
    title.textContent = "All Done!";
    main.appendChild(title);
    
    //description
    subtitle.setAttribute("style", "font-size: 22px;");
    subtitle.textContent = "Your final score is " + time + ".";
    main.appendChild(subtitle);

    //submit form
    submitForm.setAttribute("action", "highscores.html");

    //set text box attributes
    textInput.setAttribute("type", "text");
    textInput.setAttribute("placeholder", "Enter Initials");

    //set submit button attributes
    submitButton.setAttribute("id", "submit-button");
    submitButton.setAttribute("value", "Submit");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "submit";

    submitForm.appendChild(textInput);
    submitForm.appendChild(submitButton);
    main.appendChild(submitForm);

}


//                                                          clear main for reuse
function clearMain(){
    main.innerHTML = "";
}


init();

//                                                          button press handler
main.addEventListener("click", function(event){
    var element = event.target;
    if(element.matches("#start-button")){
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
            time -= penalty;
            if(time < 0){time = 0;}
            timer.textContent = "time: " + time;
        }
        arrIndex++;
        if(arrIndex === questionArr.length){
            clearInterval(mainTime);
            endMenu();
            displayPrevious(correctAnswer);
        }
        else{
            displayQuestion(questionArr[arrIndex]);
            displayPrevious(correctAnswer);
        }
    }
    if(element.matches("#submit-button")){
        var localTemp = JSON.parse(localStorage.scores);
        localTemp.push({
            initials: element.previousSibling.value,
            score: time
        });
        localStorage.scores = JSON.stringify(localTemp);
    }
});