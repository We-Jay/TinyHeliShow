// import * as THREE from '/node_modules/three/build/three.module.js';
import * as THREE from 'three';
var Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
};

function createAirPlane(pathPoints) {

    const mesh = new THREE.Object3D();

    // Create the cabin
    var geomCockpit = new THREE.BoxGeometry(6, 5, 5, 1, 1, 1);
    var matCockpit = new THREE.MeshPhongMaterial({ color: Colors.red }); // , shading:THREE.FlatShading});
    matCockpit.flatShading = true;
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    mesh.add(cockpit);

    // Create the engine
    var geomEngine = new THREE.BoxGeometry(2, 5, 5, 1, 1, 1);
    var matEngine = new THREE.MeshPhongMaterial({ color: Colors.white }); //, shading:THREE.FlatShading});
    matEngine.flatShading = true;
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 4;
    engine.castShadow = true;
    engine.receiveShadow = true;
    mesh.add(engine);

    // Create the tail
    var geomTailPlane = new THREE.BoxGeometry(1.5, 2, .5, 1, 1, 1);
    var matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.red }); //, shading:THREE.FlatShading});
    matTailPlane.flatShading = true;
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-3.5, 2.5, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    mesh.add(tailPlane);

    // Create the wing
    var geomSideWing = new THREE.BoxGeometry(4, .8, 15, 1, 1, 1);
    var matSideWing = new THREE.MeshPhongMaterial({ color: Colors.red }); //, shading:THREE.FlatShading});
    matSideWing.flatShading = true;
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    mesh.add(sideWing);

    // propeller
    var geomPropeller = new THREE.BoxGeometry(2, 1, 1, 1, 1, 1);
    var matPropeller = new THREE.MeshPhongMaterial({ color: Colors.brown }); //, shading:THREE.FlatShading});
    matPropeller.flatShading = true;
    const propeller = new THREE.Mesh(geomPropeller, matPropeller);
    propeller.castShadow = true;
    propeller.receiveShadow = true;

    // blades
    var geomBlade = new THREE.BoxGeometry(.1, 10, 2, 1, 1, 1);
    var matBlade = new THREE.MeshPhongMaterial({ color: Colors.brownDark }); //, shading:THREE.FlatShading});
    matBlade.flatShading = true;

    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(.8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    propeller.add(blade);
    propeller.position.set(5, 0, 0);
    mesh.add(propeller);

    //mesh.rotateZ(211/7);
    mesh.scale.set(.02,.02,.02   );
    
    const airPlane = mesh;

    /*
    //initial orientation
    airPlane.rotation.set(-0.5, -0.1, 0.8);

    const radiansPerSecond = THREE.MathUtils.degToRad(30);

    airPlane.tick = (delta) => {
        // increase the airPlane's rotation each frame
        airPlane.rotation.z += radiansPerSecond * delta;
        airPlane.rotation.x += radiansPerSecond * delta;
        airPlane.rotation.y += radiansPerSecond * delta;
    };
    */

    //associate a path with the arrow
    const pointsPath = pathPoints;

    const radiansPerSecond = THREE.MathUtils.degToRad(30);

    // this method will be called once per frame

    let fraction = 0;
    const up = new THREE.Vector3(1, 0, 0);
    const axis = new THREE.Vector3();

    // while (true) {
        // Rest of code taken into arrow.tick. 
        // yield renderer.domElement;
    //}


    airPlane.tick = (delta) => {
       
        // find the new position of arrow and update the position
       
        const newPosition = pointsPath.getPoint(fraction);
        const tangent = pointsPath.getTangent(fraction);
        airPlane.position.copy(newPosition);
        axis.crossVectors(up, tangent).normalize();

        const radians = Math.acos(up.dot(tangent));

        airPlane.quaternion.setFromAxisAngle(axis, radians);
        // renderer.render(scene, camera);
        // fraction += 0.001;
        fraction += delta/10;
        if (fraction > 1) {
            fraction = 0;
        }
    };




    return airPlane;
};

export { createAirPlane }