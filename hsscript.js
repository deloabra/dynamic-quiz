var mainEl = document.querySelector("main");

// for(var i = 0; i < temp.length; i++){
//     var test = document.createElement("h1");
//     test.textContent = temp[i].initials + " " + temp[i].score;
//     mainEl.appendChild(test);
// }

function init(){
    var title = document.createElement("h1");
    var scoreList = document.createElement("ol");
    var homeButton = document.createElement("button");
    var clearButton = document.createElement("button");

    mainEl.innerHTML = "";
    
    orderScores();
    var temp = JSON.parse(localStorage.scores);

    //high scores title
    title.textContent = "High Scores";
    mainEl.appendChild(title);

    //add high scores
    temp.forEach(element => {
        let liEl = document.createElement("li");
        liEl.textContent = element.initials + " - " + element.score;
        scoreList.appendChild(liEl);
    });

    mainEl.appendChild(scoreList);

    //buttons
    homeButton.textContent = "Go Back";
    homeButton.setAttribute("id", "home-button");
    mainEl.appendChild(homeButton);

    clearButton.textContent = "Clear Highscores";
    clearButton.setAttribute("id", "clear-button");
    mainEl.appendChild(clearButton);

}

function orderScores(){
    var scoresArr = JSON.parse(localStorage.scores);
    var orderedArr = [];
    while(scoresArr.length > 0){
        let topID = 0;
        for(let i = 0; i < scoresArr.length; i++){
            if(scoresArr[i].score > scoresArr[topID].score){
                topID = i;
            }
        }
        orderedArr.push(scoresArr[topID]);
        scoresArr.splice(topID, 1);
    }
    localStorage.scores = JSON.stringify(orderedArr);
}

function clearHighscores(){
    localStorage.scores = JSON.stringify([]);
    init();
}

init();

//button handler
mainEl.addEventListener("click", function(event){
    var element = event.target;
    if(element.matches("#home-button")){
        location.replace("index.html");
    }
    if(element.matches("#clear-button")){
        clearHighscores();
    }
});