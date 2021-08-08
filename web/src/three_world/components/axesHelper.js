import { AxesHelper } from 'three'; 

function createAxesHelper(){
   
    const axesHelper = new AxesHelper(1);
    axesHelper.translateX(0);

    return axesHelper;
}

export {createAxesHelper}