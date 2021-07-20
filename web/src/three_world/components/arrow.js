//import * as THREE from '/node_modules/three/build/three.module.js';
import * as THREE from 'three';

function createArrow(pathPoints) {

    const material = new THREE.MeshNormalMaterial();
    const coneGeom = new THREE.ConeGeometry(1, 2, 10);
    coneGeom.translate(0, 2.5, 0);


    const cone = new THREE.Mesh(coneGeom, material);
    const cylinder = new THREE.CylinderGeometry(0.4, 0.6, 3, 10);

   
    // cylinder.merge(cone.geometry, 0) //, cone.matrix);
    // cylinder.scale(0.05, 0.05, 0.05);
    cylinder.scale(0.1, 0.1, 0.1);

    
    const arrow = new THREE.Mesh(cylinder, material);

    //arrow.translate(2,2, -1)

    //associate a path with the arrow
    const pointsPath = pathPoints;

    const radiansPerSecond = THREE.MathUtils.degToRad(30);

    // this method will be called once per frame

    let fraction = 0;
    const up = new THREE.Vector3(0, 1, 0);
    const axis = new THREE.Vector3();

    // while (true) {
        // Rest of code taken into arrow.tick. 
        // yield renderer.domElement;
    //}


    arrow.tick = (delta) => {
        // increase the cube's rotation each frame
        // arrow.rotation.z += radiansPerSecond * delta;
        //arrow.rotation.x += radiansPerSecond * delta;
        // arrow.rotation.y += radiansPerSecond * delta;

        // find the new position of arrow and update the position
       
        const newPosition = pointsPath.getPoint(fraction);
        const tangent = pointsPath.getTangent(fraction);
        arrow.position.copy(newPosition);
        axis.crossVectors(up, tangent).normalize();

        const radians = Math.acos(up.dot(tangent));

        arrow.quaternion.setFromAxisAngle(axis, radians);
        // renderer.render(scene, camera);
        // fraction += 0.001;
        fraction += delta/10;
        if (fraction > 1) {
            fraction = 0;
        }
    };


    return arrow;
}

export { createArrow }



