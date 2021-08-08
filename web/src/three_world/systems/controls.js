
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let controls;

function createControls(camera, canvas) {
    controls = new OrbitControls(camera, canvas);
    controls.autoRotate = true;
    return controls;
}

function updateControls(){
    controls.update();
}

export { createControls, updateControls };
        