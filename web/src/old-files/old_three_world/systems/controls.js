//import { OrbitControls } from  '/node_modules/three/examples/jsm/controls/OrbitControls.js';
//import * as THREECONTROLS from "../../../node_modules/three/examples/jsm/controls/OrbitControls.js";

// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/controls/OrbitControls.js';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    return controls;
}

export { createControls };
        