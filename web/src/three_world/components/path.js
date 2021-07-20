import * as THREE from 'three'; // '/node_modules/three/build/three.module.js';

let pointPathType  = {
    GLOBE: createPointsPath1(),
    FORTRESS: createPointsPath2(),
    TORNADO: createPointsPath3(),
}

let displayPathType = {
    GLOBE:createDisplayPath(pointPathType.GLOBE),
    FORTRESS: createDisplayPath(pointPathType.FORTRESS),
    TORNADO: createDisplayPath(pointPathType.TORNADO),
}

function fetchPointsPath(pathType) {
    switch (pathType) {
        case 1:
            return pointPathType.GLOBE;
        case 2:
            return pointPathType.FORTRESS;
        case 3:
            return pointPathType.TORNADO;
    }
}

function fetchDisplayPath(pathType) {
    switch (pathType) {
        case 1:
            return displayPathType.GLOBE;
        case 2:
            return displayPathType.FORTRESS;
        case 3:
            return displayPathType.TORNADO;
    }
}


//Creates path object for scene display
function createDisplayPath(pointsPath) {

    const material = new THREE.LineBasicMaterial({ color: 0x9132a8 });
    const points = pointsPath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // console.log(points);
    return new THREE.Line(geometry, material);
}


//Helper function: gives sample points from the points Path
function createSelectPointsArray(pointsPath, noOfPoints) {
    const points = pointsPath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
    // console.log("Full Positions:", points);
    let rndIndexArray = getRndIndexArray(noOfPoints);
    let selectPointsArray = [];

    for (let i = 0; i < rndIndexArray.length; i++) {
        selectPointsArray.push(points[rndIndexArray[i]]);
    }

    return selectPointsArray;

    function getRndIndexArray(noOfPoints) {

        let rndIndexArray = [];

        var pointsArrayLen = points.length;
        // console.log(pointsArrayLen);

        var min = 0
        var max = Math.floor(pointsArrayLen / noOfPoints);
        var increment = Math.floor(pointsArrayLen / noOfPoints);

        for (let i = 0; i < noOfPoints; i++) {
            if (max > pointsArrayLen) {

                max = pointsArrayLen;

            }
            // console.log ("Max-Min Value:",max, min);
            let result = Math.floor(Math.random() * (max - min)) + min;
            // console.log ("Result:", result);
            rndIndexArray.push(result);

            min = min + increment;
            max = max + increment;
        }

        return rndIndexArray;
    }

}


//Globe
function createPointsPath1(){

    const pointsPath = new THREE.CurvePath();

    //cicle 1
    const firstC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(4.243, 1.757, 0),
        new THREE.Vector3(6, 6, 0),
    );

    const secondC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(6, 6, 0),
        new THREE.Vector3(4.243, 10.243, 0),
        new THREE.Vector3(0, 12, 0),
    );

    const thirdC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 12, 0),
        new THREE.Vector3(-4.243, 10.243, 0),
        new THREE.Vector3(-6, 6, 0),
    );

    const fourthC1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-6, 6, 0),
        new THREE.Vector3(-4.243, 1.757, 0),
        new THREE.Vector3(0, 0, 0),
    );

    //cicle 2
    const firstC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1.757, 4.243),
        new THREE.Vector3(0, 6, 6),
    );

    const secondC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 6, 6),
        new THREE.Vector3(0, 10.243, 4.243),
        new THREE.Vector3(0, 12, 0),
    );

    const thirdC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 12, 0),
        new THREE.Vector3(0, 10.243, -4.243),
        new THREE.Vector3(0, 6, -6),
    );

    const fourthC2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 6, -6),
        new THREE.Vector3(0, 1.757, -4.243),
        new THREE.Vector3(0, 0, 0),
    );

    pointsPath.add(firstC1CurveLine);
    pointsPath.add(secondC1CurveLine);
    pointsPath.add(thirdC1CurveLine);
    pointsPath.add(fourthC1CurveLine);

    pointsPath.add(firstC2CurveLine);
    pointsPath.add(secondC2CurveLine);
    pointsPath.add(thirdC2CurveLine);
    pointsPath.add(fourthC2CurveLine);

    return pointsPath;

}


//Tornado
function createPointsPath3() {

    const pointsPath = new THREE.CurvePath();

    //level 1
    const firstL1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(2, 2, 0),
        new THREE.Vector3(0, 2, 2),
        new THREE.Vector3(-2, 2, 0),
    );

    const secondL1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-2, 2, 0),
        new THREE.Vector3(0, 2, -2),
        new THREE.Vector3(2, 2, 0),
    );

    const firstConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(2, 2, 0),
        new THREE.Vector3(2, 4, 0),

    );

    //level 2
    const firstL2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(4, 4, 0),
        new THREE.Vector3(0, 4, 4),
        new THREE.Vector3(-4, 4, 0),
    );

    const secondL2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-4, 4, 0),
        new THREE.Vector3(0, 4, -4),
        new THREE.Vector3(4, 4, 0),
    );

    const secondConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(4, 4, 0),
        new THREE.Vector3(6, 6, 0),

    );

    //level 3
    const firstL3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(6, 6, 0),
        new THREE.Vector3(0, 6, 6),
        new THREE.Vector3(-6, 6, 0),
    );

    const secondL3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-6, 6, 0),
        new THREE.Vector3(0, 6, -6),
        new THREE.Vector3(6, 6, 0),
    );

    const thirdConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(6, 6, 0),
        new THREE.Vector3(8, 8, 0),

    );

    //level 4
    const firstL4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(8, 8, 0),
        new THREE.Vector3(0, 8, 8),
        new THREE.Vector3(-8, 8, 0),
    );

    const secondL4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-8, 8, 0),
        new THREE.Vector3(0, 8, -8),
        new THREE.Vector3(8, 8, 0),
    );

    const fourthConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(8, 8, 0),
        new THREE.Vector3(10, 10, 0),

    );


    //level 5
    const firstL5CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(10, 10, 0),
        new THREE.Vector3(0, 10, 10),
        new THREE.Vector3(-10, 10, 0),
    );

    const secondL5CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-10, 10, 0),
        new THREE.Vector3(0, 10, -10),
        new THREE.Vector3(10, 10, 0),
    );

    const returnConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(10, 10, 0),
        new THREE.Vector3(0, 0, 0),

    );

    pointsPath.add(firstL1CurveLine);
    pointsPath.add(secondL1CurveLine);
    pointsPath.add(firstConnectLine);

    pointsPath.add(firstL2CurveLine);
    pointsPath.add(secondL2CurveLine);
    pointsPath.add(secondConnectLine);

    pointsPath.add(firstL3CurveLine);
    pointsPath.add(secondL3CurveLine);
    pointsPath.add(thirdConnectLine);

    pointsPath.add(firstL4CurveLine);
    pointsPath.add(secondL4CurveLine);
    pointsPath.add(fourthConnectLine);

    pointsPath.add(firstL5CurveLine);
    pointsPath.add(secondL5CurveLine);
    pointsPath.add(returnConnectLine);

    return pointsPath;
}


//Fortress
function createPointsPath2() {

    const pointsPath = new THREE.CurvePath();

    const firstCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(5, 0, -5),
        new THREE.Vector3(5, 10, 0),
        new THREE.Vector3(5, 0, 5),
    );


    const secondCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(5, 0, 5),
        new THREE.Vector3(0, 10, 5),
        new THREE.Vector3(-5, 0, 5),
    );

    
    const thirdCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-5, 0,  5),
        new THREE.Vector3(-5, 10, 0),
        new THREE.Vector3(-5, 0,  -5),
    );


    const fourthCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-5, 0, -5),
        new THREE.Vector3( 0, 10, -5),
        new THREE.Vector3( 5, 0, -5),
    );

    pointsPath.add(firstCurveLine);
    pointsPath.add(secondCurveLine);
    pointsPath.add(thirdCurveLine);
    pointsPath.add(fourthCurveLine);
    

    return pointsPath;
}

export {fetchPointsPath, fetchDisplayPath};

//call this during World Setup
/*
function createAllPaths() {
    pointPathType.CIRCLE = createPointsPath1();
    pointPathType.SQUARE = createPointsPath2();
    pointPathType.TRIANGLE = createPointsPath3();

    displayPathType.CIRCLE = createDisplayPath(pointPathType.CIRCLE);
    displayPathType.SQUARE = createDisplayPath(pointPathType.SQUARE);
    displayPathType.TRIANGLE = createDisplayPath(pointPathType.TRIANGLE);
}
*/

/*
function createPointsPath1() {

    const pointsPath = new THREE.CurvePath();
    const firstLine = new THREE.LineCurve3(
        new THREE.Vector3(7, 0, 0),
        new THREE.Vector3(-7, 0, 0)
    );
    const secondLine = new THREE.LineCurve3(
        new THREE.Vector3(-7, 0, 0),
        new THREE.Vector3(-7, 7, 0)
    );

    const thirdLine = new THREE.LineCurve3(
        new THREE.Vector3(-7, 7, 0),
        new THREE.Vector3(-7, 7, 7),
    );


    const bezierLine = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-7, 7, 7),
        new THREE.Vector3(-3.5, 10.5, 0),
        new THREE.Vector3(14.0, 10.5, 0),
        new THREE.Vector3(-7, 0, 7)
    );

    pointsPath.add(firstLine);
    pointsPath.add(secondLine);
    pointsPath.add(thirdLine);
    pointsPath.add(bezierLine);

    return pointsPath;
}
*/

/*
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

*/

/*
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
*/
