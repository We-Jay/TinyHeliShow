import { AxesHelper } from 'three'; //'/node_modules/three/build/three.module.js';

function createAxesHelper(){
   
    const axesHelper = new AxesHelper(1);
    axesHelper.translateX(0);

    return axesHelper;
}

export {createAxesHelper}