"use strict";

/*****************

OOP Circle Eater
Pippin Barr

An Object-Oriented version of the Circle Eater program.
The player moves a circle around with the mouse.
Another circle represents food which the player eats by overlapping.
The player circle shrinks over time, but grows when it eats.

******************/

// Constants for key quantities
const AVATAR_MAX_SIZE = 64;
const AVATAR_SIZE_LOSS_PER_FRAME = .1;
const FOOD_MIN_SIZE = 25;
const FOOD_MAX_SIZE = 80;
const FOOD_MIN_SPEED = 5;
const FOOD_MAX_SPEED = 10;
const NUM_OF_FOODS = 5;

// Variables to store the two key objects
let avatar;
let foods = [];


// preload()
//
// Not needed

function preload() {

}


// setup()
//
// Create the canvas, avatar, and food, disable the cursor

function setup() {
  createCanvas(windowWidth,windowHeight);
  noCursor();
  avatar = new Avatar(mouseX,mouseY,AVATAR_MAX_SIZE,AVATAR_SIZE_LOSS_PER_FRAME);
  for (let i = 0; i < NUM_OF_FOODS; i++) {
    foods.push(new Food(random(0,width),random(0,height),random(FOOD_MIN_SIZE,FOOD_MAX_SIZE),random(FOOD_MIN_SIZE,FOOD_MAX_SIZE),random(FOOD_MIN_SPEED,FOOD_MAX_SPEED),random(FOOD_MIN_SPEED,FOOD_MAX_SPEED),random(0,1),random(0,1)));
  }
}


// draw()
//
// Clear the background
// Update the avatar and check for eating
// Display the avatar and food

function draw() {
  background("#ff8288");

  avatar.update();
  if (avatar.collide(foods)) {
    avatar.eat(foods);
  }

  avatar.display();

  for (let i = 0; i < foods.length; i++) {
    foods[i].update();
    foods[i].display();
  }
}
