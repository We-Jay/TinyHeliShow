import * as THREE from 'three'; // '/node_modules/three/build/three.module.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';

//import * as THREEMESH from "./THREE.MeshLine";

//Curve path consists of set of curves
let curvePathType = {
    GLOBE: createCurvePath1(),
    FORTRESS: createCurvePath2(),
    TORNADO: createCurvePath3(),
}

/*
//Display path contains discrete points
let displayPathType = {
    GLOBE:createDisplayPath(curvePathType.GLOBE),
    FORTRESS: createDisplayPath(curvePathType.FORTRESS),
    TORNADO: createDisplayPath(curvePathType.TORNADO),
}



let chosenPath;
let chosenPathPoints;


function setChosenPath(pathType){
    switch (pathType) {
        case 1:
            return curvePathType.GLOBE;
        case 2:
            return curvePathType.FORTRESS;
        case 3:
            return curvePathType.TORNADO;
    } 
}

*/




function fetchCurvePath(pathType) {
    switch (pathType) {
        case 1:
            return curvePathType.GLOBE;
        case 2:
            return curvePathType.FORTRESS;
        case 3:
            return curvePathType.TORNADO;
    }
}


//includes the pre and post movement of the helicopter move
function fetchFullCurvePath(pathType) {
    switch (pathType) {
        case 1:
            return curvePathType.GLOBE;

        case 2: {
            const curvePath = new THREE.CurvePath();

            const startConnectLine1 = new THREE.LineCurve3(
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 1, 0),
            )
            const startConnectLine2 = new THREE.LineCurve3(
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(5, 1, -5),
            )
            const startConnectLine3 = new THREE.LineCurve3(
                new THREE.Vector3(5, 1, -5),
                new THREE.Vector3(5, 0, -5),
            )
            curvePath.add(startConnectLine1);
            curvePath.add(startConnectLine2);
            curvePath.add(startConnectLine3);

            curvePath.add(curvePathType.FORTRESS);

            const returnConnectLine1 = new THREE.LineCurve3(
                new THREE.Vector3(5, 0, -5),
                new THREE.Vector3(5, 1, -5),
            )
            const returnConnectLine2 = new THREE.LineCurve3(
                new THREE.Vector3(5, 1, -5),
                new THREE.Vector3(0, 1, 0),
            )
            const returnConnectLine3 = new THREE.LineCurve3(
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(0, 0, 0),
            )
            curvePath.add(returnConnectLine1);
            curvePath.add(returnConnectLine2);
            curvePath.add(returnConnectLine3);
            return curvePath;
        }

        case 3: {
            const curvePath = new THREE.CurvePath();

            const startConnectLine = new THREE.LineCurve3(
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(2, 2, 0),
            )
            curvePath.add(startConnectLine);

            curvePath.add(curvePathType.TORNADO);

            const returnConnectLine = new THREE.LineCurve3(
                new THREE.Vector3(10, 10, 0),
                new THREE.Vector3(0, 0, 0),
            )
            curvePath.add(returnConnectLine);

            return curvePath;
        }

    }
}


/*
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

*/

//Creates display path object for scene display
function createDisplayPath(curvePath) {

    const material = new THREE.LineBasicMaterial({ color: 0x9132a8 });
    const points = curvePath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // console.log(points);
    return new THREE.Line(geometry, material);

    /*
    const line = new THREEMESH.MeshLine();
    line.setVertices(points);
    const material = new THREEMESH.MeshLineMaterial();
    const mesh = new THREE.Mesh(line, material);
    return mesh;
    */
}

function createPathPoints(curvePath) {

    const points = curvePath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
    // console.log(points);
    return points;
}

//New Add
function createPartialDisplayPath(pointsArray) {
    // const material = new THREE.LineBasicMaterial({ color: 0x9132a8 });
    // const geometry = new THREE.BufferGeometry().setFromPoints(pointsArray);
    // return new THREE.Line(geometry, material);

    let positions = [];
    for (let i = 0, l = pointsArray.length; i < l; i++) {
        positions.push(pointsArray[i].x, pointsArray[i].y, pointsArray[i].z);
    }

    const geometry = new LineGeometry();
    geometry.setPositions(positions);
    //const colors = new THREE.Color();
    

    // material
    var material = new LineMaterial({ color: 0x808080, linewidth: 10, transparent:true });
    material.uniforms.opacity.value = 0.5;
    material.resolution.set(window.innerWidth, window.innerHeight);

    // line
    let fatLine = new Line2(geometry, material);

    return fatLine;

    /*
    
        geometry.setColors( colors );
    
        let matLine = new LineMaterial( {
    
            color: 0xffff00 ,
            linewidth: 15, // in pixels
            vertexColors: true,
            //resolution:  // to be set by renderer, eventually
            dashed: false,
            alphaToCoverage: true,
    
        } );
    
        matLine.uniforms.opacity.value = 0.5 
    
        let fatLine = new Line2(geometry, matLine);
        
        fatLine.computeLineDistances();
        fatLine.scale.set( 1, 1, 1 );
        return fatLine;
        
        */

    /*
    const line = new THREEMESH.MeshLine();
    line.THREEMESH.setVertices(pointsArray);
    const material = new THREEMESH.MeshLineMaterial();
    const mesh = new THREE.Mesh(line, material);
    return mesh;
    */

}


/*

//New add
function createFractionDisplayPath(fraction, curvePath) {

    
    const material = new THREE.LineBasicMaterial({ color: 0x7FFFD4 });
    const points = curvePath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
    const upperIndex = Math.floor(points.length * fraction);
    console.log( "UpperIndex Point:", points[upperIndex]);


    const pointsSection = points.slice(0, upperIndex);

    const geometry = new THREE.BufferGeometry().setFromPoints(pointsSection);
    //console.log("Full Points",points);
    return new THREE.Line(geometry, material);
    
}

*/


//Helper function: gives sample points from the points Path
function createSelectPointsArray(curvePath, noOfPoints) {
    const points = curvePath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
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


//Globe 1
function createCurvePath1() {

    const curvePath = new THREE.CurvePath();

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

//Fortress 2
function preMovePath2() {

}
function postMovePath2() {

}
function createCurvePath2() {

    const curvePath = new THREE.CurvePath();

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
        new THREE.Vector3(-5, 0, 5),
        new THREE.Vector3(-5, 10, 0),
        new THREE.Vector3(-5, 0, -5),
    );


    const fourthCurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-5, 0, -5),
        new THREE.Vector3(0, 10, -5),
        new THREE.Vector3(5, 0, -5),
    );

    curvePath.add(firstCurveLine);
    curvePath.add(secondCurveLine);
    curvePath.add(thirdCurveLine);
    curvePath.add(fourthCurveLine);


    return curvePath;
}

//Tornado 3
function createCurvePath3() {

    const curvePath = new THREE.CurvePath();

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

    /*
    const returnConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(10, 10, 0),
        new THREE.Vector3(0, 0, 0),

    );
    */

    curvePath.add(firstL1CurveLine);
    curvePath.add(secondL1CurveLine);
    curvePath.add(firstConnectLine);

    curvePath.add(firstL2CurveLine);
    curvePath.add(secondL2CurveLine);
    curvePath.add(secondConnectLine);

    curvePath.add(firstL3CurveLine);
    curvePath.add(secondL3CurveLine);
    curvePath.add(thirdConnectLine);

    curvePath.add(firstL4CurveLine);
    curvePath.add(secondL4CurveLine);
    curvePath.add(fourthConnectLine);

    curvePath.add(firstL5CurveLine);
    curvePath.add(secondL5CurveLine);
    //curvePath.add(returnConnectLine);

    return curvePath;
}




export { fetchCurvePath, createDisplayPath, createPathPoints, fetchFullCurvePath, createPartialDisplayPath };

//call this during World Setup
/*
function createAllPaths() {
    curvePathType.CIRCLE = createCurvePath1();
    curvePathType.SQUARE = createCurvePath2();
    curvePathType.TRIANGLE = createCurvePath3();

    displayPathType.CIRCLE = createDisplayPath(curvePathType.CIRCLE);
    displayPathType.SQUARE = createDisplayPath(curvePathType.SQUARE);
    displayPathType.TRIANGLE = createDisplayPath(curvePathType.TRIANGLE);
}
*/

/*
function createCurvePath1() {

    const curvePath = new THREE.CurvePath();
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

    curvePath.add(firstLine);
    curvePath.add(secondLine);
    curvePath.add(thirdLine);
    curvePath.add(bezierLine);

    return curvePath;
}
*/

/*
function createCurvePath2() {

    const curvePath = new THREE.CurvePath();
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

    curvePath.add(firstLine);
    curvePath.add(secondLine);
    curvePath.add(bezierLine);

    return curvePath;
}

*/

/*
function createCurvePath3() {

    const curvePath = new THREE.CurvePath();

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

    curvePath.add(firstCurveLine);
    curvePath.add(secondCurveLine);
    curvePath.add(cubicBezierLine);

    return curvePath;
}
*/
