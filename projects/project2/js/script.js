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
    }
  })
});
