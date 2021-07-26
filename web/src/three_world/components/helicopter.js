// import * as THREE from '/node_modules/three/build/three.module.js';
import * as THREE from 'three';
import { RingBufferGeometry } from 'three';
//import {scene} from '../World';
import { Loop } from '../systems/Loop'
import { createPartialDisplayPath } from "./path";
import { createHeliRing } from './ring';

var Colors = {
    //red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,

    teal: 0x22EACA,
    maroon: 0xB31E6F,
    red: 0xEE5A5A,
    orange: 0xFF9E74,
    yellow: 0xFDCA40,
};


let heliCopter;
let rotor;
//let myScene = scene;




// let movePath;

function createHeliCopter(loop) {

    const mesh = new THREE.Object3D();

/*
    //To be removed
    const heliRingGeometry = createHeliRing();
    const heliRingMaterial = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
    heliRingMaterial.flatShading = true;
    const heliRing = new THREE.Mesh(heliRingGeometry, heliRingMaterial);
    heliRing.rotateY(-Math.PI/2);
    mesh.add(heliRing);
*/


    // Create the Tail Boom
    var geomTailBoom = new THREE.CylinderGeometry( 2.5, 1, 8, 32 );
    geomTailBoom.rotateZ(-Math.PI /2);
    var matTailBoom = new THREE.MeshPhongMaterial({ color: Colors.yellow }); // , shading:THREE.FlatShading});
    matTailBoom.flatShading = true;
   
    var tailBoom = new THREE.Mesh(geomTailBoom, matTailBoom);
    tailBoom.castShadow = true;
    tailBoom.receiveShadow = true;

    mesh.add(tailBoom);

    // Create the cockpit
    var geomCockpit = new THREE.BoxGeometry(6, 6, 6, 1, 1, 1);
    var matCockpit = new THREE.MeshPhongMaterial({ color: Colors.red }); //, shading:THREE.FlatShading});
    matCockpit.flatShading = true;
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.position.x = 7;
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    mesh.add(cockpit);

    // Create the tail
    var geomTailPlane = new THREE.BoxGeometry(1.5, 2, .5, 1, 1, 1);
    var matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.red }); //, shading:THREE.FlatShading});
    matTailPlane.flatShading = true;
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-3.2, 1.6, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    mesh.add(tailPlane);

    /*
    // Create the wing
    var geomSideWing = new THREE.BoxGeometry(4, .8, 15, 1, 1, 1);
    var matSideWing = new THREE.MeshPhongMaterial({ color: Colors.red }); //, shading:THREE.FlatShading});
    matSideWing.flatShading = true;
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    mesh.add(sideWing);
    */


    // rotor
    var geomRotor = new THREE.BoxGeometry(2, 1, 1, 1, 1, 1);
    var matRotor = new THREE.MeshPhongMaterial({ color: Colors.maroon }); //, shading:THREE.FlatShading});
    matRotor.flatShading = true;
    rotor = new THREE.Mesh(geomRotor, matRotor);
    rotor.castShadow = true;
    rotor.receiveShadow = true;

    rotor.tick = (delta) => {
        rotor.rotation.y += 0.8;
    }
    loop.updatables.push(rotor);


    // blades
    var geomBlade = new THREE.BoxGeometry(2, .1, 10, 1, 1, 1);
    var matBlade = new THREE.MeshPhongMaterial({ color: Colors.teal }); //, shading:THREE.FlatShading});
    matBlade.flatShading = true;

    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(0, .3, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    rotor.add(blade);
    rotor.position.set(7, 3.5, 0);
    mesh.add(rotor);

    //mesh.rotateZ(211/7);
    mesh.scale.set(.06, .06, .06);

    heliCopter = mesh;



    /*
    //initial orientation
    heliCopter.rotation.set(-0.5, -0.1, 0.8);
    */
    return heliCopter;
}

/*
const radiansPerSecond = THREE.MathUtils.degToRad(30);

heliCopter.tick = (delta) => {
    // increase the heliCopter's rotation each frame
    heliCopter.rotation.z += radiansPerSecond * delta;
    heliCopter.rotation.x += radiansPerSecond * delta;
    heliCopter.rotation.y += radiansPerSecond * delta;
};
*/

function preMove(pathType){



}

function setupManoeuvre(game, gameScene, gameSceneKeeper, curvePath) {


    const radiansPerSecond = THREE.MathUtils.degToRad(30);
    let fraction = 0;
    const up = new THREE.Vector3(1, 0, 0);
    const axis = new THREE.Vector3();


    //for efficiecy reasons we are doing the breakup of the Curve in a single place, i.e., here
    const curvePoints = curvePath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
    let upperIndex = Math.floor(curvePoints.length * fraction);
    let partialCurvePoints = curvePoints.slice(0, upperIndex + 1);

    let partialDisplayPath = createPartialDisplayPath(partialCurvePoints);
    gameScene.add(partialDisplayPath);
    let prevDisplayPath = partialDisplayPath;
    //console.log( "UpperIndex Point:", curvePoints[upperIndex]);


    heliCopter.tick = (delta) => {

        // rotor.rotation.y += 0.3;

        // find the new position of heliCopter and update the position
        // const newPosition = curvePath.getPoint(fraction);
        upperIndex = Math.floor(curvePoints.length * fraction);
        const newPosition = curvePoints[upperIndex];
        // console.log( "Plane Position:", newPosition);

        const tangent = curvePath.getTangent(fraction);
        //const tangent = curvePath.getTangentAt(newPosition);

        heliCopter.position.copy(newPosition);
        axis.crossVectors(up, tangent).normalize();
        const radians = Math.acos(up.dot(tangent));
        heliCopter.quaternion.setFromAxisAngle(axis, radians);

        //displayPath = createFractionDisplayPath(fraction, movePath);
        //myScene.add(displayPath);


        partialCurvePoints = curvePoints.slice(0, upperIndex+1);
        partialDisplayPath = createPartialDisplayPath(partialCurvePoints);
        gameScene.remove(prevDisplayPath);
        gameScene.add(partialDisplayPath);

        prevDisplayPath = partialDisplayPath;

        //myScene.add(displayPath);


        // renderer.render(scene, camera);
        // fraction += 0.001;
        if (fraction < 1) {
            fraction += delta / 25;

            //console.log(displayPath);
            if (typeof gameScene === "undefined") {
                console.log("Shout NULLL");
            }

            //myScene.add(displayPath);
            if (typeof partialDisplayPath === "undefined") {
                console.log("Shouting path undefined")
                //scene.remove(prevDisplayPath);
            }

        }

        if (fraction > 1) {
            fraction = 0;
            gameSceneKeeper.add(partialDisplayPath);
            heliCopter.rotation.set( 0, 0, 0 );


            game.setState("move-over");
        }
    };

}



/*
function createTrail(scene, trailTarget) {
    // specify points to create planar trail-head geometry
    var trailHeadGeometry = [];
  
    trailHeadGeometry.push(
        new THREE.Vector3(-1.0, 0.0, 0.0),
        new THREE.Vector3(0.0, 0.0, 0.0),
        new THREE.Vector3(1.0, 0.0, 0.0)
    );

    // create the trail renderer object
    var trail = new THREE.TrailRenderer(scene, false);

    // create material for the trail renderer
    var trailMaterial = THREE.TrailRenderer.createBaseMaterial();

    // specify length of trail
    var trailLength = 15;

    //const trailTarget = heliCopter;

    // initialize the trail
    trail.initialize(trailMaterial, trailLength, false, 0, trailHeadGeometry, trailTarget);

};
*/

export { createHeliCopter, setupManoeuvre }; // , createTrail};