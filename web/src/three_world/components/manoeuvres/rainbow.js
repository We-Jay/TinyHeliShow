import * as THREE from 'three';

//Petals 
function createCurvePathRainbow() {

    const curvePath = new THREE.CurvePath();

    //Rainbow 1
    const firstC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 2, .5),
        new THREE.Vector3(0, 6, .5),
        new THREE.Vector3(-4, 6, .5),
    );

    const secondC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-4, 6, .5),
        new THREE.Vector3(-8, 6, .5),
        new THREE.Vector3(-8, 2, .5),
    );

    const connectCurve1 = new THREE.LineCurve3(
        new THREE.Vector3(-8, 2, .5),
        new THREE.Vector3(-8, 2, -.5),
    );

    const thirdC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-8, 2, -.5),
        new THREE.Vector3(-8, 6, -.5),
        new THREE.Vector3(-4, 6, -.5),
    );

    const fourthC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-4, 6, -.5),
        new THREE.Vector3(0, 6, -.5),
        new THREE.Vector3(0, 2, -.5),
    );

    //Rainbow 2
    const firstC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 2, -.5),
        new THREE.Vector3(0, 6, -.5),
        new THREE.Vector3(4, 6, -.5),
    );

    const secondC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(4, 6, -.5),
        new THREE.Vector3(8, 6, -.5),
        new THREE.Vector3(8, 2, -.5),
    );

    const connectCurve2 = new THREE.LineCurve3(
        new THREE.Vector3(8, 2, -.5),
        new THREE.Vector3(8, 2, .5),
    );

    const thirdC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(8, 2, .5),
        new THREE.Vector3(8, 6, .5),
        new THREE.Vector3(4, 6, .5),
    );

    const fourthC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(4, 6, .5),
        new THREE.Vector3(0, 6, .5),
        new THREE.Vector3(0, 2, .5),
    );

    //Rainbow 3
     const firstC3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0.5, 2, 0),
        new THREE.Vector3(0.5, 6, 0),
        new THREE.Vector3(0.5, 6, -4),
    );

    const secondC3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(.5, 6, -4),
        new THREE.Vector3(.5, 6, -8),
        new THREE.Vector3(.5, 2, -8),
    );

    const connectCurve3 = new THREE.LineCurve3(
        new THREE.Vector3(.5, 2, -8),
        new THREE.Vector3(-.5, 2, -8),
    );

    const thirdC3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-.5, 2, -8),
        new THREE.Vector3(-.5, 6, -8),
        new THREE.Vector3(-.5, 6, -4),
    );

    const fourthC3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-.5, 6, -4),
        new THREE.Vector3(-.5, 6, 0),
        new THREE.Vector3(-.5, 2, 0),
    );
    

 
    //Rainbow 4
    const firstC4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-.5, 2, 0),
        new THREE.Vector3(-.5, 6, 0),
        new THREE.Vector3(-.5, 6, 4),
    );

    const secondC4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-.5, 6, 4),
        new THREE.Vector3(-.5, 6, 8),
        new THREE.Vector3(-.5, 2, 8),
    );

    const connectCurve4 = new THREE.LineCurve3(
        new THREE.Vector3(-.5, 2, 8),
        new THREE.Vector3(.5, 2, 8),
    );


    const thirdC4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(.5, 2, 8),
        new THREE.Vector3(.5, 6, 8),
        new THREE.Vector3(.5, 6, 4),
    );

    const fourthC4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(.5, 6, 4),
        new THREE.Vector3(.5, 6, 0),
        new THREE.Vector3(.5, 2, 0),
    );


    curvePath.add(firstC1CurveLine);
    curvePath.add(secondC1CurveLine);
    curvePath.add(connectCurve1);
    curvePath.add(thirdC1CurveLine);
    curvePath.add(fourthC1CurveLine);

    curvePath.add(firstC2CurveLine);
    curvePath.add(secondC2CurveLine);
    curvePath.add(connectCurve2);
    curvePath.add(thirdC2CurveLine);
    curvePath.add(fourthC2CurveLine);

    curvePath.add(firstC3CurveLine);
    curvePath.add(secondC3CurveLine);
    curvePath.add(connectCurve3);
    curvePath.add(thirdC3CurveLine);
    curvePath.add(fourthC3CurveLine);

    curvePath.add(firstC4CurveLine);
    curvePath.add(secondC4CurveLine);
    curvePath.add(connectCurve4);
    curvePath.add(thirdC4CurveLine);
    curvePath.add(fourthC4CurveLine);

    return curvePath;

}

export {createCurvePathRainbow};