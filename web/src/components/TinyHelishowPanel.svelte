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
    import world from "../three_world/world";
    import StrokeCanvas from "./StrokeCanvas.svelte";
    

    let containerEl; //might not need this
    let panelEl;

    let levelValue;
    let pointsValue;
    let mistakesBar;
    let replayMessage;
    let info;

    // Whenever the state changes, this reacts and the event for new 'stroke' will be handled
    $: if ($lastInference && $lastInference.label) {
        handleInference($lastInference);
    }

    function handleInference() {
        if ($lastInference.score > 60) {
            world.triggerShape($lastInference.label);
            if ($sounds[$lastInference.label]) {
                soundManager.playSound(
                    $sounds[$lastInference.label].url,
                    127,
                    0.9
                );
            }
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
        document.addEventListener("keydown", handleDocKeyDown, false);
        world.setupWorld(panelEl,levelValue, pointsValue, mistakesBar,replayMessage, info);
        // start the animation loop
        world.start();
        return () => {
            document.removeEventListener("keydown", handleDocKeyDown, false);
        };
    });
</script>

<!--
<div id="astrowandPanel" class="panel" bind:this={panelEl}>
    <div class="container" bind:this={containerEl}>
        <StrokeCanvas />
    </div>
</div>
-->


<div class="game-holder" id="gameHolder">
    <div class="header">
        <h1><span>JBMJ!</span>TinyHeliShow</h1>
        <h2>make your manoeuvre</h2>
        <!--  -->
        <div class="score" id="score">
            <div class="score__content" id="level"> 
                <div class="score__label">level</div>
                <div class="score__value score__value--level" bind:this={levelValue}> <!--   id="levelValue"> -->  
                    1
                </div>
                <svg
                    class="level-circle"
                    id="levelCircle"
                    viewbox="0 0 200 200"
                >
                    <circle
                        id="levelCircleBgr"
                        r="80"
                        cx="100"
                        cy="100"
                        fill="none"
                        stroke="#d1b790"
                        stroke-width="24px"
                    />
                    <circle
                        id="levelCircleStroke"
                        r="80"
                        cx="100"
                        cy="100"
                        fill="none"
                        stroke="#68c3c0"
                        stroke-width="14px"
                        stroke-dasharray="502"
                    />
                </svg>
            </div>
            <div class="score__content" id="points">             
                <div class="score__label">points</div>
                <div class="score__value score__value--points" bind:this={pointsValue}>     <!--  id="pointsValue"> -->
                    000
                </div>
            </div>
            <div class="score__content" id="mistakes">
                <!-- </div>id="mistakes"> -->
                <div class="score__label">Mistakes</div>
                <div
                    class="score__value score__value--mistakes"
                    id="mistakesValue"
                >
                    <div class="mistakes-bar" bind:this={mistakesBar} />
                    <!-- id="mistakesBar" /> -->
                </div>
            </div>
        </div>
    </div>

    <div class="world" bind:this={panelEl}> </div>
    <!--<div class="world" bind:this={panelEl} />-->
     <!--id="world"-->

    <div class="message message--replay" bind:this={replayMessage}>
        Your Move
    </div>
    <!--  id="replayMessage" -->
    <div class="message message--info" bind:this={info}>
        Game Status<span>s-t-a-r-t</span>
    </div>
    <!--id="info" -->
</div>

<!--
<style lang="scss">

    @import url("https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,700&display=swap");

    .panel {
        background: linear-gradient(to top, #223647, #000a17);
        // margin: 0;
        //height:100%;
        //width:100%;
        display: flex;
        align-items: center;
        justify-content: center;

        height: 100vh;
        min-height: 800px;
        max-width: 100%;

        .container {
            position: relative;
            padding: 0;
            // height: 100%;
            // width: 100%;
            // display: flex;
            max-width: 100%;
        }
    }
</style>
-->
<style >

    @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,700,700italic');

    .game-holder {
	position: absolute;
	width: 100%;
	height: 100%;
	background: -webkit-linear-gradient(#e4e0ba, #f7d9aa);
	background: linear-gradient(#e4e0ba, #f7d9aa);
}
    .world {
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .header {
        position: absolute;
        top: 2vh; /* Mod: 8 to 2 */
        left: 0;
        width: 100%;
        text-align: left; /* Mod: center to left */
        pointer-events: none;
        z-index: 1; /* Mod:Added */
    }

    .header h1 {
        font-family: "Playfair Display";
        font-size: 4.5em;
        line-height: 1;
        margin: 0;
        letter-spacing: -0.025em;
        color: #d1b790;
    }

    .header h1 span {
        font-size: 0.2em;
        font-style: italic;
        display: block;
        margin: 0 0 -1.5em -7em;
        letter-spacing: 0px;
    }

    .header h2 {
        font-size: 0.585em;
        margin: 0.25em 0;
        white-space: nowrap;
        text-indent: 1em;
        letter-spacing: 1em;
        text-transform: uppercase;
        color: #d6483b;
    }

    .score {
        position: absolute; /* Mod: Added */
        top: 0vh; /* Mod: Added */

        width: 100%;
        margin: 2em 0 0;
        text-align: right; /* Mod: Center to Right*/
        white-space: nowrap;
    }

    .score__content {
        position: relative;
        display: inline-block;
        padding: 0 1em;
        vertical-align: top;
    }

    .score__content:nth-child(2) {
        border-right: 1px solid #d1b790;
        border-left: 1px solid #d1b790;
    }

    .score__label {
        font-size: 9px;
        position: relative;
        margin: 0 0 0.5em 0;
        text-align: center;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #d1b790;
    }

    .score__value {
        font-family: "Playfair Display";
        font-weight: bold;
        color: #d1b790;
    }

    .score__value--level {
        font-size: 26px;
        text-align: center;
    }

    .score__value--points {
        font-size: 30px;
    }

    .level-circle {
        position: absolute;
        left: 50%;
        width: 46px;
        margin: -37px 0 0 -23px;
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg);
    }

    .score__value--mistakes {
        position: relative;
        width: 60px;
        height: 8px;
        margin-top: 20px;
        border-radius: 3px;
        /*background-color: #f25346;*/
        background-color: #d1b790;
    }

    .mistakes-bar {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 2px;

        background-color: #f25346;
        -webkit-animation-name: none;
        animation-name: none;
        -webkit-animation-duration: 150ms;
        animation-duration: 150ms;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    .message {
        font-weight: bold;
        position: absolute;
        left: 0;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        pointer-events: none;
    }

    .message--replay {
        font-size: 1.25vw;
        bottom: 10vh; /* Mod: 40 - 10 */
        display: none;
        text-indent: 0.5em;
        letter-spacing: 0.5em;
        color: #d1b790;
    }

    .message--info {
        font-family: "Playfair Display";
        font-size: 0.85em;
        bottom: 8vh;
        letter-spacing: 0.2em;
        color: #68c3c0;
    }

    .message--info span {
        display: block;
        color: #d6483b;
        white-space: nowrap;
    }
</style>
