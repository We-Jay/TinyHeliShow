import * as THREE from 'three';

//Globe 1
function createCurvePathGlobe() {

    const curvePath = new THREE.CurvePath();

    //circle 1
    const firstC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        //new THREE.Vector3(4.243, 1.757, 0),
        new THREE.Vector3(7, 0, 0),
        new THREE.Vector3(7, 5, 0),
    );

    const secondC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(7, 5, 0),
        //new THREE.Vector3(4.243, 10.243, 0),
        new THREE.Vector3(7, 10, 0),
        new THREE.Vector3(0, 10, 0),
    );

    const thirdC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 10, 0),
        //new THREE.Vector3(-4.243, 10.243, 0),
        new THREE.Vector3(-7, 10, 0),
        new THREE.Vector3(-7, 5, 0),
    );

    const fourthC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-7, 5, 0),
        //new THREE.Vector3(-4.243, 1.757, 0),
        new THREE.Vector3(-7, 0, 0),
        new THREE.Vector3(0, 0, 0),
    );

    //circle 2
    const firstC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        //new THREE.Vector3(0, 1.757, 4.243),
        new THREE.Vector3(0, 0, 7),
        new THREE.Vector3(0, 5, 7),
    );

    const secondC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 5, 7),
        //new THREE.Vector3(0, 10.243, 4.243),
        new THREE.Vector3(0, 10, 7),
        new THREE.Vector3(0, 10, 0),
    );

    const thirdC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 10, 0),
        //new THREE.Vector3(0, 10.243, -4.243),
        new THREE.Vector3(0, 10, -7),
        new THREE.Vector3(0, 5, -7),
    );

    const fourthC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 5, -7),
        //new THREE.Vector3(0, 1.757, -4.243),
        new THREE.Vector3(0,0, -7),
        new THREE.Vector3(0, 0, 0),
    );

    curvePath.add(firstC1CurveLine);
    curvePath.add(secondC1CurveLine);
    curvePath.add(thirdC1CurveLine);
    curvePath.add(fourthC1CurveLine);

    curvePath.add(firstC2CurveLine);
    curvePath.add(secondC2CurveLine);
    curvePath.add(thirdC2CurveLine);
    curvePath.add(fourthC2CurveLine);

    return curvePath;

}

export {createCurvePathGlobe};
