import { Color, Scene } from 'three'; //'/node_modules/three/build/three.module.js';

function createScene() {
    const scene = new Scene();

    scene.background = new Color('black');

    return scene;
}

export { createScene };