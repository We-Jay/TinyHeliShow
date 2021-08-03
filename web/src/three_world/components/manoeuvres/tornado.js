import * as THREE from 'three';


//Tornado 3
function createCurvePathTornado() {

    const curvePath = new THREE.CurvePath();

    //level 1
    const firstL1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(4, 2, 0),
        new THREE.Vector3(4, 2, 2),
        new THREE.Vector3(0, 2, 2),
    );

    const secondL1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 2, 2),
        new THREE.Vector3(-4, 2, 2),
        new THREE.Vector3(-4, 2, 0),
    );

    const thirdL1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-4, 2, 0),
        new THREE.Vector3(-4, 2, -2),
        new THREE.Vector3(0, 2, -2),
    );

    const fourthL1CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 2, -2),
        new THREE.Vector3(4, 2, -2),
        new THREE.Vector3(4, 2, 0),
    );

    const firstConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(4, 2, 0),
        new THREE.Vector3(6, 4, 0),

    );


    //level 2
    const firstL2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(6, 4, 0),
        new THREE.Vector3(6, 4, 4),
        new THREE.Vector3(0, 4, 4),
    );

    const secondL2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 4, 4),
        new THREE.Vector3(-6, 4, 4),
        new THREE.Vector3(-6, 4, 0),
    );

    const thirdL2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-6, 4, 0),
        new THREE.Vector3(-6, 4, -4),
        new THREE.Vector3(0, 4, -4),
    );

    const fourthL2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 4, -4),
        new THREE.Vector3(6, 4, -4),
        new THREE.Vector3(6, 4, 0),
    );

    const secondConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(6, 4, 0),
        new THREE.Vector3(8, 6, 0),

    );


    //level 3
    const firstL3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(8, 6, 0),
        new THREE.Vector3(8, 6, 6),
        new THREE.Vector3(0, 6, 6),
    );

    const secondL3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 6, 6),
        new THREE.Vector3(-8, 6, 6),
        new THREE.Vector3(-8, 6, 0),
    );

    const thirdL3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-8, 6, 0),
        new THREE.Vector3(-8, 6, -6),
        new THREE.Vector3(0, 6, -6),
    );

    const fourthL3CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 6, -6),
        new THREE.Vector3(8, 6, -6),
        new THREE.Vector3(8, 6, 0),
    );

    const thirdConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(8, 6, 0),
        new THREE.Vector3(10, 8, 0),

    );





    //level 4
    const firstL4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(10, 8, 0),
        new THREE.Vector3(10, 8, 8),
        new THREE.Vector3(0, 8, 8),
    );

    const secondL4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 8, 8),
        new THREE.Vector3(-10, 8, 8),
        new THREE.Vector3(-10, 8, 0),
    );

    const thirdL4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-10, 8, 0),
        new THREE.Vector3(-10, 8, -8),
        new THREE.Vector3(0, 8, -8),
    );

    const fourthL4CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 8, -8),
        new THREE.Vector3(10, 8, -8),
        new THREE.Vector3(10, 8, 0),
    );

    

   
    /*

    //level 2
    const firstL2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(4, 4, 0),
        new THREE.Vector3(0, 4, 6),
        new THREE.Vector3(-4, 4, 0),
    );

    const secondL2CurveLine = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-4, 4, 0),
        new THREE.Vector3(0, 4, -6),
        new THREE.Vector3(4, 4, 0),
    );

    const secondConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(4, 4, 0),
        new THREE.Vector3(6, 6, 0),

    );
    */

    /*
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

    */

    /*

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

    */
    /*
    const returnConnectLine = new THREE.LineCurve3(
        new THREE.Vector3(10, 10, 0),
        new THREE.Vector3(0, 0, 0),

    );
    */

    curvePath.add(firstL1CurveLine);
    curvePath.add(secondL1CurveLine);
    curvePath.add(thirdL1CurveLine);
    curvePath.add(fourthL1CurveLine);
    //curvePath.add(L1CurveLine);
    curvePath.add(firstConnectLine);

    curvePath.add(firstL2CurveLine);
    curvePath.add(secondL2CurveLine);
    curvePath.add(thirdL2CurveLine);
    curvePath.add(fourthL2CurveLine);
    curvePath.add(secondConnectLine);

    curvePath.add(firstL3CurveLine);
    curvePath.add(secondL3CurveLine);
    curvePath.add(thirdL3CurveLine);
    curvePath.add(fourthL3CurveLine);
    curvePath.add(thirdConnectLine);


    curvePath.add(firstL4CurveLine);
    curvePath.add(secondL4CurveLine);
    curvePath.add(thirdL4CurveLine);
    curvePath.add(fourthL4CurveLine);

    
    //curvePath.add(returnConnectLine);

    return curvePath;
}

export {createCurvePathTornado};