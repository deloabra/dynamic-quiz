var timer = document.querySelector("#timer");

var time = 61;

setInterval(function(){
    timer.textContent = "time: " + --time;
}, 1000);