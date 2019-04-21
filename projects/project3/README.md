## Friendship
## Liu WenYue, 21st April 2019
## Professor: Pippin Barr

This game is about a sad girl who was hidden in the forest. The players are asked to remember the nearest route and find their sad friend to give her some comfort. The idea was inspired by one of my best friends, she was involved in a terrible accident, and she becomes pessimistic and gets upset easily after the accident. I am not able to comfort her physically and there is even a time difference between us, it is important to find the best way to comfort her within the shortest time. To highlight this process, I used the approach where the player has to remember the route to their sad friend in the top view and find their friend physically in the scene in their point-of-view. The approach was from a brain exercise called Street Nav in PEAK. Through users' interaction with this game, they will be able to see the importance to be patient with their sad friends and pay attention to them more.

This game uses mainly jQuery and three.js and some special javascript libraries for particular parts. The MTLLoader.js and OBJLoader.js are the extended libraries of three.js that allows us to load material and 3d models created from other 3d software. I used this feature to load all the elements in the scene. The other useful library will be the jQuery circle-progress library, it allows me to have a circle-progress bar filling animation to indicate the available time left to view the map. Most importantly, it gives events like circle-animation-end where I can change the game to the next state. I also used the responsive voice library is able to speak when the player finds their sad friend. Lastly, the sky.js is also an extended library from three.js, it is able to simulate a physical sky in the background.

The biggest problem I had with this project is to load my 3d models, the scene was black without any error in the console. With many tests with the material and lighting, I found that it was because the models are too big and the scene is inside the model. The next issue I had will be the lighting, when the materials are loaded, the spotlights, directional lights, and ambient light will give the models a weird shining effect. In the end, I found that hemisphere lighting is able to give the models a nice flat color shading. In the aspect of scene arrangement, I used the same tree models for barriers so it is harder for players to find their way.

I really enjoyed doing this project where I can combine coding and the real-time 3-dimensional scene on a web platform.



Uses:
All the 3d models created in this game were using Cinema 4D and done by me.

The sound effect used in this game is from the following URL (Royalty Free SoundFX).
https://www.freesfx.co.uk/sfx/cry-female-slow

Libraries used:
three.js: https://threejs.org
jQuery circle-progress: https://github.com/kottenator/jquery-circle-progress
responsiveVoice: https://responsivevoice.org
