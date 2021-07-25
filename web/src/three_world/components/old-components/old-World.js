import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createArrow } from './components/arrow.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createPointsPath1,createPointsPath2, createPointsPath3, createPath } from './components/path.js';
import { createAirPlane } from './components/airplane.js';
import { createAxesHelper} from './components/axesHelper.js';
import { createGridHelper} from './components/GridHelper.js';


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


class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        

        loop = new Loop(camera, scene, renderer);

        container.append(renderer.domElement);

        const controls = createControls(camera,renderer.domElement );
        const axesHelper = createAxesHelper();
        const gridHelper = createGridHelper();
        const cube = createCube();

        const light = createLights();
        scene.add(axesHelper);
        scene.add( gridHelper );


        
        // const pointsPath = createPointsPath3();
        // const path = createPath(pointsPath);
       //  const arrow = createArrow(pointsPath);
    // const airPlane = createAirPlane(pointsPath);

        
       

        //loop.updatables.push(cube);
        // loop.updatables.push(airPlane);
        //scene.add(arrow, path, light);
        // scene.add(airPlane, path, light)
        // scene.add(airPlane, light)
        scene.add(light)
        const resizer = new Resizer(container, camera, renderer);

        //Since we now have animating look, 1/60 sec interval, we do not require rendering on resizing, it will happen automatically 
        //resizer.onResize = () => {
        //    this.render(); //Hook: Here we are passing world reference and filling the code in Resizer call onRise()
        // };
    }



    render() {
        // draw a single frame
        renderer.render(scene, camera);
    }

    start() {

        document.addEventListener("keydown", onDocumentKeyDown, false);

        var prevAirPlane = null;
        var prevPath = null;
        function onDocumentKeyDown(event) { 

           
            
            var keyCode = event.which;
            if (keyCode == 65) {
                console.log("Alpha");
                
                if (prevAirPlane != null){     
                    scene.remove(prevAirPlane);
                } 
                else {
                    console.log('Null Plane');    
                }
                if (prevPath != null){
                    scene.remove(prevPath);
                }
                else {
                    console.log('Null Path');  
                }
                
                var pointsPath = createPointsPath1();
                var path = createPath(pointsPath);
                var airPlane = createAirPlane(pointsPath);
                scene.add(airPlane, path);

                prevAirPlane = airPlane;
                prevPath = path;                

                loop.updatables.pop();
                loop.updatables.push(airPlane);
                // document.removeEventListener("keydown", onDocumentKeyDown);

            } 
            else if (keyCode == 66) {
                console.log("Beta");
                
                if (prevAirPlane != null){     
                    scene.remove(prevAirPlane);
                } 
                else {
                    console.log('Null Plane');    
                }
                if (prevPath != null){
                    scene.remove(prevPath);
                }
                else {
                    console.log('Null Path');  
                }

                var pointsPath = createPointsPath2();
                var path = createPath(pointsPath);
                var airPlane = createAirPlane(pointsPath);
                scene.add(airPlane, path);
                
                prevAirPlane = airPlane;
                prevPath = path;  
                
                loop.updatables.pop();
                loop.updatables.push(airPlane);
                // document.removeEventListener("keydown", onDocumentKeyDown);
            }
            else if (keyCode == 71) {
                console.log("Gamma");
                
                if (prevAirPlane != null){     
                    scene.remove(prevAirPlane);
                } 
                else {
                    console.log('Null Plane');    
                }
                if (prevPath != null){
                    scene.remove(prevPath);
                }
                else {
                    console.log('Null Path');  
                }
                
                var pointsPath = createPointsPath3();
                var path = createPath(pointsPath);
                var airPlane = createAirPlane(pointsPath);
                scene.add(airPlane, path);
                
                prevAirPlane = airPlane;
                prevPath = path;  
                
                loop.updatables.pop();
                loop.updatables.push(airPlane);
                // document.removeEventListener("keydown", onDocumentKeyDown);
            }
            
        }
        
        loop.start();
    }

    stop() {
        loop.stop();
    }

}

export { World };
