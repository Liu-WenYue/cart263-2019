"use strict";

/********************************************************************

Something is Wrong on the Internet
Liu WenYue, 07 March 2019

This game is about a girl who was ignored by her parents and asked to
watch cartoon online on her own. However, as she watches the video,
there are videos containing horrible stuff which is not suitable for
kids. The main concept of this game is to illustrated the dangerous
and harmfulness of letting kids watching videos online without any
adult accompany ,and appeal to the parents to pay more attention to
their kids and spend more time with them.

For more detailed game description and the machanism of the game,
please refer to the README.md file located in this project file.

*********************************************************************/

// Variable that stores the starting scene of the game and video list.
let $gameStart;
let $videoList;

// Arrays that store bad and good videos.
let badVideos = [
  "assets/images/danger-v1.png",
  "assets/images/danger-v2.png",
  "assets/images/danger-v3.png",
  "assets/images/danger-v4.png",
  "assets/images/danger-v5.png",
  "assets/images/danger-v6.png",
  "assets/images/danger-v7.png",
  "assets/images/danger-v8.png",
  "assets/images/danger-v9.png",
  "assets/images/danger-v10.png",
  "assets/images/danger-v11.png",
  "assets/images/danger-v12.png",
  "assets/images/danger-v13.png",
  "assets/images/danger-v14.png",
];

let goodVideos = [
  "assets/images/safe-v1.png",
  "assets/images/safe-v2.png",
  "assets/images/safe-v3.png",
  "assets/images/safe-v4.png",
  "assets/images/safe-v5.png",
  "assets/images/safe-v6.png",
];


// Get the document setup!
$(document).ready(function () {
  // Save the game start gif in the variable.
  $gameStart = $('#game-start');
  // Have the gif play when the page is refreshed.
  $gameStart.attr('src','assets/images/start.gif');

  // Save the video list in the varaible.
  $videoList = $('#video-list');
  // Have the video list sortable.
  $videoList.sortable();


  $(document).on("keydown",function(e) {
    // If W is pressed, the game start page will be removed, and the screen
    // ui underneath will be visible.
    if (e.keyCode === 87) {
      $gameStart.remove();

      // Circle progress bar.
      $('#circle').circleProgress({
        value: 1,
        size: 80,
        fill: "tomato",
        thickness: 10,
        lineCap: "round",
        animation: { duration: 4000 },
        animationStartValue: 0.0,
      });
    }
  })
});
