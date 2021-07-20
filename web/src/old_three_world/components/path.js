import * as THREE from 'three'; // '/node_modules/three/build/three.module.js';

function createPointsPath1() {

    const pointsPath = new THREE.CurvePath();
    const firstLine = new THREE.LineCurve3(
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(-1, 0, 0)
    );
    const secondLine = new THREE.LineCurve3(
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(-1, 1, 0)
    );

    const thirdLine = new THREE.LineCurve3(
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(-1, 1, 1),
    );


    const bezierLine = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-1, 1, 1),
        new THREE.Vector3(-0.5, 1.5, 0),
        new THREE.Vector3(2.0, 1.5, 0),
        new THREE.Vector3(-1, 0, 1)
    );

    pointsPath.add(firstLine);
    pointsPath.add(secondLine);
    pointsPath.add(thirdLine);
    pointsPath.add(bezierLine);

    return pointsPath;
}

function createPath(pointsPath) {

    const material = new THREE.LineBasicMaterial({ color: 0x9132a8 });
    const points = pointsPath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return new THREE.Line(geometry, material);
}



function createPointsPath2() {

    const pointsPath = new THREE.CurvePath();
    const firstLine = new THREE.LineCurve3(
        new THREE.Vector3(-.67, 4.31, -.82),
        new THREE.Vector3(-4.92, 3.28, -.95),

    );
    const secondLine = new THREE.LineCurve3(
        new THREE.Vector3(-4.92, 3.28, -.95),
        new THREE.Vector3(-6.52, -2.05, 1.53),

    );

    const bezierLine = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-6.52, -2.05, 1.53),
        new THREE.Vector3(-.74, 3.44, 6.23),
        new THREE.Vector3(-6.20, .93, 2.34),
    );

    pointsPath.add(firstLine);
    pointsPath.add(secondLine);
    pointsPath.add(bezierLine);

    return pointsPath;
}

function createPointsPath3() {

    const pointsPath = new THREE.CurvePath();

    const firstCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-1, 0, .12),
        new THREE.Vector3(3.70, 1.57, .67),
        new THREE.Vector3(-4.25, 2.82, 1.75),
    );


    const secondCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-4.25, 2.82, 1.75),
        new THREE.Vector3(-6.45, -2.88, 3.15),
        new THREE.Vector3(2.23, -1.70, 2.14),
    );

    const cubicBezierLine = new THREE.CubicBezierCurve3(
        new THREE.Vector3(2.23, -1.70, 2.14),
        new THREE.Vector3(4.31, -1.79, -1.95),
        new THREE.Vector3(-3.07, 5.32, 18.86),
        new THREE.Vector3(-1, 0, .12),
    );

    pointsPath.add(firstCurveLine);
    pointsPath.add(secondCurveLine);
    pointsPath.add(cubicBezierLine);

    return pointsPath;
}


export { createPointsPath1, createPointsPath2, createPointsPath3, createPath }