import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createArrow } from './components/arrow.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createPointsPath1, createPointsPath2, createPointsPath3, createPath } from './components/path.js';
import { createAirPlane } from './components/airplane.js';
import { createAxesHelper } from './components/axesHelper.js';
import { createGridHelper } from './components/GridHelper.js';


import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;
let resizer;
let pointsPath;
let path;
let airPlane;
let prevAirPlane;
let prevPath;


function setupWorld(container) {

    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();

    loop = new Loop(camera, scene, renderer);

    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);
    const axesHelper = createAxesHelper();
    const gridHelper = createGridHelper();
    const light = createLights();

    scene.add(axesHelper);
    scene.add(gridHelper);
    scene.add(light);

    // Default airplan and path scene config
    pointsPath = createPointsPath1();
    path = createPath(pointsPath);
    airPlane = createAirPlane(pointsPath);
    prevAirPlane = airPlane;
    prevPath = path;
    scene.add(airPlane, path);

    const resizer = new Resizer(container, camera, renderer);
}

function render() {
    // draw a single frame
    renderer.render(scene, camera);
}


function triggerShape(shape) {
    switch (shape) {
        case "circle":
            pointsPath = createPointsPath1();
            break;
        case "triangle":
            pointsPath = createPointsPath2();
            break;
        case "square":
            pointsPath = createPointsPath3();
        // default:
         //   pointsPath = createPointsPath1();
    }

    // Cleaning out previous move
    loop.updatables.pop();
    if (prevAirPlane != null) {
        scene.remove(prevAirPlane);
    }
    else {
        console.log('Null Plane');
    }
    if (prevPath != null) {
        scene.remove(prevPath);
    }
    else {
        console.log('Null Path');
    }

    // Operate on current state
    path = createPath(pointsPath);
    airPlane = createAirPlane(pointsPath);
    scene.add(airPlane, path);
    loop.updatables.push(airPlane);

    prevAirPlane = airPlane;
    prevPath = path;

}

function start() {
    loop.start();
}

function stop() {
    loop.stop();
}







// export default {World};
export default { setupWorld, triggerShape, start, stop };
// export interface
// export default {    World, triggerShape, setup, load,};
