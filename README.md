
# TinyHeliShow
![theme](/readme_images/tiny-heli-show-theme.jpeg)
## Overview
**TinyHeliShow** 
is a novel 3D puzzle game. On every game play, it presents the players with a unique configuration of rings suspended in a 3D space. It then prompts the players to figure out a tiny helicopter manoeuvre that will solve the puzzle. The game is inspired from the RC Helicopter shows organized in different parts of the world. It adds an interesting element of puzzle solving to make it even more fun. 

TinyHeliShow is engaging on its own, but in a simple manner it also demonstrates:
- how TinyML can be incorporated into the games to create interactive fun experiences, and
- how multiple sets of gestures and game elements can be added to the game to create different game scenarios and challenges.

A screenshot of the game interface is shown below: ![here:](/readme_images/TinyHeliShow.png)

----

## Play setup


Using an elastic band, tape, or a piece of velcro, attach the board to the top of a mock or minature helicopter model. Alternatively, you can use a wand-like stick (about 1-2ft long or strech you arm fully forward). We will call this contraption: 'Tiny-Heli'. Make sure that the LED is facing upwards and hold the USB cable in your hand, making sure the USB/board connector is towards your wrist.

A Tiny-Heli can be easiy rigged up using a toy or a mock helicopter/airplane. Shown below is the Tiny-Heli setup that we are using.![Mock TinyML HeliCopter](/readme_images/mock-tinyml-copter.jpeg)


## Game Play
When the game starts, you will be prompted to make a relevant (any from your chosen set) Tiny-Heli gesture. This will set up the game corresponding to your chosen manoeuvre and gesture set.
Then, at the start of the play and after every successful move, you are presented with a new and a unique 3D puzzle. A set of rings are suspended in the space above a helicopter field. You have to figure out the helicopter manoeuvre that, once executed, will move through all the rings. Each 3D manoeuvre has a corresponding 2D Tiny-Heli gesture. With the help of your Tiny-Heli you will make the gesture corresponding to your solution. The game tiny helicopter will execute the manoeuvre in the game. See if your manoeuvre solves the puzzle. 

If you are successful, and depending upon your past performance, you will move on to the next puzzle in the same or the next level of the game.The game has three levels of difficulty. The number of rings gets reduced at each level, making it harder and harder to figure out the move. You can make a maximum of 3 mistakes in the game at any level. 

If you succeed at all the levels, you become the "**The Tiny Heli Master**"! *That is an honour!*


## Game Manoeuvre and Gesture Set
The game has been designed in a manner that the manoeurvres and the corresponding gesture sets can be easily added to the game in a modular fashion. At present, the game supports the following two sets of  3D-manoeuvres and their corresponding Tiny-Heli 2D-gesture sets:

Set ABG:

|   #   |  Heli Manoeuvre   | Tiny Heli Gesture    |
| :------------- | :----------: | -----------: |
|  1 | PETALS    | Alpa(α)   |
|  2 | RAINBOW   | Beta(β)   | 
|  3 | TORNADO  | Gamma(γ) | |

[ManoeuvreSet-PRT](/readme_images/Gestures-ABG.jpeg)


Set CST:
|   #   |  Heli Manoeuvre   | Tiny Heli Gesture*    |
| :------------- | :----------: | -----------: |
|  1 | GLOBE    | Circle(◯)   |
|  2 | FORTRESS | Square(▢)  | 
|  3 | TRΕΕ  | Triangle(△) | |

[ManoeuvreSet-GFT](/readme_images/Gestures-CST.jpeg)

At the start of the game application, you will be provided with the sketches that implement these gesture sets.
You can download and load the desired gesture sets on to your Tiny-Heli boards.

*At present, one of the Tiny-Heli gesture sets (set CST) is based on the Astrowand project set. So if you are using that set, you can also directly use the wand prepared for the Astrowand application without the need to download a sketch.


## Tips
- **For accuracy** - Point the Tiny-Heli away from you and draw the shapes relatively quickly, and not too large. 
- **For better mental visualization** - Adjust the orientation and zoom of the play area in the game to get the best view of the 3D rings for you. </p>

## Experiment description
 *TinyHeliShow* project is built with:
- [THREEJS](https://threejs.org/ "three") and standard web technologies (HTML, CSS & Javascript) 
- [TensorFlow Lite for Microcontrollers](https://www.tensorflow.org/lite/microcontrollers "TFL4M")
- [Arduino Sense 33 BLE](https://store.arduino.cc/usa/nano-33-ble-sense "Arduino Store")  
 

Other Tiny ML google experiments from which TinyHeliShow builds its understanding of using microcroller based tiny ML models are:

- [Air Snare](https://experiments.withgoogle.com/air-snare "Air Snare Google Experiment") lets you play the drums in the air.
- [Finger User Interface](https://experiments.withgoogle.com/finger-user-interface "FUI Google Experiment") or FUI (pronounced Foo-ey) lets you control connected devices with the wave of a finger.
- [Tiny Motion Trainer](https://experiments.withgoogle.com/tiny-motion-trainer "Tiny Motion Trainer") lets you train and test IMU based TFLite models in the browser.
- [Astrowand](https://experiments.withgoogle.com/astrowand "Astrowand") lets you draw shapes in the sky to form constellations.


----

## Tools

- Linux, MacOS or Windows computer with [Chrome](https://www.google.com/chrome/?brand=WHAR&geo=US&gclid=Cj0KCQjw9_mDBhCGARIsAN3PaFNRBCVUxmhR1QPA2LHaoELEr9yc1KkSNQ-Jc9KVZd8Sq2ux5gR6mJsaAm_6EALw_wcB&gclsrc=aw.ds "Chrome") installed. At the moment the game has only been tested on the Chrome browser running on MacOS.
- TensorFlow Microcontroller Challenge Kit by Sparkfun or [Arduino Nano BLE Sense 33](https://store.arduino.cc/usa/nano-33-ble-sense "Arduino Nano")
- [Micro USB](https://www.google.com/search?rlz=1C5CHFA_enUS858US858&sxsrf=ALeKk01CbJTvQbYgX6arJbsjcRVmv-3-RQ:1584929968297&q=Micro+USB+cable&spell=1&sa=X&ved=2ahUKEwjl8IOexK_oAhXDqZ4KHZ0mCmcQBSgAegQIDhAn&biw=1680&bih=832 "Micro USB") cable (If you're on a USB-C laptop, instead get a [USB-C to Micro USB](https://www.google.com/search?&q=USB-C+to+Micro+USB+cable "USB-C to Micro USB") cable)
- Rubberband / Tape / Velcro
- Toy Helicopter Model/ Stick, Wand, etc.
- [Optional] Battery / USB Power Bank (with appropriate current ratings)

----

## Install and Run the TinyHeliShow Game Application
- If your system does not have it, install node.js and npm
- Download or clone this project: "TinyHeliShow".
- Move to the 'web' directory.
- To install: "npm install".
- For development and run: "npm run dev".
- To run: "npm start".

## Install and Run the Microcontroller Software

*The following descriptions are the same as applicable to the other Google Tiny ML projects described above.*

Flashing: Using the Arduino Nano Sense 33 BLE

1. Install the [Arduino IDE ](https://www.arduino.cc/en/software "Arduino IDE")


2. Setup Arduino board:
    -  Plug in the board
    - Install the board by navigating to Tools > Board > Boards Manager and search for  Arduino Mbed OS Nano Boards. Full instructions (including drivers required for Windows) [here.](https://www.arduino.cc/en/Guide/NANO33BLESense/ "Arduino Guide")
    - FAQ for connection problems can be found [here.](https://github.com/tinyMLx/appendix/blob/main/ArduinoFAQ.md "Arduino Guide") 
    - After the board is installed, select it under to Tools > Board >  Arduino Mbed OS Nano Boards > Arduino Nano 33 BLE
![Arduino board](/readme_images/board.png)

    - Select the port by navigating to Tools -> Port -> dev/cu... (Arduino Nano 33 BLE)
![Arduino Port](/readme_images/port.png)


3. Install Arduino libraries 
    - Navigate to Tools > Manage Libraries
    - Search for and install:
    - Arduino_LSM9DS1
    - ArduinoBLE
    - Arduino_TensorFlowLite
![Manage libraries](/readme_images/library.png)
![TensorFlow Lite Library](/readme_images/tflib.png)

4. Open the sketch and flash
    - Download the  [Astrowand Arduino sketch file](https://experiments.withgoogle.com/astrowand/view/astrowand-arduino-sketch-v002.zip "file")
    - Unzip the downloaded Astrowand file, open the **Arduino** <folder> and double click on <astrowand.ino> file
    - Click the Right arrow in the top left corner to build and upload the sketch.  
![Arduino Port](/readme_images/buttons.png)

    - **Warning**: This process may take a few minutes. Also, warnings may populate but the upload should still succeed in spite of them.
    - If the sketch is installed, the LED on the board should flash red and green. 


5. Go to the URL related to the experiment. The URL can be found below and play!
    - [Astrowand](https://experiments.withgoogle.com/astrowand/view "Astrowand")

----

## FAQ & Common Errors

**What exactly is being transferred when I “connect”?**<br/>
When you’re connecting the board to your computer, a pre-trained TensorFlow Lite machine learning model gets transferred over BLE onto the device.

**What if I’m having issues connecting via bluetooth?**<br/>
If you are having issues connecting try the following: 
1. Make sure your browser (Chrome or Edge) supports Bluetooth and it is enabled. . 
2. Make sure your device (laptop, phone, etc) supports Bluetooth and that it is working and enabled..
3. Refresh the web page,unplug the Arduino power cable and then plug it back in to reset.  , then try connecting again.

*NOTE: If you’re using a managed device, like a computer from school or work, your device policy may prevent BLE pairing.*

**My board isn’t showing up on my computer, even though it’s plugged in. What should I do?**<br/>
Try unplugging the Arduino power cable and then plug it back in to reset. Make sure you see the RGB LED blink red, green, blue in a sequential order.

**The model isn’t getting my movements right. What do I do?**<br/>
The model isn’t getting my movements right. What do I do? With this experiment you need to follow the shapes as shown in the demo animations. Try to draw accurate shapes, at a relatively fast pace and don't make the shapes too oversized. If you look in the bottom right corner of the screen, you can see how accurate your drawings are, and perfect as needed.

**Do you have plans to support other boards?**<br/>
We made these projects to work specifically with the Arduino Nano, and we currently don’t have plans to expand support. However, all of the code is open sourced, so you can remix or modify as needed. 

**Where should I go from here if I want to make my own model or project?**<br/>
You can create your own model in several different ways. Check out these links: 

- [Experiments Collection](https://experiments.withgoogle.com/ "Experiments Collection") - Inspiration and more resources
- [Tiny Motion Trainer](https://experiments.withgoogle.com/tiny-motion-trainer/view "Tiny Motion Trainer") - Code-free motion trainer for microcontrollers
- [Teachable Machine](https://teachablemachine.withgoogle.com/ "Teachable Machine") - Code-free image model trainer
- [TensorFlow Lite for Microcontrollers](https://www.tensorflow.org/lite/microcontrollers "TensorFlow Lite for Microcontrollers") - Full documentation 
- [Free Harvard EdX Course](https://www.edx.org/professional-certificate/harvardx-tiny-machine-learning "Harvard X Course")  - In-depth course on TensorFlow Lite for Microcontrollers and the TinyML Ecosystem `

**"What sensors do the experiments use?"**<br/>
The IMU is a LSM9DS1. It is a 3-axis accelerometer, 3-axis gyroscope and 3-axis magnetometer. This chip, made by ST Microelectronics, is a standard component supported by our library ArduinoLSM9DS1. Read more here: https://www.arduino.cc/en/Guide/NANO33BLESense

**How do you shrink a TensorFlow model to fit on a microcontroller?**<br/>
Post-training quantization is a conversion technique that can reduce model size while also improving CPU and hardware accelerator latency, with little degradation in model accuracy. You can quantize an already-trained float TensorFlow model when you convert it to TensorFlow Lite format using the TensorFlow Lite Converter. Read more here: https://www.tensorflow.org/lite/performance/post_training_quantization


----

## Note

This is not an official Google product, but a collection of experiments that were developed at the Google Creative Lab. This is not a library or code repository that intends to evolve. Instead, it is a snapshot alluding to what’s possible at this moment in time.

We encourage open sourcing projects as a way of learning from each other. Please respect our and other creators’ rights, including copyright and trademark rights when present, when sharing these works and creating derivative work. If you want more info on Google's policy, you can find that [here.](https://about.google/brand-resource-center/ "Google Brand Resource Center")

----

