import * as THREE from 'three'; 
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
    
    // Create using Standard Lines
    // const material = new THREE.LineBasicMaterial({ color: 0x9132a8 });
    // const geometry = new THREE.BufferGeometry().setFromPoints(pointsArray);
    // return new THREE.Line(geometry, material);

    //Create using Fat Lines
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

