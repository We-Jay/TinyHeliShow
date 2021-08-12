<script>
  import { strokeData } from "../store";

  let canvas;

  $: if ($strokeData) {
    handleStrokeData($strokeData);
  }

  function handleStrokeData(strokeData) {
    if (!canvas) return;

    const state = strokeData.state;
    if (state !== 1) return;

    const strokePoints = strokeData.points;
    const length = strokeData.length;

    const ctx = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var halfHeight = canvasHeight / 2;
    var halfWidth = canvasWidth / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = "#13f4ef"; 
    ctx.beginPath();
    for (var i = 0; i < length; ++i) {
      if (i >= strokePoints.length) {
        console.warn("stroke overflow", strokePoints.length, length);
        return;
      }
      var x = strokePoints[i].x;
      var y = strokePoints[i].y;

      var xCanvas = halfWidth + x * canvasWidth;
      var yCanvas = halfHeight - y * canvasHeight;

      if (i === 0) {
        ctx.moveTo(xCanvas, yCanvas);
      } else if (i == length - 1) {
        ctx.lineTo(xCanvas + 5, yCanvas + 5);
        ctx.lineTo(xCanvas - 5, yCanvas - 5);
        ctx.moveTo(xCanvas + 5, yCanvas - 5);
        ctx.moveTo(xCanvas - 5, yCanvas + 5);
      } else {
        ctx.lineTo(xCanvas, yCanvas);
      }
    }
    ctx.stroke();
  }
</script>

<div class="strokeCanvas_bg" />
<canvas id="strokeCanvas" bind:this={canvas} /> 

<!--width="256" height="256" /> -->

<style> 

:root {
        /* Palette */
        --black-color: #000000;
        --blue-color: #13f4ef; 
        --green-color: #86ff00; 
        --red-color: #ff005c; 
        --yellow-color: #ffe596;
        --cream-color: #d1b790;
  }

  .strokeCanvas_bg,
  #strokeCanvas {
    position: absolute;
    right: 8.4vw; 
    bottom: 4.2vw;
    width: 6.4vw; 
    height: 6.4vw;
    border-radius: 20%;
  }
  .strokeCanvas_bg {
    z-index: 8;
    background-size: .35vw .35vw; 
    
    background-image: linear-gradient(
        to right,
        #111153 .1vw, 
        transparent 0.1vw, 
      ),
      linear-gradient(to bottom,   #111153 0.1vw, transparent 0.1vw);
  }

  #strokeCanvas {
    z-index: 9;
    border: .1vw solid #ff005c ;
    background: radial-gradient(#00000000, #00000082);
  }

</style>