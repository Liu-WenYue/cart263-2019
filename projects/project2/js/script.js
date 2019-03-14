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

// Variable that stores the starting chance of having a bad video.
let badnessChance = 0.2;
// Variable that stores the random probability of showing a video.
let probability = Math.random();
// Variable that stores the randomVideo.
let randomVideo;

// Variable that stores the starting opacity of the tint on the brain image.
let opacity = 0;

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
        value: progress,
        size: 80,
        fill: "tomato",
        thickness: 10,
        lineCap: "round",
        animation: { duration: 4000 },
        animationStartValue: 0.0,
      });
    }

    // When the circle progress bar ends...
    $('#circle').on('circle-animation-end',function () {
      // If the progress is equals to 1...
      if (progress === 1) {
        // The progress bar will redraw according to the properties I set above.
        $(this).circleProgress('redraw');
        // Calling function newRound.
        newRound();
      }
    });
  })
});

// newRound()
//
// Function that randomize the videos in the video list and add the first video
// in the main container.
function newRound() {
  // Random videos from the bad video array will be shown in the video list.
  $('.video').each(function () {
    // Calling function that decide the probability of good videos and bad videos
    // in the random video list.
    videoProbability();
    $(this).attr('src',randomVideo);
  });

  // The first video in the video list will be add to the main container.
  choice = $('#video-list').first().find('img').attr('src');
  $('#container-image').attr('src',choice);
}

// videoProbability()
//
// This function controls the probability of showing bad videos and good videos.
function videoProbability () {
  // The default value for badnessChance will be 0.2, this means,
  // at the start of the game, there will be 20% chance showing bad videos and
  // 80% chance showing good videos.
  if (probability < badnessChance) {
    randomVideo = badVideos[Math.floor(Math.random() * badVideos.length)];
    updateFilters(document.getElementById('brain'));
  }
  else {
    randomVideo = goodVideos[Math.floor(Math.random() * goodVideos.length)];
    // As there are more videos watched, the probability of having a bad video
    // will increases by 5%.
    badnessChance += 0.05;
  }
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
		}
	}

	// finally, apply the filters and have the image visiable.
	processFilters();
	img.style.visibility = "visible";
}
