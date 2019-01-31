"use strict";

/*****************

Raving Redactionist
Pippin Barr

You are redacting a document, but it keeps coming unredacted!
Click the secret information to hide it, don't let all the
secrets become revealed!

******************/

// A place to store the jQuery selection of all spans and secrets
let $spans;
let $secrets;

// A variable that stores the secret count.
let $secretCount;

// Variable that stores the number of secret words found
let numOfSecretsFound = 0;

// When the document is loaded we call the setup function
$(document).ready(setup);

// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  // Save the selection of all spans (since we do stuff to them multiple times)
  $spans = $('span').not('#secret-count').not('.secret');

  // Save the selection of all secrets.
  $secrets = $('.secret');

  // Save the selection of the secret count.
  $secretCount = $('#secret-count');

  // Set a click handler on the spans (so we know when they're clicked)
  $spans.on('click',spanClicked);

  // Set a mouseover handler on the secrets.
  $secrets.on('mouseover',secretMousedOver);

  // Set an interval of 500 milliseconds to update the state of the page
  setInterval(update,500);
};

// spanClicked()
//
// When a span is clicked we remove its revealed class and add the redacted class
// thus blacking it out
function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

// update()
//
// Update is called every 500 milliseconds and it updates all the spans on the page
// using jQuery's each() function which calls the specified function on _each_ of the
// elements in the selection
function update() {
  $spans.each(updateSpan);
}

// updateSpan()
//
// With a probability of 10% it unblanks the current span by removing the
// redacted class and adding the revealed class. Because this function is called
// by each(), "this" refers to the current element that each has selected.
function updateSpan() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
}

// secretMousedOver()
//
// It highlights the current span by removing the
// redacted class and adding the revealed class. Because this function is called
// by each(), "this" refers to the current element that each has selected.
function secretMousedOver() {
  $(this).addClass('found');
  $('.found').off('mouseover');

  // When the mouse is over the secret words, the number of secret words increases.
  numOfSecretsFound++;
  // Adds the number to the secret count.
  $secretCount.text(numOfSecretsFound);
}

// A version using anonymous functions:

// $(document).ready(function () {
//   $spans = $('span');
//
//   $spans.on('click',function () {
//     $(this).removeClass('revealed');
//     $(this).addClass('redacted');
//   });
//
//   setInterval(function () {
//     $spans.each(function () {
//       let r = Math.random();
//       if (r < 0.1) {
//         $(this).removeClass('redacted');
//         $(this).addClass('revealed');
//       }
//     });
//   },500);
// });
