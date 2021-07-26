// import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from '/node_modules/three/build/three.module.js';
import {
    BoxGeometry,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
    MeshPhongMaterial
} from 'three';//'/node_modules/three/build/three.module.js';

function createCube() {
    // create a geometry
    const geometry = new BoxGeometry(.5, .2, .5);
    
    // Switch the old "basic" material to
    // a physically correct "standard" material
    // const material = new MeshStandardMaterial({ color: 'purple' });
    const material = new MeshPhongMaterial();
    

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
   
    
    //initial orientation
    // cube.rotation.set(-0.5, -0.1, 0.8);
    // cube.translateX(5);
    

    const radiansPerSecond = MathUtils.degToRad(30);

    // this method will be called once per frame
    
    cube.tick = (delta) => {
        // increase the cube's rotation each frame
        cube.rotation.z += radiansPerSecond * delta;
        cube.rotation.x += radiansPerSecond * delta;
        cube.rotation.y += radiansPerSecond * delta;
    };

    return cube;
}

//Create four maker Cubes to indicate four directions of the platform
function createMarkerCubes() {

    let cubeArray = [];

    let cubeN = createCube();
    let cubeE = createCube();
    let cubeW = createCube();
    let cubeS = createCube();

    cubeN.material.color.setHex(0x68FF00);
    cubeE.material.color.setHex(0xFFBF00);
    cubeW.material.color.setHex(0x13F4EF);
    cubeS.material.color.setHex(0xFF005C);
    
    cubeN.position.set(10,0,0);
    cubeE.position.set(0,0,10);
    cubeW.position.set(-10,0,0);
    cubeS.position.set(0,0,-10);

    cubeArray.push(cubeN, cubeE, cubeW, cubeS);

    return cubeArray;
} 

export { createCube, createMarkerCubes};