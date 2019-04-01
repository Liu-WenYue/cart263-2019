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

// Variable that stores the plane geomotry.
let plane;


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

  // Add plane geometry and material.
  let planeGeometry = new THREE.PlaneGeometry(10,10,1,1);
  let planeMaterial = new THREE.MeshBasicMaterial({color:0xcccccc});
  // Create plane using plane geometry and material.
  plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // Add the plane to the scene.
  scene.add(plane);

  // Set the camera z position.
  camera.position.z = 10;

  // Render the renderer.
  renderer.render(scene, camera);
})
