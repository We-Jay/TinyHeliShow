/* ======================================================================
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
========================================================================*/

/**
* @autor Rikard Lindstrom <rlindstrom@google.com>
*/

import { get, readable, writable } from "svelte/store";

export const isConnected = writable(false);
export const isModelTransferred = writable(false);
export const lastInference = writable({});
export const strokeData = writable([]);
export const transferProgress = writable(0);
export const onboardingStep = writable(0);

export const sounds = readable({
  circle: {
    url: 'sounds/circle.mp3'
  },
  square: {
    url: 'sounds/square.mp3'
  },
  triangle: {
    url: 'sounds/triangle.mp3'
  }
});
