import { createCamera } from './components/camera.js';
import { createCube, createMarkerCubes } from './components/cube.js';
import { createLights, createLights2 } from './components/lights.js';
import { createScene } from './components/scene.js';
import { Game } from './components/Game.js';
import { fetchCurvePath, createDisplayPath } from './components/path.js';
import { createHeliCopter, setupManoeuvre } from './components/helicopter.js';
import { createPlatformRing, createRing, createRingsArray } from './components/ring.js';
import { SceneKeeper } from './systems/SceneKeeper.js';
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

// THREEJS RELATED VARIABLES
let camera;
let renderer;
let scene = createScene();
let loop;
let resizer;
let sceneKeeper;


// GAME VARIABLES
let game;
let heliCopter;


function setupWorld(container, fLevel, fPoints, bMistakes, mReplay, iStatus) {

    camera = createCamera();
    //scene = createScene();
    renderer = createRenderer();

    container.append(renderer.domElement);
    //NewAdd
    setupGUI(fLevel, fPoints, bMistakes, mReplay, iStatus);

    resizer = new Resizer(container, camera, renderer);
    //Set rendering of the scenes @~60fps (or ~ every 16.67ms)
    loop = new Loop(camera, scene, renderer);

    //Initial scene settings
    const controls = createControls(camera, renderer.domElement);
    const axesHelper = createAxesHelper();
    const gridHelper = createGridHelper();
    const light = createLights();
    const light2 = createLights2();

    scene.add(axesHelper);
    //scene.add(gridHelper);
    scene.add(light);
    scene.add(light2);

    //Experimental add
    const geometry = new THREE.CircleGeometry(10.4, 32);
    /*
    const geometry = new THREE.CylinderGeometry(10.4, 10.4, .2, 32);
    const texture = new THREE.TextureLoader().load('grass.jpg');
    const material = new THREE.MeshBasicMaterial({
        color: 0xFF8844,
        map: texture,
        side: THREE.DoubleSide,
    });
    */

    const material = new THREE.MeshBasicMaterial({ color: 0x040414, side: THREE.DoubleSide });

    const platformPlane = new THREE.Mesh(geometry, material);
    platformPlane.translateY(-.2);
    platformPlane.rotateX(Math.PI / 2);
    platformPlane.receiveShadow = true;
    scene.add(platformPlane);

    const platformRing = createPlatformRing();
    scene.add(platformRing);

    const directionCubes = createMarkerCubes();
    for (let i = 0, l = directionCubes.length; i < l; i++) {
        scene.add(directionCubes[i]);
        //console.log("Added", i);
    }



    /*
    let displayPath = createDisplayPath(fetchCurvePath("GFT", "TREE"));
    scene.add(displayPath);


    //Create a closed wavey loop
const curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 5, 5 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 5, -5, 5 ),
	new THREE.Vector3( 10, 0, 10 )
] );

const pointsC = curve.getPoints( 50 );
const geometryC = new THREE.BufferGeometry().setFromPoints( pointsC );

const materialC = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometryC, materialC );

scene.add(curveObject);

*/

    /*
    //temp add
    const loader = new THREE.FontLoader();

    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        const geometry = new THREE.TextGeometry( 'Hello Heli Master!', {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } );
        geometry.center();
        var material = new THREE.MeshNormalMaterial();
        var mesh = new THREE.Mesh( geometry, material );
        scene.add(mesh);
    } );

    */






    //Game elements (Resuable)
    // createAllPaths();
    heliCopter = createHeliCopter(loop);
    scene.add(heliCopter);
    //scene.add(fetchDisplayPath(1));

}

function start() {
    game = new Game(loop);
    loop.start(game);   
    //game.startGame(); //Start the game after first valide gesture
}

// Handles the player move
function triggerShape(shape) {

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
    game.makeMove(shape);
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

