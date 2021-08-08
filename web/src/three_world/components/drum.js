import {
    MathUtils,
    Mesh,
    MeshPhongMaterial,
    CylinderGeometry, 
} from 'three'; 

function createDrum() {
    
    const geometry = new CylinderGeometry( .1, .1, .4, 32 );
    const material = new MeshPhongMaterial();
    const drum = new Mesh(geometry, material);

    //initial orientation
    drum.translateZ(.1);
    
    const radiansPerSecond = MathUtils.degToRad(30);
    // this method will be called once per frame (if required)
    drum.tick = (delta) => {
        // increase the drum's rotation each frame
        drum.rotation.z += radiansPerSecond * delta;
        drum.rotation.x += radiansPerSecond * delta;
        drum.rotation.y += radiansPerSecond * delta;
    };

    return drum;
}

//Create four maker drums to indicate four directions of the platform
function createMarkerDrums() {

    let drumArray = [];

    let drumN = createDrum();
    let drumE = createDrum();
    let drumW = createDrum();
    let drumS = createDrum();

    drumN.material.color.setHex(0x68FF00); //Green
    drumE.material.color.setHex(0xFFBF00); //Yellow
    drumW.material.color.setHex(0x13F4EF); //Pink
    drumS.material.color.setHex(0xFF005C); //Cyan
    
    drumN.position.set(10,0,0);
    drumE.position.set(0,0,10);
    drumW.position.set(-10,0,0);
    drumS.position.set(0,0,-10);


    drumArray.push(drumN, drumE, drumW, drumS);

    return drumArray;
} 

export {createMarkerDrums};