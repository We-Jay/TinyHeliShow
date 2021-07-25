import {scene, startGame} from "../world.js";
import {clearGameLevelObjects} from "./SceneKeeper.js";



class FSM {
    constructor(loop){
       // this.game = game;
        this.state = "starting"
        this.loop = loop;
    }

    setState(state){
        switch (state) {
            case "starting":
                this.state = "starting";
                break;
            case "waiting-for-move":
                this.state = "waiting-for-move";
                break;
            case "making-move":
                this.state = "making-move";
                break;
            case "move-over":
                this.state = "move-over";
                //Pop out the airPlane
                this.loop.updatables.pop();
                clearGameLevelObjects(scene);
                startGame(); //Change to NextGameStep()
                break;
        }
        
      
    }

    getState(state){
        return this.state;
    }
      
}

export {FSM};