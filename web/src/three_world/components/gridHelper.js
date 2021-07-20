import { GridHelper } from 'three'; //'/node_modules/three/build/three.module.js';

function createGridHelper(){
   
    const size = 20;
    const divisions = 20;

    const gridHelper = new GridHelper( size, divisions );

    return gridHelper;
}

export {createGridHelper}