"use strict";

/*****************

Assignemnt 8
Liu WenYue

This is a prototype for my final project, because I will be using three.js as the
main approach for this project. In this prototype, I will be exploring the basic
knowledge of the library, like setting up the scene (create scene, camera, render,
lightings). I also explored how to import a 3D model and its material. In the
interaction aspect, the players will be looking at the scene in POV angle and
moving around the scene with keyboard or mouse input.

My final project is about friendship, where the players have to find their sad
friend and send her some warmth. The top view of the scene using the orthographic
Camera will be displayed for a limited time, players have to remember the route
from their current location to the sad friend. The map disappears and the players
now is in their POV and in the scene. They have to find their sad friend within
the given time. The game gets harder as they move on.

******************/

// Declare the variables for the scene, camera and renderer.
let scene;
let camera;
let renderer;

// Variable that stores the plane geomotry.
let plane;

// Variable that stores the ambient light for the scene.
let ambientLight;


// Get the document set up.
$(document).ready(function() {
  // Create a new scene, a perspective camera and a WEBGL renderer.
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();

  // Set the background color of the scene to white.
  scene.background = new THREE.Color( 0xffffff );

  // Set the size of the renderer to the brower window size.
  renderer.setSize(window.innerWidth , window.innerHeight);

  // Add the renderer element to the html document.
  document.body.appendChild(renderer.domElement);

  // Add plane geometry and material.
  let planeGeometry = new THREE.PlaneGeometry(10,10,1,1);
  let planeMaterial = new THREE.MeshBasicMaterial({color:0xcccccc});
  // Create plane using plane geometry and material.
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // Rotate the plane.
  plane.rotation.x -= Math.PI/2;

  // Add the plane to the scene.
  scene.add(plane);

  // Use the mtl loader to load the material for the model.
  let mtlLoader = new THREE.MTLLoader();
  // Load the material.
  mtlLoader.setPath('assets/models/');
  mtlLoader.load('tree-v6.mtl', function(materials) {
    // Preload the material.
    materials.preload();

    // Use the obj loader to load the obj file.
    let objLoader = new THREE.OBJLoader();
    // Set the material for the obj file,.
    objLoader.setMaterials(materials);
    // Find the path for the obj file.
    objLoader.setPath('assets/models/')
    objLoader.load(
      // resource URL
      'tree-v6.obj',
      // called when resource is loaded
      function ( object ) {
        scene.add( object );

        // Scale and rotate the tree.
        object.scale.set(.3,.3,.3);
        object.rotation.y = 40;
      },

      // called when loading is in progresses
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },

      // called when loading has errors
      function ( error ) {
        console.log( 'An error happened' );
      });
  });

  // Create the ambient light and give it a white color.
  ambientLight = new THREE.AmbientLight(0xffffff);
  // Add ambient light to the scene.
  scene.add(ambientLight);

  // Set the default camera position.
  camera.position.set(0,2,8);

  // Call animate function.
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
      camera.position.x -= Math.sin(camera.rotation.y) * 1;
      camera.position.z -= Math.cos(camera.rotation.y) * 1;
    }
    // press s to move back.
    if (e.keyCode === 83) {
      camera.position.x += Math.sin(camera.rotation.y) * 1;
      camera.position.z += Math.cos(camera.rotation.y) * 1;
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
