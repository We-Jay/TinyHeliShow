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

@autor Rikard Lindstrom <rlindstrom@google.com>

-->
<script>
  import { onMount } from "svelte";
  import { isConnected, onboardingStep } from "../store";

  import ConnectButton from "./ConnectButton.svelte";

  let stickyHeight = 0;
  let stickyEl;
  let containerEl;
  let topSectionEl;
  let topSectionElHeight = 0;
  let instructionSectionEl;

  let smallScreen = false;

  $: if ($onboardingStep === 1) {
    setTimeout(() => {
      instructionSectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }, 500);
  }

  $: if ($onboardingStep === 2) {
    setTimeout(() => {
      window.scrollTo({
        top: 99999999,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  }

  function handleResize() {
    const { height } = stickyEl.getBoundingClientRect();
    stickyHeight = (height / window.innerHeight) * 100;

    topSectionElHeight =
      (topSectionEl.getBoundingClientRect().height / window.innerHeight) * 100;

    smallScreen = window.innerWidth < 905;
  }

  function handleLetsGo() {
    if ($onboardingStep !== 2) {
      $onboardingStep = 2;
    } else {
      setTimeout(() => {
        window.scrollTo({
          top: 99999999,
          left: 0,
          behavior: "smooth",
        });
      });
    }
  }

  onMount(() => {
    handleResize();

    window.addEventListener("resize", handleResize, false);

    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  });
</script>

<div class="panel" class:onboarding-step-1={$onboardingStep >= 1}>
  <div class="container" bind:this={containerEl}>
    <header
      style={`height: ${
        smallScreen || $onboardingStep === 0
          ? "auto"
          : `${topSectionElHeight + stickyHeight}vh`
      }`}
    >
      <div class="sticky" bind:this={stickyEl}>
        <h1>Tiny HeliShow</h1>
        <h2>Play a novel 3D puzzle game using your tiny helicopter.</h2>
      </div>
    </header>
    <div class="scroll-container">
      <section bind:this={topSectionEl}>
        <div class="row">
          <h3>Getting Started</h3>

          <!--
          <p>
            Download and unzip this <a
               href="./astrowand-arduino-sketch-v002.zip"
              target="_blank">sketch file</a
            >.
          </p>
          -->

          <p>
            Download and unzip this <a
              href="./tinyhelishow-arduino-sketch-v001.zip"
              target="_blank">sketch file</a
            >.
          </p>

          <br />
          <p>
            There are two gesture sets: ABG (gestures: alpha, beta, gamma), 
            and CST (gestures: circle, square, triangle). 
            You can use either or both of these sets. 
            If you are using both, you may either create two different boards
            or load one sketch into a board, play a game, load the other sketch, 
            play a game, and so on.
            Open the folder arduino/tinyhelishow-abg (or arduino/tinyhelishow-cst) and double click on
            tinyhelishow-abg.ino (or tinyhelishow-cst.ino) file. The file will open in your Arduino IDE
            window. Check you are connected to the correct board and upload your
            file using the 'right-pointing' arrow in the top left corner of the
            window. Upload may take a couple of minutes.
          </p>
          <br />
          <p>
            Once uploaded, you're ready to go. If the sketch is installed
            successfully, the LED on the board should be green.
          </p>
          <br />
          <p>
            If you need more help getting started with your Arduino and sketch,
            visit the <a
              href="https://github.com/googlecreativelab/astrowand/blob/main/README.md"
              target="_blank">Getting Started Guide.</a
            >
          </p>

          <h4>Connect via Bluetooth</h4>
          <p>
            Click the "connect" button below, then select "TinyHeliShow-ABG" (or "TinyHeliShow-CSt") from
            the dialogue box.
          </p>
        </div>
        <div class="row">
          <ConnectButton />
        </div>
      </section>
      {#if $onboardingStep >= 1}
        <section class="instructions" bind:this={instructionSectionEl}>
          <div class="row">
            <h3>Play setup</h3>
            <p>
              Using an elastic band, tape, or a piece of velcro, attach the
              board to the top of a mock or minature helicopter model.
              Alternatively, you can use a wand-like stick (about 1-2ft long or
              strech you arm fully forward). We will call this contraption:
              'Tiny-Heli'. Make sure that the LED is facing upwards and hold the
              USB cable in your hand, making sure the USB/board connector is
              towards your wrist.
              
            </p>
            <br/>
            <h3>Game Manoeuvre and Gesture Sets</h3>
            <p>
              The game has been designed in a manner that the manoeurvres and
              the corresponding Tiny-Heli gesture sets can be easily added to
              the game in a modular fashion. At present, the game supports the
              following two sets of 3D-manoeuvres and the corresponding Tiny-Heli 2D-gestures:
            </p>
            
            <p>
              <font size="2" face="RobotoMono" />
              Set: ABG
            </p>
            <table>
              <tr>
                <th>3D Heli Manoeuvre</th>
                <th>2D Tiny Heli Gesture</th>
              </tr>
              <tr>
                <td>PETALS</td>
                <td>Alpha(α)</td>
              </tr>
              <tr>
                <td>RAINBOW</td>
                <td>Beta(β)</td>
              </tr>
              <tr>
                <td>TORNADO</td>
                <td>Gamma(γ)</td>
              </tr>
            </table>
          <p>
            <font size="2" face="RobotoMono" />
            Set: CST
          </p>
          <table>
            <tr>
              <th>3D Heli Manoeuvre</th>
              <th>2D Tiny Heli Gesture</th>
            </tr>
            <tr>
              <td>GLOBE</td>
              <td>Circle(◯)</td>
            </tr>
            <tr>
              <td>FORTRESS</td>
              <td>Square(▢)</td>
            </tr>
            <tr>
              <td>TREE</td>
              <td>Triangle(△)</td>
            </tr>
          </table>

          <br />
            <h3>Game Play</h3>
            <p>
              When the game starts, you will be prompted to make a relevant 
              (any from your chosen set)Tiny-Heli gesture. This will set up 
              the game corresponding to your chosen manoeuvre and gesture set.
              You will then be presented with a 3D puzzle. A set of rings will be
              suspended in the space above a helicopter field. You will have to
              figure out the helicopter manoeuvre that, once executed, will
              cover all the rings. Each 3D manoeuvre has a corresponding 2D tiny
              heli gesture. With the help of your Tiny-Heli you will make the
              gesture corresponding to your solution. The game tiny helicopter
              will execute the manoeuvre in the game. See if your manoeuvre
              solves the puzzle.
            </p>
            <br />
            <p>
              The game has three levels of difficulty. The number of rings gets
              reduced at each level, making it harder and harder to figure out
              the move. You can make a maximum of 3 mistakes in the game. If you
              clear all levels, you become the "The Tiny Heli Master"! That is
              an honour!
            </p>


          </div>




          <div class="row instruction-gif-row">
            <!--
            <img
              class="instruction-image"
              src="./images/Square.gif"
              alt="Square shape"
            />
            <img
              class="instruction-image"
              src="./images/Circle.gif"
              alt="Circle shape"
            />
            <img
              class="instruction-image"
              src="./images/Triangle.gif"
              alt="Triangle shape"
            />
          -->
        
            <p>Some Tips:</p>
            <ol>
              <li>
                For accuracy: Point the Tiny-Heli away from you and
                draw the shapes relatively quickly, and not too large.
              </li>
              <li>
                For better visualization: Adjust the orientation and zoom of the
                play area to get the best view of the 3D rings.
              </li>
            </ol>
          </div>
          <p>Ready for the Tiny Heli Show?</p>
          <br />

          <div class="row" class:inverted={$onboardingStep === 1}>
            <button on:click={handleLetsGo}>
              {#if $onboardingStep === 1}
                Let's Go
              {:else}
                Scroll Down ↓
              {/if}
            </button>
          </div>
        </section>
      {/if}
    </div>
  </div>
</div>

<!-- /container -->
<style lang="scss">
  @import "../scss/vars";

  .panel {
    min-height: 100vh;
    &.onboarding-step-1 {
      min-height: 180vh;
    }
    align-items: flex-start;
  }
  
  /*
  .instruction-gif-row {
    img {
      display: inline-block;
      width: 92px;
      margin-right: 30px;
      border-radius: 50%;
    }
  }
  */
  @media screen and (min-width: 905px) {
    .container {
      display: flex;
      flex-direction: row;
    }

    header {
      min-width: 448px;
      margin-right: 100px;
      padding-top: 17vh;
      .sticky {
        position: sticky;
        top: 17vh;
      }
    }

    .sticky {
      max-width: 448px;
    }
  }

  .scroll-container {
    min-height: 100vh;
    section {
      padding-bottom: 3vh;
      min-height: 80vh;
      padding-top: 17vh;
      &:first-child {
        padding-top: 17vh;
        padding-bottom: 3vh;
        min-height: 63vh;
      }
    }
  }

  section {
    max-width: 528px;
  }

  p {
    margin: 0;
  }

  .row {
    margin-bottom: 2rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  /*
  .instruction-image {
    border: 2px solid $fgColor;
    width: 100%;c
  }
  */

  table {
    //font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    
  }
</style>
