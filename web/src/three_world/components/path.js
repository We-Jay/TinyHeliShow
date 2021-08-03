import * as THREE from 'three'; // '/node_modules/three/build/three.module.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

import { createCurvePathGlobe } from "./manoeuvres/globe.js";
import { createCurvePathFortress } from "./manoeuvres/fortress.js";
import { createCurvePathTree } from "./manoeuvres/tree.js";

import { createCurvePathPetals } from "./manoeuvres/petals.js";
import { createCurvePathRainbow } from "./manoeuvres/rainbow.js";
import { createCurvePathTornado } from "./manoeuvres/tornado.js";


//Curve path consists of set of curves
let curvePathSetGFT = {
    GLOBE: createCurvePathGlobe(), //1
    FORTRESS: createCurvePathFortress(),//2
    TREE: createCurvePathTree(),//3

}

let curvePathSetPRT = {
    PETALS: createCurvePathPetals(),//4
    RAINBOW: createCurvePathRainbow(), //5
    TORNADO: createCurvePathTornado(), //6
}

function fetchCurvePath(setType, pathType) {
    if (setType === 'GFT') {
        switch (pathType) {
            case "GLOBE":
                return curvePathSetGFT.GLOBE;
            case "FORTRESS":
                return curvePathSetGFT.FORTRESS;
            case "TREE":
                return curvePathSetGFT.TREE;
            default:
                console.log("Unknown Path Type");
        }
    }
    else if (setType === 'PRT') {
        switch (pathType) {
            case "PETALS":
                return curvePathSetPRT.PETALS;
            case "RAINBOW":
                return curvePathSetPRT.RAINBOW;
            case "TORNADO":
                return curvePathSetPRT.TORNADO;
            default:
                console.log("Unknown Path Type")
        }
    }
    else {
        console.log("Unknown Set Selected");
    }

}

/*
function fetchCurvePathDirect(pathType) {
    switch (pathType) {
        case "GLOBE":
            return curvePathSet.GLOBE;
        case "FORTRESS":
            return curvePathSet.FORTRESS;
        case "TREE":
            return curvePathSet.TREE;
        case "PETALS":
            return curvePathSet.PETALS;
        case "RAINBOW":
            return curvePathSet.RAINBOW;
        case "TORNADO":
            return curvePathSet.TORNADO;

    }
}
*/



//includes the pre and post movement of the helicopter move
function fetchFullCurvePath(setType, pathType) {

    if (setType === 'GFT') {

        switch (pathType) {
            //GLOBE
            case "GLOBE": {
                return curvePathSetGFT.GLOBE;
            }

            // FORTRESS
            case "FORTRESS": {

                const curvePath = new THREE.CurvePath();
                const startConnectLine = new THREE.QuadraticBezierCurve3(
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(3.5, 2, -3.5),
                    new THREE.Vector3(6, 0, -6),
                );
                const returnConnectLine = new THREE.QuadraticBezierCurve3(
                    new THREE.Vector3(6, 0, -6),
                    new THREE.Vector3(3.5, 2, -3.5),
                    new THREE.Vector3(0, 0, 0),
                );
                curvePath.add(startConnectLine);
                curvePath.add(curvePathSetGFT.FORTRESS);
                curvePath.add(returnConnectLine);
                return curvePath;
            }

            //TREE
            case "TREE": {
                const curvePath = new THREE.CurvePath();
                const startConnectLine = new THREE.LineCurve3(
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 2, 0),
                )
                const returnConnectLine = new THREE.LineCurve3(
                    new THREE.Vector3(0, 2, 0),
                    new THREE.Vector3(0, 0, 0),
                )
                curvePath.add(startConnectLine);
                curvePath.add(curvePathSetGFT.TREE);
                curvePath.add(returnConnectLine);
                return curvePath;
            }
            default:
                console.log("Unknown Path Type")
        }
    }
    else if (setType === 'PRT') { 
        switch (pathType) {

            //PETALS
            case "PETALS": {
                const curvePath = new THREE.CurvePath();
                const startConnectLine = new THREE.LineCurve3(
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 4, 0),
                )
                const returnConnectLine = new THREE.LineCurve3(
                    new THREE.Vector3(0, 4, 0),
                    new THREE.Vector3(0, 0, 0),
                )
                curvePath.add(startConnectLine);
                curvePath.add(curvePathSetPRT.PETALS);
                curvePath.add(returnConnectLine);
                return curvePath;
            }

            //RAINBOW
            case "RAINBOW": {
                const curvePath = new THREE.CurvePath();
                const startConnectLine = new THREE.LineCurve3(
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 2, .5),
                )
                const returnConnectLine = new THREE.LineCurve3(
                    new THREE.Vector3(0.5, 2, 0),
                    new THREE.Vector3(0, 0, 0),
                )
                curvePath.add(startConnectLine);
                curvePath.add(curvePathSetPRT.RAINBOW);
                curvePath.add(returnConnectLine);
                return curvePath;
            }

            //TORNADO
            case "TORNADO": {
                const curvePath = new THREE.CurvePath();
                const startConnectLine = new THREE.LineCurve3(
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(4, 2, 0),
                )
                const returnConnectLine1 = new THREE.LineCurve3(
                    new THREE.Vector3(10, 8, 0),
                    new THREE.Vector3(4, 2, 0),
                )
                const returnConnectLine2 = new THREE.LineCurve3(
                    new THREE.Vector3(4, 2, 0),
                    new THREE.Vector3(0, 0, 0),
                )
                curvePath.add(startConnectLine);
                curvePath.add(curvePathSetPRT.TORNADO);
                curvePath.add(returnConnectLine1);
                curvePath.add(returnConnectLine2);
                return curvePath;
            }
            default:
                console.log("Unknown Path Type")
        }
    }
    else {
        console.log("Unknown Set Selected");
    }
}



//Creates display path object for scene display
function createDisplayPath(curvePath) {

    const material = new THREE.LineBasicMaterial({ color: 0x9132a8 });
    const points = curvePath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // console.log(points);
    return new THREE.Line(geometry, material);

}

function createPathPoints(curvePath) {

    const points = curvePath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
    // console.log(points);
    return points;
}


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
    var material = new LineMaterial({ color: 0x808080, linewidth: 10, transparent: true });
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



export { fetchCurvePath, fetchFullCurvePath, createDisplayPath, createPartialDisplayPath, createPathPoints};

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
