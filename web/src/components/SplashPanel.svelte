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
 // import { WebGLObjects} from "three";

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
        <h1>Tiny <br> Heli-Show</h1>
        <h2>Play a 3d-game puzzle using your mock helicopter. </h2>
      </div>
    </header>
    <div class="scroll-container">
      <section bind:this={topSectionEl}>
        <div class="row">
          <h3>Getting Started</h3>
          <p>
            Download and unzip this <a
              href="./astrowand-arduino-sketch-v002.zip"
              target="_blank">sketch file</a
            >.
          </p>
          <br />
          <p>
            Open the arduino/tinyhelishow folder and double click on tinyhelishow.ino
            file. The file will open in your Arduino IDE window. Check you are
            connected to the correct board and upload your file using the
            'right-pointing' arrow in the top left corner of the window. Upload
            may take a couple of minutes.
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
            Click the "connect" button below, then select "Tiny Heli Show" from the
            dialogue box.
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
              Using an elastic band, or piece of velcro, attach the board to the
              top of a wand-like stick (about 2ft long or strech you arm forward). 
              You may also attach the board to a mock/minature helicopter or airplane model. 
              Make sure the LED is facing upwards and hold the USB cable in your hand, making sure
              the USB/board connector is towards your wrist.
            </p>
            <br />
            <h3>Game Play</h3>
            <p>
              Get ready to draw out your heli-formations. There are three manoeuvres and corresponding control
              gestures to begin with:
            </p>
              <table >
                <tr>
                  <th>Heli Manoeuvre</th>
                  <th>Tiny Heli Gesture</th>
                </tr>
                <tr>
                  <td>GLOBE</td>
                  <td>Circle</td>
                </tr>
                <tr>
                  <td>FORTRESS</td>
                  <td>Square</td>
                </tr>
                <tr>
                  <td>TORNADO</td>
                  <td>Triangle</td>
                </tr>     
              </table>
          
          </div>
          <div class="row instruction-gif-row">
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

            <br />
          </div>
          <p>
            When prompted to solve the puzzle, figure out the manoeuvre that will provide coverage to all the rings. Then 
            draw out the corresponding Tiny Heli control gesture. The Tiny Helicopter will execute the manoeuvre in the game. 
            See if your manoeuvre solves the puzzle.
            The game will have three levels of difficulty. 
            You can make a maximum of 3 mistakes at any level. 
            If you clear all levels, you become the "The Tiny Heli Master"! 
            That is an honour!

          
          </p>
          <br />
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

          <p> Couple of tips for accuracy - point the wand/helicopter-model away from you and draw the shapes relatively quickly,
            and not too large. Please Note: At present, the Tiny Heli Gestures are based on the Google Tiny ML Experiments: Astrowand project set. 
            More Heli Manoeuvres and Tiny Heli gestures will be added to the game subsequently.


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

  .instruction-gif-row {
    img {
      display: inline-block;
      width: 92px;
      margin-right: 30px;
      border-radius: 50%;
    }
  }
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

  .instruction-image {
    border: 2px solid $fgColor;
    width: 100%;
  }
</style>
