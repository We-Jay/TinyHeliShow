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
@Modified by Vikram Jamwal <vikram.jamwal@gmail.com>

Change Log: 
1. import AstrowandPanel from "./components/AstrowandPanel.svelte"; to TinyhelishowPanel

2. AstrowandPanel changed to TinyhelishowPanel
-->
<script>
  import { onMount } from "svelte";
  import { onboardingStep, sounds } from "./store";

  // import AstrowandPanel from "./components/AstrowandPanel.svelte";
  import TinyHelishowPanel from "./components/TinyHelishowPanel.svelte";
  import SplashPanel from "./components/SplashPanel.svelte";
  import soundManager from "./soundManager";
  import Nav from "./components/Nav.svelte";
  import deviceInfo from "./deviceInfo";
  import NotSupportedBluetooth from "./components/NotSupportedBluetooth.svelte";
  import NotSupportedMobile from "./components/NotSupportedMobile.svelte";

  onMount(() => {
    soundManager.init();
    Object.values($sounds).forEach((sound) => {
      soundManager.loadSound(sound.url);
    });
    //$onboardingStep = 2;
    document.addEventListener("keydown", (e) => {
      const d = parseInt(e.key);
      if (d <= 3 && d >= 0) {
        $onboardingStep = d;
      }
    });
  });
</script>

{#if !deviceInfo.isBluetoothSupported}
  <NotSupportedBluetooth />
  >
{:else}
  {#if !deviceInfo.isDesktop}
    <NotSupportedMobile />
  {/if}
  <SplashPanel />
  {#if $onboardingStep >= 2}
    <TinyHelishowPanel />
  {/if}
  <Nav />
{/if}
