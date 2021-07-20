//GUI

let fieldLevel = document.getElementById("levelValue");
let levelCircle = document.getElementById("levelCircleStroke");
let fieldPoints = document.getElementById("pointsValue");
let mistakesBar = document.getElementById("mistakesBar");

let replayMessage = document.getElementById("replayMessage");
let statusInfo    = document.getElementById("info");

function setLevel(level){
    fieldLevel.innerHTML = level;
    let d;
    switch (level){
        case 1: {(points <=225) ? d = 502 * (1 - points/225 ) : d = 0; break;}
        case 2: {(points <=450) ? d = 502 * (1 - points/450 ) : d = 0; break;}
        case 3: {(points <=700) ? d = 502 * (1 - points/700 ) : d = 0; break;}
    }
    levelCircle.setAttribute("stroke-dashoffset", d);
    console.log("setLevel", fieldLevel.innerHTML);

}

function setPoints(points) {
    fieldPoints.innerHTML = points;
    console.log("setPoints", fieldPoints.innerHTML);
}

function setMistakesBar(mistakes){
    mistakesBar.style.right = (100 - (mistakes/3)*100) + "%";
    mistakesBar.style.backgroundColor =  "#f25346"; // : "#68c3c0";
    //mistakesBar.style.animationName = "blinking";
    console.log("setMistakes", mistakesBar.style.right);

}

function setReplayMessage (userMessage){
    replayMessage.innerHTML = userMessage;
    replayMessage.style.display = "block";
    console.log("setReplayMessage", replayMessage.innerHTML);

}
function setStatusInfo(gameStatus){
    statusInfo.innerHTML = "Game Status: " + gameStatus;
    console.log("setStatusInfo", statusInfo.innerHTML);
}

export{setLevel, setPoints, setMistakesBar, setReplayMessage, setStatusInfo};



