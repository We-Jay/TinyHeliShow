import { scene, airPlane } from "../world.js";
import { createAirPlane, setupManoeuvre } from './airplane.js';
import { fetchPointsPath, fetchDisplayPath } from './path.js';
import { createRing, createRingsArray } from './ring.js';
import { SceneKeeper } from '../systems/SceneKeeper.js';
import * as GUI from "./gui.js";

class Game {
    constructor(loop) {
        this.level = 1;
        this.points = 0;
        this.attempt = 1;
        this.mistakes = 0;
        this.levelChanged = false;
        this.finished = false;
        this.puzzle = "UNKNOWN";
        this.currentMove = "USERSAYS";
        //State tracking
        this.state = "starting";
        //this.fsm = new FSM(loop);
        this.loop = loop;
        this.sceneKeeper = new SceneKeeper();
        this.replayMessage = "Make Manoeuvre: Globe:O, Fortress:[], Tornado: &#92\/ !"
    }


    //Call this when there is a successful move
    updateScore() {
        if (this.level == 1) {
            console.log("Updated Score", this.level);
            switch (this.attempt) {
                case 1: { this.points += 100; break; }
                case 2: { this.points += 50; break; }
                case 3: { this.points += 25; break; }
                default: console.log("Error in allowed attempts.");
            }
        } else if (this.level == 2) {
            console.log("Updated Score", this.level);
            switch (this.attempt) {        
                case 1: { this.points += 200; break; }
                case 2: { this.points += 100; break; }
                case 3: { this.points += 50; break; }
                default: console.log("Error in allowed attempts.");
            }
        } else if (this.level == 3) {
            console.log("Updated Score", this.level);
            switch (this.attempt) {
                case 1: { this.points += 300; break; }
                case 2: { this.points += 200; break; }
                case 3: { this.points += 100; break; }
                default: console.log("Error in allowed attempts.");
            }
        }
    }

    //Call it after updating score
    updateLevel() {
        if (this.level == 1 && this.points >= 225) {
            this.level = 2;
            this.levelChanged = true;
            this.mistakes = 0; //Reset
            this.attempt = 1;
        }
        else if (this.level == 2 && this.points >= 675) {
            this.level = 3;
            this.levelChanged = true;
            this.mistakes = 0;
            this.attempt = 1;
        }
        else if (this.level == 3 && this.points >= 1375) {
            this.finished = true;
        }
    }

    //Call it as soon as you decide on the puzzle type
    setPuzzleType(puzzleNo) {
        switch (puzzleNo) {
            case 1: { this.puzzle = "GLOBE"; break; }
            case 2: { this.puzzle = "FORTRESS"; break; }
            case 3: { this.puzzle = "TORNADO"; break; }
        }
    }

    setState(state) {
        switch (state) {
            case "starting":
                this.state = "starting";
                break;
            case "waiting-for-move":
                this.state = "waiting-for-move";
                break;
            case "making-move":
                this.state = "making-move";
                break;
            case "move-over":
                this.state = "move-over";
                //startGame(); //Change to NextGameStep()
                this.handlePostMove();
                break;
        }
    }

    getState(state) {
        return this.state;
    }

    handlePostMove() {
        //Stop plane movement
        this.loop.updatables.pop();
        //Clear the scene
        this.sceneKeeper.removeAll(scene);

        //if successfull move
        console.log("CurrentMove:", this.currentMove, ",CurrentPuzzle", this.puzzle);
        if (this.currentMove == this.puzzle) {
            this.updateScore();
            this.updateLevel();
            if (this.finished) {
                this.replayMessage = "Congrat! You are now a TinyHeli-Master!";
                this.updateGUI();
                console.log(this.replayMessage, "Level-Score;", this.level,"-", this.points);
            }
            else {
                if (this.levelChanged) {
                    this.replayMessage = "Congrats! Try Next Level Puzzle!";
                    this.updateGUI();
                    console.log(this.replayMessage, "Level-Score;", this.level,"-", this.points);
                    this.levelChanged = false;
                    this.setupPuzzle(this.level);
                    this.setState("waiting-for-move");

                } else {
                    this.replayMessage = "Congrats! Try Next Puzzle!";
                    this.updateGUI();
                    console.log(this.replayMessage, "Level-Score;", this.level,"-", this.points);
                    this.setupPuzzle(this.level);
                    this.setState("waiting-for-move");
                }

            }

        } else {
            this.mistakes += 1;
            if (this.mistakes > 3) {
                this.replayMessage = "Sorry, Game Over!";
                console.log(this.replayMessage, "Level-Score;", this.level,"-", this.points);
                this.updateGUI();
            }
            else {
                this.replayMessage = "Sorry, Wrong move: Try Again!"
                this.updateGUI();
                console.log(this.replayMessage, "Level-Score;", this.level,"-", this.points);
                this.setupPuzzle(this.level);
                this.setState ("waiting-for-move", "Level-Score;", this.level,"-", this.points);

            }

        }


        //check move, success or failure
        //if success: update score, update level, 

    }


    resetGame() {
        this.level = 1;
        this.points = 0;
        this.attempt = 1;
        this.mistakes = 0;
        this.finished = false;
        this.puzzle = "UNKNOWN";
        this.state = "starting";
    }

    startGame() {
        //Initialize the Game variables
        // resetGame();
        this.setupPuzzle(1);
        this.setState('waiting-for-move');
        this.updateGUI();
    }

    startLevel(levelNo) {
        this.setupPuzzle(levelNo);
        this.setState('waiting-for-move');
    }

    stopGame() { }


    moveGameForward() {

        console.log("Moving Game Forward");
        // loop.updatables.pop();
        //temporarily using this code below 3 lines. To be changed very soon.
        this.resetGame();
        //setupPuzzle(0);
        this.state = "waiting-for-move";


    }

    setupPuzzle(level) {
        //Choose a random path out of all possible manoeuvre configurations 
        const pathType = Math.floor(Math.random() * 3) + 1; //Random number between 1 and 3
        this.setPuzzleType(pathType);
        let pointsPath = fetchPointsPath(pathType);
        let displayPath = fetchDisplayPath(pathType);

        //(Optional) Display puzzle path
        //scene.add(displayPath);
        //this.sceneKeeper.add(displayPath);

        // Create an array of rings on the puzzle path 
        // (dependnig upon difficulty level)
        let noOfRings;
        switch (level) {
            case 1:
                noOfRings = 10;
                break;
            case 2:
                noOfRings = 7;
                break;
            case 3:
                noOfRings = 3;
                break;
        }

        const ringsArray = createRingsArray(pointsPath, noOfRings);
        for (let i = 0; i < ringsArray.length; i++) {
            scene.add(ringsArray[i]);
            this.sceneKeeper.add(ringsArray[i]);
            // loop.updatables.push(ringsArray[i]);
        }

        // console.log("Puzzle set Game State: ", this.state);
    }

    makeMove(shape) {
        this.setState("making-move");
        let pointsPath;
        let displayPath;
        switch (shape) {
            case "circle":
                pointsPath = fetchPointsPath(1);
                displayPath = fetchDisplayPath(1);
                this.currentMove = "GLOBE"
                console.log("GLOBE");
                break;
            case "square":
                pointsPath = fetchPointsPath(2);
                displayPath = fetchDisplayPath(2);
                this.currentMove = "FORTRESS";
                console.log("FORTRESS");
                break;
            case "triangle":
                pointsPath = fetchPointsPath(3);
                displayPath = fetchDisplayPath(3);
                this.currentMove = "TORNADO";
                console.log("TORNADO");
                break;

            /*
                case "reset":
                game.state = "reseting";
                startGame();
                break;
            case "abort":
                game.state = "aborting";
                stopGame();
                break;
            default:
               pointsPath = fetchPointsPath1(...);
            */
        }
        // console.log("Reached upto monoeuvre");
        this.replayMessage = "Move:" + this.currentMove;
        this.updateGUI();
        setupManoeuvre(this, pointsPath);
        scene.add(displayPath);
        this.sceneKeeper.add(displayPath);
        //execute manoeuvre with clock-tick
        this.loop.updatables.push(airPlane);
    }

    updateGUI() {

        GUI.setLevel(this.level);
        GUI.setPoints(this.points);
        GUI.setMistakesBar(this.mistakes);
        GUI.setReplayMessage(this.replayMessage);
        GUI.setStatusInfo(this.getState());
        console.log("Updated GUI");

    }


}


export { Game };