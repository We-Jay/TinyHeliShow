import { Clock } from 'three'; // '/node_modules/three/build/three.module.js';

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

        // console.log(
        //     `The last frame rendered in ${delta * 1000} milliseconds`,
        // );
        
        for (const object of this.updatables) {
            object.tick(delta);
        }
    }

    start() {
        this.renderer.setAnimationLoop(() => {

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