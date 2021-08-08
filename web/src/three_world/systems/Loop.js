import { Clock } from 'three'; 
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import {updateControls} from "./controls";

const clock = new Clock();

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    tick() {
        // only call the getDelta function once per frame!
        const delta = clock.getDelta();

        // console.log( `The last frame rendered in ${delta * 1000} milliseconds`);
        
        //Camera rotation controller
        updateControls();

        // All world objects that need updation are listed in the "updatables"
        for (const object of this.updatables) {
            object.tick(delta);
        }
    }

    start(game) {

        // Register this callback with renderer
        this.renderer.setAnimationLoop(() => {

            // Do the actions in the world
            this.tick();
            
            // render a frame
            this.renderer.render(this.scene, this.camera);

        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }
}

export { Loop }