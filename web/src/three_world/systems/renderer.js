import { WebGLRenderer } from 'three'; //'/node_modules/three/build/three.module.js';

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });

    // turn on the physically correct lighting model
    renderer.physicallyCorrectLights = true;

    renderer.clearDepth();

    return renderer;
}

export { createRenderer };