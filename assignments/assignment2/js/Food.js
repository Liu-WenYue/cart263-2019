// Food
//
// A class to represent food, mostly just involves the ability to be
// a random size and to reset

class Food extends Agent {

  // Constructor
  //
  // Pass arguments on to the super() constructor (e.g. for Agent)
  // Also set a minimum and maximum size for this food object which it
  // will vary between when it resets
  constructor(x,y,minSize,maxSize,minSpeed,maxSpeed) {
    super(x,y,random(minSize,maxSize),'#ffffff');
    this.vx = 0;
    this.vy = 0;
    this.tx = 0;
    this.ty = 0;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.minSize = minSize;
    this.maxSize = maxSize;
  }

  // update()
  //
  // Moves the food randomly on the screen
  update() {
    this.vx = map(noise(this.tx),0,1,-this.minSpeed,this.maxSpeed);
    this.vy = map(noise(this.ty),0,1,-this.minSpeed,this.maxSpeed);

    this.x += this.vx;
    this.y += this.vy;

    //Changes the time every frame.
    this.tx += 0.001;
    this.ty += 0.005;

    // Screen wrapping for food.
    if (this.x < 0) {
      this.x += windowWidth;
    }
    else if (this.x > windowWidth) {
      this.x -= windowWidth;
    }

    if (this.y < 0) {
      this.y += windowHeight;
    }
    else if (this.y > windowHeight) {
      this.y -= windowHeight;
    }
  }

  // reset()
  //
  // Set position to a random location on the canvas
  // Set the size to a random size within the limits
  reset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = random(this.minSize,this.maxSize);
    this.tx = random(0,1);
    this.ty = random(0,1);
  }
}
