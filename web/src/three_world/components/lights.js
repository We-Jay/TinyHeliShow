import { DirectionalLight, AmbientLight } from 'three';

function createLights() {

    const color =  0xFFFFFF;
    const intensity = 2;
    const light = new AmbientLight(color, intensity);
    return light;

}


function createLights2() {

    // Create a directional light
    const light = new DirectionalLight('white', 2);
    // move the light right, up, and towards us
    light.position.set(25, 50, 50);
    return light;
    
}



export { createLights, createLights2 };