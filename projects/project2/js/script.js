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

// Variable that stores the video that will be add to the main container.
let choice;
// Variable that stores the progress value.
let progress = 1;

// Variable that stores the randomVideo.
let randomVideo;

// Variable that stores the starting opacity of the tint on the brain image.
let opacity = 0;

// Variable that stores the command.
let commandPlay;


// Array that store bad and good videos.
let videos = [
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


  $(document).on("click",function() {
    // If player clicks on the screen, the game start page will be removed,
    // and the screen ui underneath will be visible.
      $gameStart.remove();

      // Circle progress bar.
      $('#circle').circleProgress({
        value: progress,
        size: 80,
        fill: "tomato",
        thickness: 10,
        lineCap: "round",
        animation: { duration: 4000 },
        animationStartValue: 0.0,
      });

    // When the circle progress bar ends...
    $('#circle').on('circle-animation-end',function () {
      // The progress bar will redraw according to the properties I set above.
      $(this).circleProgress('redraw');
      // Calling function newRound.
      newRound();
    });
  })

  // Calls the goodEnding here to check if the player says the command.
  goodEnding()

  // Add the above command that annyang will respond to.
  annyang.addCommands(commandPlay, true);
  // Have annyang to start listening to the commands.
  annyang.start();
});

// newRound()
//
// Function that randomize the videos in the video list and add the first video
// in the main container.
function newRound() {
  // The first video in the video list will be add to the main container.
  choice = $('#video-list').first().find('img').attr('src');
  $('#container-image').attr('src',choice);

  // If the word starting from the 14th character in the choice address
  // is the same as the word danger...(also means the image in the container
  // is a bad video)
  if (choice.indexOf('danger') === 14) {
    // The brain's opacity increases by 0.1
    opacity += 0.1;
    // Update filters on the brain.
    updateFilters(document.getElementById('brain'));

    // Calls the badEnding here.
    badEnding();
  }

  // Random videos from the bad video array will be shown in the video list.
  $('.video').each(function () {
    // Calling function that decide the probability of good videos and bad videos
    // in the random video list.
    randomVideo = videos[Math.floor(Math.random() * videos.length)];
    $(this).attr('src',randomVideo);
  });
}

// updateFilters(img)
//
// Function that refresh filters after various actions have been performed.
// This part of the code is from the paintbrush.js library.
function updateFilters(img) {
  console.log(img);

	// first, does the reference object have an original image in the DOM?
	var classList = (img.className.toLowerCase()).split(' ');
	for (var i = 0; i < classList.length; i++) {

		// quick reference
		var currentClass = classList[i];

		// okay, we're good, there's an original
		if (currentClass.substr(0, 7) == "pb-ref-") {

			// clear reference object's data-pb-* attributes
			flushDataAttributes(img);

			// go fetch the original and update the reference object source
			var original = document.getElementById("pb-original-" + currentClass.substr(7, currentClass.length - 7));
			placeReferenceImage(img, original.src, img);
			img.style.visibility = "hidden";

      // add the opacity attributes to our image.
      addAttribute(img, "data-pb-tint-opacity", opacity);
      addAttribute(img, "data-pb-tint-colour", "#000000");
		}
	}

	// finally, apply the filters and have the image visiable.
	processFilters();
	img.style.visibility = "visible";
}

// badEnding()
//
// function that have the conditional statement for the bad ending.
function badEnding() {
  // When the tint on the brain img reaches 1, shows the bad ending.
  if (opacity >= 1) {
    document.getElementById('bad-end').style.display = "block";
    document.getElementById('bad-end').style.zIndex = "100";
    console.log("bad-end");
  }
}

// goodEnding()
//
// This functions includes Annyang that listen to player's voice,
// It shows the good ending gif when the player ask the girl to play.
function goodEnding() {
  // If annyang is availble, when the voice input is "Do you want to play",
  // shows the good ending.
  if (annyang) {
      commandPlay = {
      'Do you want to play' : function () {
        document.getElementById('good-end').style.display = "block";
        document.getElementById('good-end').style.zIndex = "100";
      }
    };
  }
}
