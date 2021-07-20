<!--
====================================================================
Copyright 2021 Google LLC
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 
========================================================================

@author Rikard Lindstrom <rlindstrom@google.com>
@author Vikram Jamwal <vikram.jamwal@gmail.com>

Change Log:

-->
<script>
    

    import { onMount } from "svelte";
    import { lastInference, sounds } from "../store";
    import soundManager from "../soundManager";
    // import threeView from "../three/threeView";
    import World from "../three_world/world";
    import StrokeCanvas from "./StrokeCanvas.svelte";

    let containerEl;
    let tinyWord;

    // Whenever the state changes, this reacts and the event of Stroke will be handled
    $: if ($lastInference && $lastInference.label) {
        handleInference($lastInference);
    }

    function handleInference() {
        // const index = $lastInference.index;
        if ($lastInference.score > 60) {
            // Change LogL call the triggerShape in the tinyWorld instead of threeView
            // threeView.triggerShape($lastInference.label);
            //tinyWorld.triggerShape($lastInference.label);
            World.triggerShape($lastInference.label);
            if ($sounds[$lastInference.label]) {
                soundManager.playSound(
                    $sounds[$lastInference.label].url,
                    127,
                    0.9
                );
            }
            //  soundManager.playSound($sounds[$lastInference.label].url, 127, 0.9 * 0.5);
        }
    }

    function handleDocKeyDown(e) {
        const shapeMap = {
            o: "circle",
            t: "triangle",
            s: "square",
        };
        if (Object.keys(shapeMap).includes(e.key)) {
            soundManager.userInit();
            $lastInference = {
                label: shapeMap[e.key],
                score: 100,
            };
        }
    }


  

    onMount(async () => {
        // Change Log: Comment out threeView commands
        // await threeView.load();
        document.addEventListener("keydown", handleDocKeyDown, false);
        // threeView.setup(containerEl);
        // Change Log: 3 lines added
        // const container = document.querySelector('#scene-container');
       
        // tinyWorld = new World.World(containerEl);
        World.setupWorld(containerEl);
        // start the animation loop
        World.start();

        return () => {
            document.removeEventListener("keydown", handleDocKeyDown, false);
        };
    });
</script>

<div id="astrowandPanel" class="panel">
    <div class="container" bind:this={containerEl}>
        <StrokeCanvas />
    </div>
</div>

<style lang="scss">
    .panel {
        background: linear-gradient(to top, #223647, #000a17);
        margin: 0;
        height:100%;
        width:100%;
        display: block;
        align-items: center;
        justify-content: center;
        .container {
            position: relative;
            padding: 0;
            height: 100%;
            width: 100%;
            display: block;
        }
    }
</style>
