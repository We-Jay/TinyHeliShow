import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import {fetchCurvePath, createPathPoints} from "./path.js";

var line;
var MAX_POINTS = 50;

// update positions
function updatePositions() {

    //var positions = line.geometry.attributes.position.array;
    var positions = [];
    var x = 0;
    var y = 0;
    var z = 0;
    var index = 0;

    for (var i = 0, l = MAX_POINTS; i < l; i++) {

        x = (Math.random() - 0.5) * 5;
        y = (Math.random() - 0.5) * 5;
        z = (Math.random() - 0.5) * 5;

        positions[index++] = x;
        positions[index++] = y;
        positions[index++] = z;

    }

    line.geometry.setPositions(positions)

}

function updatePositionsFromCurves() {

    //var positions = line.geometry.attributes.position.array;
    var positions = [];
    var x = 0;
    var y = 0;
    var z = 0;
    var index = 0;
    var curve_index = 0;

    let curvePath = fetchCurvePath(2);
    let displayPath =  createPathPoints(curvePath);


    for (var i = 0, l = MAX_POINTS; i < l; i++) {

        x = displayPath[curve_index].x;//(Math.random() - 0.5) * 5;
        y = displayPath[curve_index].y;//(Math.random() - 0.5) * 5;
        z = displayPath[curve_index].z;//(Math.random() - 0.5) * 5;

        positions[index++] = x;
        positions[index++] = y;
        positions[index++] = z;

        curve_index++;

    }

    line.geometry.setPositions(positions)
}




function createFatLine() {


    // geometry
    var geometry = new LineGeometry();

    // attributes
    var positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
    geometry.setPositions(positions);


    // material
    var material = new LineMaterial({ color: 0xffff00, linewidth: 2 });
    material.resolution.set(window.innerWidth, window.innerHeight);

    // line
    line = new Line2(geometry, material);
    //scene.add( line );

    // update positions 
    //updatePositions();
    updatePositionsFromCurves()

    return line;

}





export { createFatLine };