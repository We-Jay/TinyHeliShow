// Stores the scene objects and clears them when not required.
class SceneKeeper {
    constructor(){
        this.gameLevelObjs = [];
    }

    add(object3D){
         this.gameLevelObjs.push(object3D);
    }

    removeLast(scene){
        scene.remove(this.gameLevelObjs.pop());
    }

    removeAll(scene){
        for (let i=0; i < this.gameLevelObjs.length; i++) {
            scene.remove(this.gameLevelObjs[i]);
        }
    }
}
export {SceneKeeper};


