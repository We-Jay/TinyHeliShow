
import { createHeliCopter, setupManoeuvre } from './helicopter.js';
import { fetchCurvePath, fetchFullCurvePath } from './path.js';
import { createRing, createRingsArray } from './ring.js';
import { SceneKeeper } from '../systems/SceneKeeper.js';
import * as GUI from "./gui.js";
import { sounds } from "../../store.js";
import * as SM from "../../soundManager.js";
import { SmoothShading } from 'three';

const gestureMAP = {
    GLOBE: "◯",
    FORTRESS: "▢",
    TREE: "△",
    PETALS: "α",
    RAINBOW: "β",
    TORNADO: "γ",
}

let heliCopter;
let scene;
//for performance testing
let startMoveTime;
let endMoveTime;

class Game {

    constructor(loop, worldHeli, worldScene) {
        heliCopter = worldHeli;
        scene = worldScene;

        this.level = 1;
        this.points = 0;
        this.attempt = 1;
        this.mistakes = 0;
        this.levelChanged = false;
        this.finished = false;
        this.puzzle = "UNKNOWN";
        this.currentMove = "USERSAYS";
        this.gestureSet = "GFT"
        this.state = "STARTING";
        this.loop = loop;
        this.sceneKeeper = new SceneKeeper();
        this.replayMessage = " ";

    }

    setState(state) {
        switch (state) {
            case "STARTING":
                this.state = "STARTING";
                break;
            case "WAITING-FOR-MOVE":
                this.state = "WAITING-FOR-MOVE";
                break;
            case "MAKING-MOVE":
                this.state = "MAKING-MOVE";
                startMoveTime = performance.now();
                break;
            case "MOVE-OVER":
                this.state = "MOVE-OVER";
                endMoveTime = performance.now()
                console.log(this.currentMove, "| Time Taken:", endMoveTime - startMoveTime);

                //startGame(); //Change to NextGameStep()
                this.handlePostMove();
                break;
            case "GAME-OVER":
                this.state = "GAME-OVER";
                break;
        }
    }

    getState(state) {
        return this.state;
    }

    //Call it as soon as you decide on the puzzle type "GFT" or "PRT"
    setPuzzleType(puzzleNo) {
        if (this.gestureSet === "GFT") {
            switch (puzzleNo) {
                case 1: { this.puzzle = "GLOBE"; break; }
                case 2: { this.puzzle = "FORTRESS"; break; }
                case 3: { this.puzzle = "TREE"; break; }
                default: console.log("Unknown GFT Move");
            }

        }
        else if (this.gestureSet === "PRT") {
            switch (puzzleNo) {
                case 1: { this.puzzle = "PETALS"; break; }
                case 2: { this.puzzle = "RAINBOW"; break; }
                case 3: { this.puzzle = "TORNADO"; break; }
                default: console.log("Unknown PRT Move");
            }
        }
        else {
            console.log("Setting Puzzle Type, Unknown Gesture Set!")
        }
        console.log("Set Puzzle:", this.puzzle);
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

    updateGUI() {

        GUI.setLevel(this.level);
        GUI.setPoints(this.points);
        GUI.setMistakesBar(this.mistakes);
        GUI.setReplayMessage(this.replayMessage);
        GUI.setStatusInfo(this.getState());
        console.log("Updated GUI");

    }

    startGame() {
        //Initialize the Game variables
        this.setupPuzzle(1);
        this.setState('WAITING-FOR-MOVE');
        if (this.gestureSet === "GFT") {
            this.replayMessage = "Solve the Puzzle: GLOBE ◯, FORTRESS □, TREE △"
        }
        else if (this.gestureSet === "PRT") {
            this.replayMessage = "Solve the Puzzle: PETALS α, RAINBOW β, TORNADO γ"
        }
        this.updateGUI();
    }

    resetGame() {
        // Implement if functionality to reset the game is required
    }

    stopGame() {
        //Implement if a stopGame rountine is required
    }

    //Set a random ring puzzle at a particular level depending upon gesture set
    setupPuzzle(level) {
        //Choose a random path out of all possible manoeuvre configurations 
        const pathType = Math.floor(Math.random() * 3) + 1; //Random number between 1 and 3
        this.setPuzzleType(pathType);
        let curvePath = fetchCurvePath(this.gestureSet, this.puzzle);

        // Create an array of rings on the puzzle path 
        // (dependnig upon difficulty level)
        let noOfRings;
        switch (level) {
            case 1:
                noOfRings = 12;
                break;
            case 2:
                noOfRings = 8;
                break;
            case 3:
                noOfRings = 4;
                break;
        }

        const ringsArray = createRingsArray(curvePath, noOfRings);
        for (let i = 0; i < ringsArray.length; i++) {
            scene.add(ringsArray[i]);
            this.sceneKeeper.add(ringsArray[i]);
            // loop.updatables.push(ringsArray[i]);
        }

        // console.log("Puzzle set Game State: ", this.state);
    }

    //Once the Puzzle is set, and the player input is received make the move
    makeMove(shape, sounds) {

        if (this.gestureSet === "GFT") {
            this.makeMoveGFT(shape, sounds);
        }
        else if (this.gestureSet === "PRT") {
            this.makeMovePRT(shape, sounds);
        }
    }


    //Move execution for Shapes Globe, Fortress and Tree
    makeMoveGFT(shape, sounds) {
        if (!(shape === "circle" || shape === "square" || shape === "triangle")) {
            console.log("Invalid GFT Move!", shape)
            return;
        }

        //Play specific Heli sound
        SM.userInit();
        SM.playSound(
            sounds[shape].url,
            127,
            0.9
        );

        //Make specific manoeuvre
        this.setState("MAKING-MOVE");
        let curvePath;
        let displayPath;
        switch (shape) {
            case "circle":
                curvePath = fetchFullCurvePath("GFT", "GLOBE");
                this.currentMove = "GLOBE"
                console.log("GLOBE");
                break;
            case "square":
                curvePath = fetchFullCurvePath("GFT", "FORTRESS");
                this.currentMove = "FORTRESS";
                console.log("FORTRESS");
                break;
            case "triangle":
                curvePath = fetchFullCurvePath("GFT", "TREE");
                this.currentMove = "TREE";
                console.log("TREE");
                break;

        }

        this.replayMessage = "Your Move:" + " " + this.currentMove + " " + gestureMAP[this.currentMove];
        this.updateGUI();
        //flytoMove
        setupManoeuvre(this, scene, this.sceneKeeper, curvePath);

        //execute manoeuvre with clock-tick
        this.loop.updatables.push(heliCopter);
    }

    //Move execution for Shapes Petals, Rainbow, and Tornado
    makeMovePRT(shape, sounds) {
        if (!(shape === "alpha" || shape === "beta" || shape === "gamma")) {
            console.log("Invalid PRT Move!")
            return;
        }

        //Play specific Heli sound
        SM.userInit();
        SM.playSound(
            sounds[shape].url,
            127,
            0.9
        );

        //Make manoeuvre
        this.setState("MAKING-MOVE");
        let curvePath;
        let displayPath;
        switch (shape) {

            case "alpha":
                curvePath = fetchFullCurvePath("PRT", "PETALS");
                this.currentMove = "PETALS"
                console.log("PETALS");
                break;
            case "beta":
                curvePath = fetchFullCurvePath("PRT", "RAINBOW");
                this.currentMove = "RAINBOW";
                console.log("RAINBOW");
                break;
            case "gamma":
                curvePath = fetchFullCurvePath("PRT", "TORNADO");
                this.currentMove = "TORNADO";
                console.log("TORNADO");
                break;
        }
        // console.log("Reached upto monoeuvre");
        this.replayMessage = "Your Move:" + this.currentMove + " " + gestureMAP[this.currentMove];
        this.updateGUI();
       
        setupManoeuvre(this, scene, this.sceneKeeper, curvePath);
        //execute manoeuvre with clock-tick
        this.loop.updatables.push(heliCopter);
    }


    // Once a move is made by the player and it is executed, 
    // handle the consequences and the next steps in Game
    handlePostMove() {
        //Stop plane movement
        this.loop.updatables.pop();

        //if successfull move
        console.log("CurrentMove:", this.currentMove, ",CurrentPuzzle", this.puzzle);
        if (this.currentMove == this.puzzle) {
            this.updateScore();
            this.updateLevel();
            if (this.finished) {
                this.replayMessage = "Congratulations! You Are Now A Tiny-Heli Master!";
                this.setState("GAME-OVER");

                this.sceneKeeper.removeAll(scene);
                this.updateGUI();
                console.log(this.replayMessage, "Level-Score;", this.level, "-", this.points);
            }
            else {
                if (this.levelChanged) {
                    if (this.gestureSet === "GFT") {
                        this.replayMessage = "Congrats! Try Next Level Puzzle: GLOBE ◯, FORTRESS ▢, TREE △";
                    }
                    else if (this.gestureSet === "PRT") {
                        this.replayMessage = "Congrats! Try Next Level Puzzle: PETALS α, RAINBOW β, TORNADO γ";
                    }

                    this.sceneKeeper.removeAll(scene);
                    this.updateGUI();

                    console.log(this.replayMessage, "Level-Score;", this.level, "-", this.points);
                    this.levelChanged = false;
                    this.setupPuzzle(this.level);
                    this.setState("WAITING-FOR-MOVE");
                    this.updateGUI();


                } else {

                    if (this.gestureSet === "GFT") {
                        this.replayMessage = "Congrats! Try Next Puzzle: GLOBE ◯, FORTRESS ▢, TREE △";
                    }
                    else if (this.gestureSet === "PRT") {
                        this.replayMessage = "Congrats! Try Next Puzzle: PETALS α, RAINBOW β, TORNADO  γ";
                    }


                    this.sceneKeeper.removeAll(scene);
                    this.updateGUI();

                    console.log(this.replayMessage, "Level-Score;", this.level, "-", this.points);
                    this.setupPuzzle(this.level);
                    this.setState("WAITING-FOR-MOVE");
                    this.updateGUI();
                }

            }

        } else {
            this.mistakes += 1;
            if (this.mistakes > 3) {
                this.replayMessage = "Sorry, Too Many Mistakes!";
                console.log(this.replayMessage, "Level-Score;", this.level, "-", this.points);
                this.setState("GAME-OVER")

                this.sceneKeeper.removeAll(scene);

                this.updateGUI();
            }
            else {
                if (this.gestureSet === "GFT") {
                    this.replayMessage = "Sorry, Wrong Move: Try Again: GLOBE ◯, FORTRESS ▢, TREE △";
                }
                else if (this.gestureSet === "PRT") {
                    this.replayMessage = "Sorry, Wrong Move! Try Again: PETALS α, RAINBOW β, TORNADO γ"

                }


                this.sceneKeeper.removeLast(scene);

                this.updateGUI();
                console.log(this.replayMessage, "Level-Score;", this.level, "-", this.points);
                this.setState("WAITING-FOR-MOVE", "Level-Score;", this.level, "-", this.points);
                this.updateGUI();

            }

        }

    }

}


export { Game };