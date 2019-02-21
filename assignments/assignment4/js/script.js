"use strict";

/*****************

Eat Up
Pippin Barr

Using jQuery UI's draggable and droppable methods to
feed a hungry mouth!

Sounds:
Buzzing: https://freesound.org/people/soundmary/sounds/194931/
Chewing: https://freesound.org/people/InspectorJ/sounds/412068/

******************/

// Sound effects for the experience
let buzzSFX = new Audio("assets/sounds/buzz.mp3");
let crunchSFX = new Audio("assets/sounds/crunch.wav");
let laughSFX = new Audio("assets/sounds/laugh.mp3");

// Variable to hold our key elements
let $mouth;
let $fly;
let $spongebob;

$(document).ready(setup);

function setup() {
  // Get the fly element from the page
  $fly = $('#fly');
  // Make it draggable
  $fly.draggable();

  // Start up the buzzing of the fly
  buzzSFX.loop = true;
  buzzSFX.play();

  // Get the fly element from the page
  $spongebob = $('#spongebob');
  // Make it draggable,
  $spongebob.draggable({
    // Set the revert to valid will have spongebob only revert when it dropped
    // on the droppable object.
    revert: "valid",
    // When we start drag spongebob, the buzz and crunch sound will stop,
    // the spongebob laugh will start playing.
    start: function() {
      buzzSFX.pause();
      crunchSFX.pause();
      laughSFX.play();
    }
  });

  // Get the mouth element from the page
  $mouth = $('#mouth');
  // Make it droppable
  $mouth.droppable({
    // The drop option specifies a function to call when a drop is completed
    drop: handleDrop
  });
}

// flyDropped(event,ui)
//
// Called when a draggable element is dragged over the droppable element (the mouth)
// In this instance it can only be the fly (it's the only draggable element).
// The arguments 'event' and 'ui' are automatically passed by jQuery UI and contain
// helpful information about the event.
function handleDrop (event,ui) {
  // If spongebob is dropped on the droppable element, nothing will happen,
  // and spongebob will be revert back to its previous posiiton.
  if (ui.draggable.attr('id') === 'spongebob') {
    return;
  }

  else {
    // When we drop the fly into the mouth we should remove the fly from the page
    // ui contains a reference to the draggable element that was just dropped in ui.draggable
    // .remove() removes the select element from the page
    ui.draggable.remove(); // $fly.remove() would work here too
    // We should "close the mouth" by changing its image
    // .attr() lets us change specific attributes on HTML element by specifying the attribute
    // and then what we want to set it to - in this case the 'src' attribute to the closed image
    $(this).attr('src','assets/images/mouth-closed.png');
    // Now the fly is gone we should stop its buzzing
    buzzSFX.pause();
    // And start the crunching sound effect of chewing
    crunchSFX.play();
    // Use a setInterval to call the chew() function over and over
    let chewAnim = setInterval(chew,250);
  }
}


// chew()
//
// Swaps the mouth image between closed and open and plays the crunching SFX
function chew () {
  // We can use .attr() to check the value of an attribute to
  // In this case we check if the image is the open mouth
  if ($mouth.attr('src') === 'assets/images/mouth-open.png') {
    // If it is, we set the 'src' attribute to the closed mouth
    $mouth.attr('src','assets/images/mouth-closed.png');
  }
  else {
    // Otherwise the 'src' attribute must have been the closed mouth
    // so we swap it for the open mouth
    $mouth.attr('src','assets/images/mouth-open.png');
  }
}
