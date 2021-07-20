import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createArrow } from './components/arrow.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { Game} from './components/Game.js';
import { fetchPointsPath, fetchDisplayPath } from './components/path.js';
import { createAirPlane, setupManoeuvre } from './components/airplane.js';
import { createRing, createRingsArray } from './components/ring.js';
import { SceneKeeper } from './systems/SceneKeeper.js';
import { createAxesHelper } from './components/axesHelper.js';
import { createGridHelper } from './components/GridHelper.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
// import { FSM } from './systems/FSM.js';
import { Plane } from 'three';

// These variables are module-scoped: we cannot access them
// from outside the module

// THREEJS RELATED VARIABLES
let camera;
let renderer;
let scene;
let loop;
let resizer;
let sceneKeeper;


// GAME VARIABLES
let game;
let airPlane;
//let pointsPath;
//et displayPath;

//let prevAirPlane;
//let prevPointsPath;
//let prevDisplayPath;
// let ring;

function setupWorld(container) {

    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();

    container.append(renderer.domElement);
    resizer = new Resizer(container, camera, renderer);
    //Set rendering of the scenes @~60fps (or ~ every 16.67ms)
    loop = new Loop(camera, scene, renderer);

    //Initial scene settings
    const controls = createControls(camera, renderer.domElement);
    const axesHelper = createAxesHelper();
    const gridHelper = createGridHelper();
    const light = createLights();

    scene.add(axesHelper);
    scene.add(gridHelper);
    scene.add(light);

    //Game elements (Resuable)
    // createAllPaths();
    airPlane = createAirPlane();
    scene.add(airPlane);
    //scene.add(fetchDisplayPath(1));

}

function start() {
    game = new Game(loop);
    loop.start(game);
    game.startGame();
}

// Handles the player move
function triggerShape(shape) {
    console.log("Waiting for trigger");
    if (game.getState() !== 'waiting-for-move') {
        return;
    }
    //When 'waiting-for-move', process player move
    game.makeMove(shape);
}


function stop() {
    game.stopGame();
}


export default{setupWorld, triggerShape, start, stop, scene, airPlane};



/*
function startGame() {
    //Initialize the Game variables
    // game.state = "starting";
    resetGame();
    loop.start(game);
    setupPuzzle(1);
    game.state = "waiting-for-move";
}

function moveGameForward() {

    console.log("Moving Game Forward");
    // loop.updatables.pop();
    //temporarily using this code below 3 lines. To be changed very soon.
    resetGame();
    //setupPuzzle(0);
    game.state = "waiting-for-move";

}



function stopGame() {
    //Initialize the Game variables
    game.state = "game-over";
    loop.stop();
}

//Not used here anymore
function render() {
    // draw a single frame
    renderer.render(scene, camera);
}


*/


 /*
        waitforMove();
        function waitforMove() {
            if (game.getState !== "move-over"){
                setTimeout(waitforMove, 50); //50 msc waith and then check
            }
        }
        */
        // loop.updatables.pop();


// export default {World};

// export interface
// export default {    World, triggerShape, setup, load,};
