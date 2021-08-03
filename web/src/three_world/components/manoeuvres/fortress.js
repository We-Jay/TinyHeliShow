import * as THREE from 'three';

function createCurvePathFortress() {

    const curvePath = new THREE.CurvePath();

    const firstCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(6, 0, -6),
        new THREE.Vector3(6, 12, 0),
        new THREE.Vector3(6, 0, 6),
    );


    const secondCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(6, 0, 6),
        new THREE.Vector3(0, 12, 6),
        new THREE.Vector3(-6, 0, 6),
    );


    const thirdCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-6, 0, 6),
        new THREE.Vector3(-6, 12, 0),
        new THREE.Vector3(-6, 0, -6),
    );


    const fourthCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-6, 0, -6),
        new THREE.Vector3(0, 12, -6),
        new THREE.Vector3(6, 0, -6),
    );

    curvePath.add(firstCurveLine);
    curvePath.add(secondCurveLine);
    curvePath.add(thirdCurveLine);
    curvePath.add(fourthCurveLine);


    return curvePath;
}

export {createCurvePathFortress};