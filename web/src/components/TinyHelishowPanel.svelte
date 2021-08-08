<!--
=============================================================================
Purpose: Creates the Tiny Heli-Show Interface and connects to the Game World
=============================================================================
@author Vikram Jamwal <vikram.jamwal@gmail.com>
-->

<script>
    import { onMount } from "svelte";
    import { lastInference, sounds } from "../store";
    import world from "../three_world/world";
    import StrokeCanvas from "./StrokeCanvas.svelte";

    let worldPanelEl;

    let levelValue;
    let pointsValue;
    let mistakesBar;
    let replayMessage;
    let info;
    let infohead;

    // Whenever the state changes, this reacts and the event for new 'stroke' will be handled
    $: if ($lastInference && $lastInference.label) {
        handleInference($lastInference);
    }

    function handleInference() {
        if ($lastInference.score > 60) {
            world.triggerShape($lastInference.label,$sounds);
        }
    }

    function handleDocKeyDown(e) {
        const shapeMap = {
            o: "circle",
            s: "square",
            t: "triangle",
            a: "alpha",
            b: "beta",
            g: "gamma",
        };

        if (Object.keys(shapeMap).includes(e.key)) {
            $lastInference = {
                label: shapeMap[e.key],
                score: 100,
            };
        }
    }

    onMount(async () => {
        document.addEventListener("keydown", handleDocKeyDown, false);
        world.setupWorld(
            worldPanelEl,
            levelValue,
            pointsValue,
            mistakesBar,
            replayMessage,
            info
        );
        // start the animation loop
        world.start();
        return () => {
            document.removeEventListener("keydown", handleDocKeyDown, false);
        };
    });
</script>



<div class="game-holder" id="gameHolder"> 
    <div class="header">
        <h1><span>JBMJ!</span>TinyHeliShow</h1>
        <h2>make your manoeuvre</h2>

        <div class="score" id="score">
          
            <div class="score__content" id="level">
                <div class="score__label">level </div>
                <div class="score__value score__value--level"  bind:this={levelValue}> 1 </div>
            </div>
             
            <div class="score__content" id="points">
                <div class="score__label">points </div>
                <div class="score__value score__value--points" bind:this={pointsValue}>0</div>
            </div>

            <div class="score__content" id="mistakes">          
                <div class="score__label">Mistakes</div>          
                <div class="score__value score__value--mistakes" id="mistakesValue">        
                    <div class="mistakes-bar" bind:this={mistakesBar}> </div>         
                </div>              
            </div>
        
        </div>
       
    </div>

    <div class="world" bind:this={worldPanelEl}> 
        <StrokeCanvas/>
    </div>

    <div class="info-head" bind:this={infohead}>
        Game Status
    </div>

    <div class="info" bind:this={info}>
        Setup
    </div>

    <div class="message--replay" bind:this={replayMessage}> 
       Make any valid Tiny-Heli gesture to setup the Show
    </div>
  
</div>


<style>
    @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap");

    * {
        margin: 0px;
        padding: 0px;
    }

    :root {
        /* Palette */
        --black-color: #000000;
        --blue-color: #13f4ef; /*#13F4EF*/
        --green-color: #86ff00; /*#86FF00;*/
        --red-color: #ff005c; /*#FF005C*/
        --yellow-color: #ffe596; /*FFBF00 */
        --cream-color: #d1b790;
    }

    .game-holder {
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--black-color);
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
        left: 2em;
        width: 100%;
        text-align: left; /* Mod: center to left */
        pointer-events: none;
        z-index: 1; /* Mod:Added */
    }

    .header h1 {
        font-family: "Orbitron", sans-serif;
        font-size: 4.5em;
        line-height: 1;
        margin: 0;
        letter-spacing: -0.025em;
        color: var(--yellow-color);
    }

    .header h1 span {
        font-size: 0.2em;
        font-style: italic;
        display: block;
        margin: 0 0 -1.5em -7em;
        letter-spacing: 0px;
    }

    .header h2 {
        font-family: "Orbitron", sans-serif;
        font-size: 1em;
        margin: 0em 0;
        white-space: nowrap;
        text-indent: 1.4em;
        letter-spacing: 1em;
        text-transform: uppercase;
        color: var(--red-color);
    }

    .score {
        font-family: "Orbitron", sans-serif;
        position: absolute; /* Mod: Added */
        top: 0vh; /* Mod: Added */
        width: 100%;
        /*margin: 2em 0 0;*/
        right: 2em;
        text-align: right; /* Mod: Center to Right*/
        white-space: nowrap;
    }

    .score__content {
        position: relative;
        display: inline-block;
        padding: 1em;
        vertical-align: top;
    }

    .score__content:nth-child(2) {
        border-right: 1px solid var(--yellow-color);
        border-left: 1px solid var(--yellow-color);
    }

    .score__label {
        font-family: "Orbitron", sans-serif;
        position: relative;
        font-size: 1.5em;
        margin: 0 0 0.5em 0;
        text-align: center;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: var(--red-color);
    }

    .score__value {
        font-family: "Orbitron", sans-serif;
        font-weight: bold;
        text-align: center;
        color: var(--blue-color);
    }

    .score__value--level {
        font-size: 1.5em;
        text-align: center;
    }

    .score__value--points {
        font-size: 1.5em;
    }

    .score__value--mistakes {
        position: relative;
        text-align: center;
        width: 120px;
        height: 10px;
        margin-top: 20px;
        border-radius: 6px;
        background-color: var(--yellow-color);
    }

    .mistakes-bar {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 2px;

        background-color: var(--red-color);      
    }


    .message--replay {
        position: absolute;
        left: 0;
        bottom: 5vh; 
        width: 100%;

        font-family: "Orbitron", sans-serif;
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        letter-spacing: 0.2em;
        color: var(--yellow-color);  
        pointer-events: none;
        display: block;     
    }

    .info-head{      
        position: absolute;
        left: 0; 
        bottom: 12vh;
        width: 20%;

        font-family: "Orbitron", sans-serif;
        font-size: 1.5em;
        text-transform: uppercase;
        letter-spacing: 0.2em; 
        color: var(--red-color);
        text-align: center;
        pointer-events: none;      
    }

    .info {
        position: absolute;
        left: 0; 
        bottom: 9vh;
        width: 20%;
        
        font-family: "Orbitron", sans-serif;
        font-size: 1.2em;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #68c3c0;
        text-align: center;
        pointer-events: none;   
    }

</style>
