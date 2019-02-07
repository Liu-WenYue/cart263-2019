"use strict";

// Store html elements and values in variables.
let $gear;
let $sisyphus;
let $coin;
let $tax;
let workingProgress = 0;
let bgImage;

// preload()
//
// To preload the background image.
function preload() {
  bgImage = loadImage("assets/images/bg.png");
}

// setup()
//
// Sets the canvas and image mode.
function setup() {
  createCanvas(1335,710);
  imageMode(CORNERS);
}

// draw()
//
// To draw the background image every frame.
function draw() {
  image(bgImage,105,0,1935,710);
}

$(document).ready(function() {
  // Assign all the id to its respective variables.
  $sisyphus = $('#sisyphus');
  $gear = $('#gear');
  $coin = $('#coin');
  $tax = $('#tax');

  // Call the starting dialog box.
  $('#dialog').dialog();

  // When key is down...
  $(document).on("keydown", function(e){
    // and the key is the spacebar, call gear and typing animation.
    if(e.keyCode === 32){
      $gear.attr('src','assets/images/gear.gif');
      $sisyphus.attr('src','assets/images/typing.gif');

      // and increases the working progress.
      $("#progressbar").progressbar({
        value: workingProgress++
      });
    }

    // else {
    //   $gear.attr('src','assets/images/gear00.png');
    //   $sisyphus.attr('src','assets/images/typing-anim00.png');
    // }

    // Relocate the progress bar on the screen.
    $( "#progressbar" ).offset({
      top: 660,
      left: 108
    });

    // When the current working progress is 70, have a coin generate in the scene.
    if(workingProgress === 70) {
      $coin.fadeIn(3000);
    }

    // When the current working progress is 100, have the coin disappear and the message pop out.
    if(workingProgress === 100) {
      workingProgress = 0;
      $coin.fadeOut(500);
      $tax.fadeIn(500);
      $tax.fadeOut(800);
    }
  });
});
