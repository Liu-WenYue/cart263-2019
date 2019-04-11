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

// Variable that stores the sky and the sun.
let sky;
let sun;


// Get the document set up.
$(document).ready(function() {
  // Create a new scene, a perspective camera and a WEBGL renderer.
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();

  // Create a new sky with the size of 45000 and add it into the scene.
  sky = new THREE.Sky();
  sky.scale.setScalar(45000);
  scene.add(sky);

  // Add sun geometry and material.
  let sunGeometry = new THREE.PlaneGeometry(20000,12,4);
  let sunMaterial = new THREE.MeshBasicMaterial({color:0xffffff});
  // Create a new sun, position it and make it invisible.
  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.y = -700000;
  sun.visible = false;
  // Add sun to the scene.
  scene.add(sun);


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

  // Call animate function and update camera function.
  animate();
  updateCamera();
})


// updateCamera()
//
// Function that allows the user to move around in POV.
function updateCamera() {
  $(document).on('keydown',function(e) {
    // press w to move front.
    if (e.keyCode === 87) {
      newPosition.x -= Math.sin(camera.rotation.y) * 1;
      newPosition.z -= Math.cos(camera.rotation.y) * 1;
    }
    // press s to move back.
    if (e.keyCode === 83) {
      newPosition.x += Math.sin(camera.rotation.y) * 1;
      newPosition.z += Math.cos(camera.rotation.y) * 1;
    }
    // press a to rotate the camera to the left.
    if (e.keyCode === 65) {
      camera.rotation.y += Math.PI * 0.05;
    }
    // press d to rotate the camera to the right.
    if (e.keyCode === 68) {
      camera.rotation.y -= Math.PI * 0.05;
    }

    // Render the scene with the perspective camera.
    renderer.render(scene, camera);
  })
}


// animate()
//
// Function that renders the animation repeatly.
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
