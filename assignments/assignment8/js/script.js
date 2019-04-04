"use strict";

/*****************

Assignemnt 8
Liu WenYue



The 3d model used in this prototype is from the following website.
https://www.turbosquid.com/FullPreview/Index.cfm/ID/1008420

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
  plane.rotation.x = -45;
  plane.rotation.z = 30;

  // Add the plane to the scene.
  scene.add(plane);

  // Use the mtl loader to load the material for the model.
  let mtlLoader = new THREE.MTLLoader();
  // Load the material.
  mtlLoader.setPath('assets/models/');
  mtlLoader.load('tree.mtl', function(materials) {
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
      'tree.obj',
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
  camera.position.set(1,-1,5);

  // Set the default angle of the camera to be point of view.
  camera.rotation.x = .5;
  camera.rotation.y = .15;

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
