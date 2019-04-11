"use strict";

/*****************

Project 3
Liu WenYue



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


  // Set the background color of the scene to white.
  scene.background = new THREE.Color( 0xffffff );

  // Set the size of the renderer to the brower window size.
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add the renderer element to the html document.
  document.body.appendChild(renderer.domElement);

  // Add plane geometry and material.
  let planeGeometry = new THREE.PlaneGeometry(100,100,10,10);
  let planeMaterial = new THREE.MeshBasicMaterial({color:0xcccccc});
  // Create plane using plane geometry and material.
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // Rotate the plane.
  plane.rotation.x -= Math.PI/2;

  // Add the plane to the scene.
  scene.add(plane);

  // Set the default camera position.
  camera.position.set(0,2,6);

  // Call animate function.
  animate();
})


// animate()
//
// Function that renders the animation repeatly.
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
