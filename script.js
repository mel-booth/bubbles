var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var bubbles = [];

// Bubble function which takes five properties needed to create bubbles.
function Bubble(radius, speed, width, xPos, yPos){
  this.radius = radius;
  this.speed = speed;
  this.width = width;
  this.xPos = xPos;
  this.yPos = yPos;

  this.count = 0;

  var signAssist = Math.floor(Math.random() * 2);
    if (signAssist === 1){
      this.sign = -1;
    }
    else {
      this.sign = 1;
    }
}

Bubble.prototype.update = function () { //Prototype on Bubble object - every Bubble object created can call the update method.
  this.count += this.sign * this.speed; //If sign value is - count decreases, if sign value is + count increases.
  // To draw the bubbles
  context.beginPath(); //Start drawing
  context.arc(this.xPos + Math.cos(this.count / 100) * this.radius, this.yPos + Math.sin(this.count / 100) * this.radius, this.width, 0, Math.PI * 2, false); //Sets location and size of bubbles to be drawn
  context.closePath(); //Stop drawing
  context.fillStyle = "#e4d2e4"; //Defines color of bubbles
  context.fill();
};

//Function to create each bubble.
function drawBubbles(){
  for (var i=0; i<75; i++){ // New bubble gets created each time loop runs
    var randomX = Math.round(-200 + Math.random() * 1000); //Determine bubbles position on x axis (-200px so bubbles can move outside the canvas)
    var randomY = Math.round(-200 + Math.random() * 1000); // Determine bubbles position on y axis
    var speed = .2 + Math.random() * 3; // Determines random speed of bubble.
    var size = 5 + Math.random() * 75; // Determines random size of bubble.
    var radius = 50 + Math.random() * 75; //Determines random radius or bubble.

    var bubble = new Bubble (radius, speed, size, randomX, randomY); // Creates bubble object.
    bubbles.push(bubble); //Stores bubble object in bubble variable and adds it to the bubbles array.
  }
  drawUpdate();
}
drawBubbles();

function drawUpdate() {
  context.clearRect(0,0,800,800); //Clears canvas for new frame

    for (var i = 0; i<bubbles.length; i++){
      var myBubbles = bubbles[i];
      myBubbles.update();
    }
    requestAnimationFrame(drawUpdate); //Creates animation loop / calls itself
}
