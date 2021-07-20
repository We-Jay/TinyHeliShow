
import {
    TorusGeometry,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
    Vector3,
} from 'three';


function createRing() {

    const radius = .4;
    const tubeRadius = .1;
    const radialSegments = 8;
    const tubularSegments = 24;
    const ringGeometry = new TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);

    // a physically correct "standard" material
    const material = new MeshStandardMaterial({ color: Math.random() * 0xffffff });
    // create a Mesh containing the geometry and material
    const ring = new Mesh(ringGeometry, material);

    //ring.translateX (-1);
    //ring.translateY (1.2);
    //ring.translateZ (.3);

    ring.position.x = Math.random() * 10 - 4;
    ring.position.y = Math.random() * 10 - 4;
    ring.position.z = Math.random() * 10 - 4;

    //ring.rotation.set(-0.5, -0.1, 0.8);
    // ring.rotation.set(Math.random() * -1, Math.random() * -1 , Math.random() * 1);



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
function createRingsArray(pointsPath, noOfPoints) {

    const points = pointsPath.curves.reduce((p, d) => [...p, ...d.getPoints(20)], []);
   
    // get an array of indices of random points on the path 
    let ringPositions=  getRndIndexArray(noOfPoints);
    
    const ringsArray = [];

    //variables to help oriented rings perpendicular to the path
    const up = new Vector3(1, 0, 0);
    const axis = new Vector3();

    for (let i = 0; i < ringPositions.length; i++) {
        const ring = createRing();
        let index = ringPositions[i];
        ring.position.set(points[index].x, points[index].y, points[index].z);
        //ring.position.copy(points[index]);

        const tangent = pointsPath.getTangent(index / points.length);

        axis.crossVectors(up, tangent);// .normalize();
        const radians = Math.acos(up.dot(tangent));
        ring.quaternion.setFromAxisAngle(axis, radians);


        ringsArray.push(ring);
        // console.log("Create Ring:", i, points[ringPositions[i]]);
    }

    return ringsArray;



    //Helper function
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









export { createRing, createRingsArray }