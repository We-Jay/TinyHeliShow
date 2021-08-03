import * as THREE from 'three';

//Tornado 3
function createCurvePathTree() {

    const curvePath = new THREE.CurvePath();

    //First Tree Triangle
    const firstT1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(-4, 1, 0),
        new THREE.Vector3(-8, 2, 0),
    );

    const secondT1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-8, 2, 0),
        new THREE.Vector3(-2,2,0),
        new THREE.Vector3(0, 8, 0),
    );

    const thirdT1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 8, 0),
        new THREE.Vector3(2,2,0),
        new THREE.Vector3(8, 2, 0),
    );

    const fourthT1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(8, 2, 0),
        new THREE.Vector3(4, 1, 0),
        new THREE.Vector3(0, 2, 0),

    );

    //Second Tree Triangle
    const firstT2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, 1, -4),
        new THREE.Vector3(0, 2, -8),
    );

    const secondT2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 2, -8),
        new THREE.Vector3(0,2,-2),
        new THREE.Vector3(0, 8, 0),
    );

    const thirdT2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 8, 0),
        new THREE.Vector3(0,2, 2),
        new THREE.Vector3(0, 2, 8),
    );

    const fourthT2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 2, 8),
        new THREE.Vector3(0, 1, 4),
        new THREE.Vector3(0, 2, 0),

    );

    curvePath.add(firstT1CurveLine);
    curvePath.add(secondT1CurveLine);
    curvePath.add(thirdT1CurveLine);
    curvePath.add(fourthT1CurveLine);

    curvePath.add(firstT2CurveLine);
    curvePath.add(secondT2CurveLine);
    curvePath.add(thirdT2CurveLine);
    curvePath.add(fourthT2CurveLine);
    
    return curvePath;
}

export { createCurvePathTree };