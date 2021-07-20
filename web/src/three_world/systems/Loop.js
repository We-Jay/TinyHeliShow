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

            // Print the present state of game

            // var para = document.getElementById("info");
            // para.innerHTML = "Game Status: " + game.getState();
            

            // render a frame
            this.renderer.render(this.scene, this.camera);

        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }
}

export { Loop }