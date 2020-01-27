var timer = document.querySelector("#timer");
var navEl = document.querySelector("nav");
var main = document.querySelector("main");


//TIME VARIABLE
var time = 60;

//array of quesiton objects
//objects have question string, array for answer choice strings, and correct answer choice(index number of answer choice array)
var questionArr = [{question: "what is my name?", choices: ["Brayden", "Jim", "Brady", "I don't have one"], answer: 0}];

//initialize website for first enter
function init(){
    timer.textContent = "time: " + time;
    displayMenu();
}

//quiz handler
function quiz(){

    //countdown
    var mainTime = setInterval(function(){
        timer.textContent = "time: " + --time;
        if(time === 0){
            //end timer and change function
            clearInterval(mainTime);
        }
    }, 1000);


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
});