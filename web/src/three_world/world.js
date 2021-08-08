import { createCamera } from './components/camera.js';
import { createMarkerDrums } from './components/drum.js';
import { createLights, createLights2 } from './components/lights.js';
import { createScene } from './components/scene.js';
import { Game } from './components/Game.js';
import { fetchCurvePath, createDisplayPath } from './components/path.js';
import { createHeliCopter, setupManoeuvre } from './components/helicopter.js';
import { createPlatformRing, createRing, createRingsArray } from './components/ring.js';
import { createAxesHelper } from './components/axesHelper.js';
import { createGridHelper } from './components/GridHelper.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import * as THREE from 'three';
//NewAdd
import { setupGUI } from './components/gui.js';

// These variables are module-scoped: we cannot access them
// from outside the module

// THREEJS related variables
let camera;
let renderer;
let scene; 
let loop;
let resizer;

// GAME VARIABLES
let game;
let heliCopter;

function setupWorld(container, fLevel, fPoints, bMistakes, mReplay, iStatus) {

    scene = createScene();
    camera = createCamera();
    renderer = createRenderer();
    container.append(renderer.domElement);

    setupGUI(fLevel, fPoints, bMistakes, mReplay, iStatus);

    resizer = new Resizer(container, camera, renderer);
    //Set rendering of the scenes @~60fps (or ~ every 16.67ms)
    loop = new Loop(camera, scene, renderer);

    //Initial scene settings
    const controls = createControls(camera, renderer.domElement);
    const axesHelper = createAxesHelper();
    //const gridHelper = createGridHelper();
    const light = createLights();
    const light2 = createLights2();

    scene.add(axesHelper);
    //scene.add(gridHelper);
    scene.add(light);
    scene.add(light2);

    //Platform - Round base + Perimeter Ring + direction markers
    //2D
    const geometry = new THREE.CircleGeometry(10.4, 32);
    /*
    //3D
    const geometry = new THREE.CylinderGeometry(10.4, 10.4, .2, 32);
    const texture = new THREE.TextureLoader().load('grass.jpg');
    const material = new THREE.MeshBasicMaterial({
        color: 0xFF8844,
        map: texture,
        side: THREE.DoubleSide,
    });
    */
    const material = new THREE.MeshBasicMaterial({ color: 0x040414, side: THREE.DoubleSide });
    //const material = new THREE.MeshBasicMaterial({ color:  0x111153, side: THREE.DoubleSide });

   
    const platformPlane = new THREE.Mesh(geometry, material);
    platformPlane.translateY(-.2);
    platformPlane.rotateX(Math.PI / 2);
    platformPlane.receiveShadow = true;
    scene.add(platformPlane);

    const platformRing = createPlatformRing();
    scene.add(platformRing);

    const directionDrums = createMarkerDrums();
    for (let i = 0, l = directionDrums.length; i < l; i++) {
        scene.add(directionDrums[i]);
    }

    /* Quick aid to display and debug paths
    let displayPath = createDisplayPath(fetchCurvePath("GFT", "TREE"));
    scene.add(displayPath);
    */


    //Game elements (Permanent)
    heliCopter = createHeliCopter(loop);
    scene.add(heliCopter);
   

}

function start() {
    game = new Game(loop, heliCopter, scene);
    loop.start(game);   
}

// Handles the player move
function triggerShape(shape, sounds) {

    console.log("Waiting for right trigger");

    //Use first gesture to setup the Gesture Set in the Game.
    if (game.getState() === 'STARTING') {

        if (shape === "circle" || shape === "square" ||  shape === "triangle"){
            game.gestureSet = "GFT";
            game.startGame();
            return;
        }
        else if (shape === "alpha" || shape === "beta" ||  shape === "gamma") {
            game.gestureSet = "PRT";
            game.startGame();
            return;
        }
        else {
            console.log ("Unknown Gesture. Check Tiny-Heli!");
            return;
        }
    }

    if (game.getState() !== 'WAITING-FOR-MOVE') {
        return;
    }
    //When 'waiting-for-move', process player move
    game.makeMove(shape, sounds);
}


function stop() {
    game.stopGame();
}


//Comment #if(myfirstjs)
//Uncomment #if(tinyhelishow)
export default {setupWorld, triggerShape, start, stop};
export {scene, heliCopter};

//Uncomment #if(myfirstjs)
//Comment #if(tinyhelishow)
// export { setupWorld, triggerShape, start, stop, scene, heliCopter };

