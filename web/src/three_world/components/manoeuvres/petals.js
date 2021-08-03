import * as THREE from 'three';

//Petals 
function createCurvePathPetals() {

    const curvePath = new THREE.CurvePath();

    //circle 1
    const firstC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 4, 0),
        new THREE.Vector3(0, 8, 0),
        new THREE.Vector3(-4, 8, 0),
    );

    const secondC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-4, 8, 0),
        new THREE.Vector3(-8, 8, 0),
        new THREE.Vector3(-8, 4, 0),
    );

    const thirdC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-8, 4, 0),
        new THREE.Vector3(-8, 0, 0),
        new THREE.Vector3(-4, 0, 0),
    );

    const fourthC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-4, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 4, 0),
    );

    //circle 2
    const firstC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 4, 0),
        new THREE.Vector3(0, 8, 0),
        new THREE.Vector3(4, 8, 0),
    );

    const secondC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(4, 8, 0),
        new THREE.Vector3(8, 8, 0),
        new THREE.Vector3(8, 4, 0),
    );

    const thirdC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(8, 4, 0),
        new THREE.Vector3(8, 0, 0),
        new THREE.Vector3(4, 0, 0),
    );

    const fourthC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(4, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 4, 0),
    );

     //circle 3
     const firstC3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 4, 0),
        new THREE.Vector3(0, 8, 0),
        new THREE.Vector3(0, 8, -4),
    );

    const secondC3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 8, -4),
        new THREE.Vector3(0, 8, -8),
        new THREE.Vector3(0, 4, -8),
    );

    const thirdC3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 4, -8),
        new THREE.Vector3(0, 0, -8),
        new THREE.Vector3(0, 0, -4),
    );

    const fourthC3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, -4),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 4, 0),
    );

 
    //circle 4
    const firstC4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 4, 0),
        new THREE.Vector3(0, 8, 0),
        new THREE.Vector3(0, 8, 4),
    );

    const secondC4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 8, 4),
        new THREE.Vector3(0, 8, 8),
        new THREE.Vector3(0, 4, 8),
    );

    const thirdC4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 4, 8),
        new THREE.Vector3(0, 0, 8),
        new THREE.Vector3(0, 0, 4),
    );

    const fourthC4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 4),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 4, 0),
    );

    curvePath.add(firstC1CurveLine);
    curvePath.add(secondC1CurveLine);
    curvePath.add(thirdC1CurveLine);
    curvePath.add(fourthC1CurveLine);

    curvePath.add(firstC2CurveLine);
    curvePath.add(secondC2CurveLine);
    curvePath.add(thirdC2CurveLine);
    curvePath.add(fourthC2CurveLine);

    curvePath.add(firstC3CurveLine);
    curvePath.add(secondC3CurveLine);
    curvePath.add(thirdC3CurveLine);
    curvePath.add(fourthC3CurveLine);

    curvePath.add(firstC4CurveLine);
    curvePath.add(secondC4CurveLine);
    curvePath.add(thirdC4CurveLine);
    curvePath.add(fourthC4CurveLine);

    return curvePath;

}

export {createCurvePathPetals};