
import {
    TorusGeometry,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
    MeshPhongMaterial,
    Vector3,
} from 'three';


function createRing() {

    const radius = .4;
    const tubeRadius = .1;
    const radialSegments = 14;
    const tubularSegments = 48;
    const ringGeometry = new TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
    
    const material = new MeshPhongMaterial({ color: Math.random() * 0xffffff });
    // If flat shading is false, then ring appears smoother
    // material.flatShading = true;
    // create a Mesh containing the geometry and material
    const ring = new Mesh(ringGeometry, material);
    ring.castShadow = true;
    ring.receiveShadow = true;

    const radiansPerSecond = MathUtils.degToRad(30);

    // this method will be called once per frame [Not used]
    ring.tick = (delta) => {
        // increase the ring's rotation each frame
        ring.rotation.z += radiansPerSecond * delta;
        ring.rotation.x += radiansPerSecond * delta;
        ring.rotation.y += radiansPerSecond * delta;
    };

    return ring;

}

//Create a ring on the periphery of the platform
function createPlatformRing(){

    const radius = 10;
    const tubeRadius = .05;
    const radialSegments = 4;
    const tubularSegments = 120;
    const ringGeometry = new TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
    
    const material = new MeshPhongMaterial({ color:  0xdff0ff });
    const ring = new Mesh(ringGeometry, material);
    ring.castShadow = true;
    ring.receiveShadow = true;

    // console.log(ringGeometry.parameters);

    ring.rotateX(-Math.PI/2);
    ring.translateZ(-.1);
    
    const radiansPerSecond = MathUtils.degToRad(30);

    // this method will be called once per frame
    ring.tick = (delta) => {
        // increase the ring's rotation each frame
        ring.rotation.z += radiansPerSecond * delta;
        ring.rotation.x += radiansPerSecond * delta;
        ring.rotation.y += radiansPerSecond * delta;
    };

    return ring;
}


// Creates specified number of rings, randomly distributed on the given path
function createRingsArray(curvePath, noOfPoints) {

    const curvePoints = curvePath.curves.reduce((p, d) => [...p, ...d.getSpacedPoints(20)], []);

    console.log("curvePoints Length", curvePoints.length);

    if (curvePoints === null) {
        console.log("Null Curve Points");
    }
   
    // get an array of indices of random points on the path 
    let ringPositions =  getRndIndexArray(noOfPoints);


    console.log("Ring Positions", ringPositions);

    
    const ringsArray = [];

    //variables to help oriented rings perpendicular to the path
    const up = new Vector3(1, 0, 0);
    const axis = new Vector3();

    for (let i = 0; i < ringPositions.length; i++) {
        const ring = createRing();

        let index = ringPositions[i];
        const newPosition = curvePoints[index];
        //console.log("Curve Point at", ringPositions[i], ":" ,curvePoints[ringPositions[i]]);
        ring.position.copy(newPosition);

        const tangent = curvePath.getTangent(index / curvePoints.length);

        axis.crossVectors(up, tangent).normalize();
        const radians = Math.acos(up.dot(tangent));
        ring.quaternion.setFromAxisAngle(axis, radians);
        ring.rotateY(-Math.PI/2);

        ringsArray.push(ring);
        // console.log("Create Ring:", i, curvePoints[ringPositions[i]]);
    }

    return ringsArray;



    //Helper function
    function getRndIndexArray(noOfPoints) {

        let rndIndexArray = [];

        var pointsArrayLen = curvePoints.length;
        // console.log(pointsArrayLen);

        //setting min so that there is not point just very near the origin.
        var min = 10;
        var max = Math.floor(pointsArrayLen / noOfPoints);
        var increment = Math.floor((pointsArrayLen-10) / noOfPoints);

        for (let i = 0; i < noOfPoints; i++) {
            //Boundary condition safety
            if (min > pointsArrayLen) {

                min = pointsArrayLen-1;

            }  
            
            if (max > pointsArrayLen) {

                max = pointsArrayLen-1;

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

function createHeliRing() {

    const radius = 6;
    const tubeRadius = 2;
    const radialSegments = 14;
    const tubularSegments = 48;
    const ringGeometry = new TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);

    return ringGeometry;

}

export { createRing, createRingsArray, createPlatformRing, createHeliRing }