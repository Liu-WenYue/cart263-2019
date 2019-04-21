"use strict";

/*****************

Project 3
Liu WenYue



******************/

// Declare the variables for the scene, camera and renderer.
let scene;
let camera;
let renderer;

// Variable that stores the camera that is looking down from the sky.
let topCamera;

// Variable that stores the switchCamera.
let switchCamera;

// Variable that stores the plane geomotry.
let plane;

// Variable that stores the sky and the sun.
let sky;
let sunSphere;

// Variable that stores the array for borders.
let borders = [
  "assets/models/border-back.obj",
  "assets/models/border-front.obj",
  "assets/models/border-left.obj",
  "assets/models/border-right.obj"
];

// Variable that stores the array for border materials.
let bordersMaterial = [
  "assets/models/border-back.mtl",
  "assets/models/border-front.mtl",
  "assets/models/border-left.mtl",
  "assets/models/border-right.mtl"
];

// Variable that stores the starting state of the scene.
let state = "TITLE";

// Sets the progress bar to 1.
let progress = 1;


// Get the document set up.
$(document).ready(function() {
  // Create a new scene, a perspective camera and a WEBGL renderer.
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();

  // Create an Orthographic Camera that will be used as top camera.
  topCamera = new THREE.OrthographicCamera( window.innerWidth / - 15, window.innerWidth / 15, window.innerHeight / 15, window.innerHeight / - 15, 1, 1000 );


  // Set the background color of the scene to white.
  scene.background = new THREE.Color( 0xffffff );

  // Set the size of the renderer to the brower window size.
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add the renderer element to the html document.
  document.body.appendChild(renderer.domElement);

  // Add plane geometry and material.
  let planeBufferGeometry = new THREE.PlaneBufferGeometry(100,100,10,10);
  let planeBasicMaterial = new THREE.MeshBasicMaterial({color:0x845747});
  // Create plane using plane geometry and material.
  plane = new THREE.Mesh(planeBufferGeometry, planeBasicMaterial);
  // Rotate the plane.
  plane.rotation.x -= Math.PI/2;

  // Add the plane to the scene.
  scene.add(plane);

  // Set the top camera's position and rotation.
  topCamera.position.y = 30;
  topCamera.rotation.x -= Math.PI/2;

  // Set the default camera position.
  camera.position.set(8,2,20);

  // Switch statement that allows the game to have different states.
  switch (state) {
    case "TITLE":
    displayTitle();
    break;

    case "MAP":
    viewMap();
    break;

    case "STARTGAME":
    startGame();
    break;

    case "WIN":
    displayWinner();
    break;

    case "GAMEOVER":
    displayGameOver();
    break;
  }

  // Create mtl loader and obj loader.
  let mtlLoader = new THREE.MTLLoader();
  let loader = new THREE.OBJLoader();

  // Load the border materials and added the material on the objects.
  for(let i = 0; i < bordersMaterial.length; i++) {
    mtlLoader.load(bordersMaterial[i], function(materials) {
      materials.preload();
      loader.setMaterials(materials);
    })
  };

  // Load the border models and add them to the scene.
  for(let i = 0; i < borders.length; i++) {
    loader.load(borders[i], function(object) {
      scene.add(object);
    })
  };

  // load tree model and material.
  mtlLoader.setPath('assets/models/');
  mtlLoader.load('tree-all.mtl', function(materials) {
    materials.preload();

    // load a resource
    loader.setMaterials(materials);
    loader.setPath('assets/models/');
    loader.load(
      // resource URL
      'tree-all.obj',
      // add object in the scene.
      function ( object ) {
        scene.add( object );
      })
  });

  // load target model and material.
  mtlLoader.setPath('assets/models/');
  mtlLoader.load('target.mtl', function(materials) {
    materials.preload();

    // load a resource
    loader.setMaterials(materials);
    loader.setPath('assets/models/');
    loader.load(
      // resource URL
      'target.obj',
      // add object in the scene.
      function ( object ) {
        scene.add( object );
        // Sets target's size, location and angle.
        object.scale.set(0.8,0.8,0.8);
        object.rotation.y -= Math.PI/2;
        object.position.set(24,1,-16);
      })
  });

  // Create an hemisphere light.
  let hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  // Set the position for the hemisphere Light.
  hemiLight.position.set( 0, 20, 0 );
  // Add the hemisphere light to the scene.
  scene.add( hemiLight );


  // Call the init sky function.
  initSky();

  // Call animate function and update camera function.
  // animate();
  updateCamera();
})


// displayTitle()
//
// function that displays the game instructions and start button.
function displayTitle() {
  // Set the camera to top camera.
  switchCamera = topCamera;
  // Change the top camera's y position where the scene is invisible.
  topCamera.position.y = 0;

  // If player click on the screen.
  $(document).on('click', function() {
    // Set the top camera's position back to the original position.
    topCamera.position.y = 30;
    // Hide the instructions.
    document.getElementById('title').style.display = "none";

    // Calls the view map function.
    viewMap();
  })
}


// viewMap()
//
// function that displays the map for the scene.
function viewMap() {
  // Set the camera to top camera.
  switchCamera = topCamera;

  // Display the starting point mark.
  document.getElementById('startingpoint').style.display = "block";
  document.getElementById('mark').style.display = "block";

  // Circle progress bar that use to count down.
  $('#circle').circleProgress({
    value: progress,
    size: 100,
    fill: "tomato",
    thickness: 12,
    lineCap: "round",
    animation: { duration: 8000 },
    animationStartValue: 0.0,
  });

  // When the circle progress bar ends...
  $('#circle').on('circle-animation-end',function () {
    // Set the display of circle to none.
    document.getElementById('circle').style.display = "none";

    // Set the starting point to none.
    document.getElementById('startingpoint').style.display = "none";
    document.getElementById('mark').style.display = "none";

    // Calls the start game function.
    startGame();
  });
}


// startGame()
//
// function that displays the scene in players' POV.
function startGame() {
  // Sets the camera to the perspective camera.
  switchCamera = camera;
}


// initSky()
//
// Function that creates a sky in the background.
function initSky() {
  // Create a new sky with the size of 45000 and add it into the scene.
  sky = new THREE.Sky();
  sky.scale.setScalar(45000);
  scene.add(sky);

  // Add a new sun and add it into the scene.
  sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 20000, 16, 8 ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } )
  );
  sunSphere.position.y = -700000;
  sunSphere.visible = false;
  scene.add( sunSphere );

  // Set values for the sky.
  let effectController  = {
    turbidity: 2.2,
    rayleigh: 2.68,
    mieCoefficient: 0.011,
    mieDirectionalG: 0.8,
    luminance: 1,
    inclination: 0.49, // elevation / inclination
    azimuth: 0.25, // Facing front,
    sun: ! true
  };

  // Variable that stores the distance.
  let distance = 400000;

  // Variable that store the sky material uniforms.
  let uniforms = sky.material.uniforms;
  // Sets the values to its respective properties.
  uniforms[ "turbidity" ].value = effectController.turbidity;
  uniforms[ "rayleigh" ].value = effectController.rayleigh;
  uniforms[ "luminance" ].value = effectController.luminance;
  uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
  uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;

  // Variables that controls the angle of the sun.
  let theta = Math.PI * ( effectController.inclination - 0.5 );
  let phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

  // Sets the position of the sun based on the distance and its angle.
  sunSphere.position.x = distance * Math.cos( phi );
  sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
  sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

  // Have the sun invisible.
  sunSphere.visible = effectController.sun;
  uniforms[ "sunPosition" ].value.copy( sunSphere.position );

  // Render the scene.
  animate();
}


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
  })

  // Render the scene.
  animate();
}


// animate()
//
// Function that renders the animation repeatly.
function animate() {
  requestAnimationFrame(animate);
  // Use the switchCamera to change the angle of the scene.
  renderer.render(scene, switchCamera);
}
