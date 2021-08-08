import { GridHelper } from 'three'; 

function createGridHelper(){
   
    const size = 20;
    const divisions = 20;

    const gridHelper = new GridHelper( size, divisions );

    return gridHelper;
}

export {createGridHelper}