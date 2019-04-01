"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// Declare the variables for the scene, camera and renderer.
let scene;
let camera;
let renderer;

// Get the document set up.
$(document).ready(function() {
  // Create a new scene, a perspective camera and a WEBGL renderer.
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();

  // Set the size of the renderer to the brower window size.
  renderer.setSize(window.innerWidth , window.innerHeight);

  // Add the renderer element to the html document.
  document.body.appendChild(renderer.domElement);
})
