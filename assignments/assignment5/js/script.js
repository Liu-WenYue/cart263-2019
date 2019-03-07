"use strict";

/*****************

Slamina
rraB nippiP

A simple guessing game based on voice synthesis. The computer reads out an
animal name, but it reads it backwards. The user selects the animal they
think it is and either gets it right or wrong. If right, a new level is generated.
If wrong, the voice reads it out again.

Uses:

ResponsiveVoice
https://responsivevoice.org/

Animal names from:
https://github.com/dariusk/corpora/blob/master/data/animals/common.json

******************/

// An array of animal names that we use to create our guessing game
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

// We need to track the correct answer for each round
let correctAnimal;
// We also track all the possibly answers (mostly so we can switch their order around)
let answers = [];

// How many possible answers there are per round
const NUM_OPTIONS = 5;

// Variable that store the voice recognition command.
let commandGiveUp;
let commandSayAgain;

// Variables that store the number of animals found and the animal count.
let numOfAnimalsFound = 0;
let $animalCount;


// Get setup!
$(document).ready(setup);

// setup()
//
// In order to be able to play sound, our setup involves clicking once
// to actually start the game.
function setup() {
  $('#click-to-begin').on('click',startGame);

  // Save the selection of the animal-count in the variable.
  $animalCount = $('#animal-count');

  // If annyang is availble, when the voice input is "I give up"...
  if(annyang) {
    commandGiveUp = {
      'I give up' : function () {
        // Remove the current sets of buttons and start a new round.
        $('.guess').remove();
        newRound();
        // Once the user give up, the animal found will go back to zero.
        numOfAnimalsFound = 0;
        // Adds the number to the animal count.
        $animalCount.text(numOfAnimalsFound);
      }
    };

    // When the voice input is "Say it again"...
    commandSayAgain = {
      'Say it again' : function () {
        // Say the reversed animal name again.
        speakAnimal(correctAnimal);
      }
    }
  }

  // Add the above command that annyang will respond to.
  annyang.addCommands(commandGiveUp, true);
  annyang.addCommands(commandSayAgain, true);
  // Have annyang to start listening to the commands.
  annyang.start({ autoRestart: false });
}

// startGame()
//
// Remove the click to begin and set up a round of play
function startGame() {
  $('#click-to-begin').remove();

  newRound();
}

// newRound()
//
// Generates a set of possible answers randomly from the set of animals
// and adds buttons for each one. Then chooses the correct answer randomly.
function newRound() {
  // We empty the answer array for the new round
  answers = [];
  // Loop for each option we'll offter
  for (let i = 0; i < NUM_OPTIONS; i++) {
    // Choose the answer text randomly from the animals array
    let answer = animals[Math.floor(Math.random() * animals.length)];
    // Add a button with this label
    addButton(answer);
    // Add this answer to the answers array
    answers.push(answer);
  }

  // Choose a random answer from the answers as our correct answer
  correctAnimal = answers[Math.floor(Math.random() * answers.length)];

  // Say the name of the animal
  speakAnimal(correctAnimal);
}

// speakAnimal(name)
//
// Uses ResponsiveVoice to say the specified text backwards!
function speakAnimal(name) {
  // We create a reverse version of the name by:
  // 1. using .split('') to split the string into an array with each character
  // as a separate element.
  // e.g. "bat" -> ['b','a','t']
  // 2. using .reverse() on the resulting array to create a reverse version
  // e.g. ['b','a','t'] -> ['t','a','b']
  // 3. using .join('') on the resulting array to create a string version of the array
  // with each element forming the string (joined together with nothing in between)
  // e.g. ['t','a','b'] -> "tab"
  // (We do this all in one line using "chaining" because .split() returns an array for
  // for .reverse() to work on, and .reverse() returns an array for .join() to work on.)
  let reverseAnimal = name.split('').reverse().join('');

  // Set some random numbers for the voice's pitch and rate parameters for a bit of fun
  let options = {
    pitch: Math.random(),
    rate: Math.random()
  };

  // Use ResponsiveVoice to speak the string we generated, with UK English Male voice
  // and the options we just specified.
  responsiveVoice.speak(reverseAnimal,'UK English Male',options);
}

// addButton(label)
//
// Creates a button using jQuery UI on a div with the label specified
// and adds it to the page.
function addButton(label) {
  // Create a div with jQuery using HTML
  let $button = $('<div class="guess"></div>');
  // Set the text in the div to our label
  $button.text(label);
  // Turn the div into a button using jQuery UI's .button() method
  $button.button();
  // Listen for a click on the button which means the user has guessed
  $button.on('click',function () {
    // If the button they clicked on has a label matching the correct answer...
    if ($(this).text() === correctAnimal) {
      // Remove all the buttons
      $('.guess').remove();
      // Start a new round
      setTimeout(newRound,1000);

      // When the user found the correct animal, the number of animals found
      // increases by 1.
      numOfAnimalsFound++;
      // Adds the number to the animal count.
      $animalCount.text(numOfAnimalsFound);
    }
    else {
      // Otherwise they were wrong, so shake the button
      $(this).effect('shake');
      // And say the correct animal again to "help" them
      speakAnimal(correctAnimal);

      // Once the user get wrong, the animal found will go back to zero.
      numOfAnimalsFound = 0;
      // Adds the number to the animal count.
      $animalCount.text(numOfAnimalsFound);
    }
  });

  // Finally, add the button to the page so we can see it
  $('body').append($button);
}
