//Game GUI Updation Module

let fieldLevel; 
let levelCircle; 
let fieldPoints; 
let mistakesBar; 

let replayMessage;
let statusInfo; 

function setLevel(level) {
    fieldLevel.innerHTML = level;
}

//NewAdd
function setupGUI(fLevel, fPoints, bMistakes, mReplay, iStatus) {

    fieldLevel = fLevel;
    fieldPoints = fPoints;
    mistakesBar = bMistakes;
    replayMessage = mReplay;
    statusInfo = iStatus;

}

function setPoints(points) {
    fieldPoints.innerHTML = points;
    //console.log("setPoints", fieldPoints.innerHTML);
}

function setMistakesBar(mistakes) {
    mistakesBar.style.right = (100 - (mistakes / 3) * 100) + "%";
    mistakesBar.style.backgroundColor = "#f25346"; 
    //console.log("setMistakes", mistakesBar.style.right);

}

function setReplayMessage(userMessage) {
    replayMessage.innerHTML = userMessage;
    replayMessage.style.display = "block";
    //console.log("setReplayMessage", replayMessage.innerHTML);

}
function setStatusInfo(gameStatus) {
    //statusInfo.innerHTML = "Game Status: " + gameStatus;
    statusInfo.innerHTML = gameStatus;
    console.log("setStatusInfo", statusInfo.innerHTML);
}


export { setupGUI, setLevel, setPoints, setMistakesBar, setReplayMessage, setStatusInfo };



