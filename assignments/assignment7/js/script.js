"use strict";

/*****************

Music Box
Pippin Barr

A simple example of procedural music generation using Pizzicato's
synthesis and soundfile playing abilities.

******************/

// Time for one note
const NOTE_TEMPO = 500;
// Time for one beat
const DRUM_TEMPO = 250;
// Attack time for a note (in seconds)
const ATTACK = 0.1;
// Release time for a note (in seconds)
const RELEASE = 0.1;

// We need an array of the possible notes to play as frequencies (in Hz)
// A Major =  A, B, C♯, D, E, F♯, and G♯
// We can get the frequencies of these notes from THE INTERNET, e.g.
// http://pages.mtu.edu/~suits/notefreqs.html
let frequencies = [
  220, 246.94, 277.18, 293.66, 329.63, 369.99, 415.30, 0
];
// The synth
let synth;
// The sound files
let kick;
let snare;
let hihat;

// Our drum pattern
// Each array element is one beat and has a string with each
// drum to play for that beat
// x = kick, o = snare, * = hihat
let pattern = ['x','*','xo*',' ','x','x','xo','*'];
// Which beat of the pattern we're at right now
let patternIndex = 0;

// Variable that stores the state of the playNote state,
// have it at the false state at default.
let playNoteState = false;


// setup()
//
// Creat canvas, set up the synth and sound files.
function setup() {
  createCanvas(windowWidth,windowHeight);

  // Instrcutions for the viewers.
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Click anywhere to start the music!",windowWidth/2,windowHeight/2);
  console.log(text);

  // Create the synth
  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'sine',
      attack: ATTACK,
      release: RELEASE,
      frequency: 220
    }
  });

  // Sets the synth's volume and the value for fade in and fade out.
  synth.volume = 0.5;
  synth.attack = 0.5;
  synth.release = 1;

  // Added the flanger effect to the synth.
  var flanger = new Pizzicato.Effects.Flanger({
    time: 0.45,
    speed: 0.2,
    depth: 0.1,
    feedback: 0.1,
    mix: 0.5
  });

  synth.addEffect(flanger);

  // Load the three drum sounds as wav files
  kick = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/kick.wav'
    }
  });

  // Added distortion on the kick.
  var distortion = new Pizzicato.Effects.Distortion({
      gain: 0.4
  });

  kick.addEffect(distortion);

  snare = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/snare.wav'
    }
  });

  hihat = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/hihat.wav'
    }
  });
}

// mousePressed
//
// Using this to start the note and drum sequences to get around
// user interaction (and to give the files time to load)
function mousePressed() {
  // If the playNoteState is at false...
  if (playNoteState === false) {
    // Use setTimeout for the notes to randomize the duration for each note.
    setTimeout(playNote,random(200,400));
    // Start an interval for the drums
    setInterval(playDrum,DRUM_TEMPO);
    // Set the playNoteState to true so that the playNote and the playDrum
    // will not be called multiple times.
    playNoteState = true;
    // To clear the text on screen by adding a white screen when music starts.
    background(255);
  }
}

// playNote
//
// Chooses a random frequency and assigns it to the synth
function playNote() {
  // Pick a random frequency from the array
  let frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
  // Set the synth's frequency
  synth.frequency = frequency;
  // If it's note already play, play the synth
  synth.play();
  // To have the playNote loop.
  setTimeout(playNote,random(200,500));
}

// playDrum()
//
// Checks the string representing the drums for the current beat
// and plays the appropriate sounds
function playDrum() {
  // Get the symbols for the current beat in the pattern
  let symbols = pattern[patternIndex];

  // If there's an 'x' in there, play the kick
  if (symbols.indexOf('x') !== -1) {
    kick.play();
  }
  // If there's an 'o' in there, play the snare
  if (symbols.indexOf('o') !== -1) {
    snare.play();
  }
  // If there's an '*' in there, play the hihat
  if (symbols.indexOf('*') !== -1) {
    hihat.play();
  }
  // Advance the pattern by a beat
  patternIndex = (patternIndex + 1) % pattern.length;
}

// draw()
//
// Nothing right now.

function draw() {
}
