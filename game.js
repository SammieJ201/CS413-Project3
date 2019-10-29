var gameport = document.getElementById("gameport");

// Frame init
var WIDTH = 1000;
var HEIGHT = 400;
var renderer = PIXI.autoDetectRenderer({width: WIDTH, height: HEIGHT, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);
var stage = new PIXI.Container();

/// Menu Stage ////////////////////////
var menuStage = new PIXI.Container();
stage.addChild(menuStage);
var menuBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
menuStage.addChild(menuBackground);

// Add play Button
var playButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-play.png"));
playButton.anchor.set(0.5);
playButton.position.set(WIDTH/2,HEIGHT/4);
playButton.interactive = true;
playButton.buttonMode = true;
playButton.on('mousedown', playButtonHandler);
menuStage.addChild(playButton);

// Handles mouse click on play button
function playButtonHandler(e)
{
  stage.removeChild(menuStage); // leave main menu
  stage.addChild(gameStage);    // Go to game stage

    PIXI.loader
	.add("Assets/Character/char_spritesheet.json")
	.load(startGame);
}

// Add instructions Button
var instrButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-instructions.png"));
instrButton.anchor.set(0.5);
instrButton.position.set(WIDTH/2,2*HEIGHT/4);
instrButton.interactive = true;
instrButton.buttonMode = true;
instrButton.on('mousedown', instrButtonHandler);
menuStage.addChild(instrButton);

// Handles mouse click on instructions button
function instrButtonHandler(e)
{
  stage.removeChild(menuStage); // Leave main menu
  stage.addChild(instrStage);   // Go to instructions menu
}

// Add credits Button
var creditButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-credits.png"));
creditButton.anchor.set(0.5);
creditButton.position.set(WIDTH/2,3*HEIGHT/4);
creditButton.interactive = true;
creditButton.buttonMode = true;
creditButton.on('mousedown', creditButtonHandler);
menuStage.addChild(creditButton);

// Handles mouse click on credits button
function creditButtonHandler(e)
{
  stage.removeChild(menuStage); // Leave main menu
  stage.addChild(creditStage);  // Go to credits screen
}
/// END of Menu stage /////////////////

/// Instructions Stage ////////////////
var instrStage = new PIXI.Container();
var instrBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
instrStage.addChild(instrBackground);
var returnButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-return.png"));
returnButton.anchor.set(1.0);
returnButton.position.set(WIDTH, HEIGHT);
returnButton.interactive = true;
returnButton.buttonMode = true;
returnButton.on('mousedown', returnButtonHandler);
instrStage.addChild(returnButton);

// Handles mouse click on return button
function returnButtonHandler(e)
{
  stage.removeChild(instrStage);  // Leave instructions menu
  stage.addChild(menuStage);      // Go to main menu
}

// Instructions text
var instrText = new PIXI.Text('INSTRUCTIONS\nGO\nHERE');
instrText.anchor.set(0.5);
instrText.position.set(WIDTH/2,HEIGHT/2);
instrStage.addChild(instrText);
/// END of instrucions Stage //////////

/// Credits Stage ////////////////////
var creditStage = new PIXI.Container();
var creditBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
creditStage.addChild(creditBackground);
var creditReturnButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-return.png"));
creditReturnButton.anchor.set(1.0);
creditReturnButton.position.set(WIDTH, HEIGHT);
creditReturnButton.interactive = true;
creditReturnButton.buttonMode = true;
creditReturnButton.on('mousedown', creditReturnButtonHandler);
creditStage.addChild(creditReturnButton);

// Handles mouse click on return button
function creditReturnButtonHandler(e)
{
  stage.removeChild(creditStage);  // Leave credits screen
  stage.addChild(menuStage);       // Go to main menu
}

// Credits text
var creditText = new PIXI.Text('CREDITS GO HERE');
creditText.anchor.set(0.5);
creditText.position.set(WIDTH/2,HEIGHT/2);
creditStage.addChild(creditText);
/// END of Credits Stage //////////////


/// Game Stage ////////////////////////
var gameStage = new PIXI.Container();

var TILE_HEIGHT = 50;
var TILE_WIDTH = 50;
var skyTileTex = PIXI.Texture.fromImage("Assets/Tiles/sky_tile.png");   // 0 in the tileMap array
var grassTileTex = PIXI.Texture.fromImage("Assets/Tiles/grass_tile.png"); // 1 in the tileMap array
var dirtTileTex = PIXI.Texture.fromImage("Assets/Tiles/dirt_tile.png");   // 2 in the tileMap array
var cloudTileTex = PIXI.Texture.fromImage("Assets/Tiles/cloud_tile.png");   // 3 in the tileMap array

var tileMap =
[[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [2, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [2, 0, 0, 2, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [2, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
 [2, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 0, 0, 0, 0],
 [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]]

// Collision Detection variables
var tileSprites = [];
var collision_detected_h = false;
var collision_detected_v = false;

// Iterates starting from the bottom left to the top right.
// To make the map bigger, add rows to the top and columns to the right.
function draw_map()
{
  var cur_x = 0; // Keep track of current x position
  var cur_y = HEIGHT; // Keep track of current y position

  for(var i = tileMap.length-1; i >= 0; i--) // Iterate through y
  {
    var subArray = tileMap[i];  // Save row

    for(var j = 0; j < subArray.length; j++) // Iterate through x
    {
      if(subArray[j] == 0)
      {
        var newTile = new PIXI.Sprite(skyTileTex);  // Load sprite
        newTile.anchor.set(0, 1);                   // Set anchor
        newTile.position.set(cur_x, cur_y);         // Set position
        gameStage.addChild(newTile);                // Add to stage
      }
      if(subArray[j] == 1) // Draw grass
      {
        var newTile = new PIXI.Sprite(grassTileTex);  // Load sprite
        newTile.anchor.set(0, 1);                     // Set anchor
        newTile.position.set(cur_x, cur_y);           // Set position
        gameStage.addChild(newTile);                  // Add to stage
      }
      if(subArray[j] == 2) // Draw dirt
      {
        var newTile = new PIXI.Sprite(dirtTileTex); // Load sprite
        newTile.anchor.set(0, 1);                   // Set anchor
        newTile.position.set(cur_x, cur_y);         // Set position
        gameStage.addChild(newTile);                // Add to stage
      }
	    if(subArray[j] == 3) // Draw cloud
      {
        var newTile = new PIXI.Sprite(cloudTileTex);  // Load sprite
        newTile.anchor.set(0, 1);                     // Set anchor
        newTile.position.set(cur_x, cur_y);           // Set position
        gameStage.addChild(newTile);                  // Add to stage
      }
      cur_x += TILE_WIDTH;  // Increment x position

      // Storing all tiles that can be collided with
      if(subArray[j] != 0 && subArray[j] != 3) // Can't collide with sky or cloud tiles
      {
        tileSprites.push(newTile);
      }
    }
    cur_x = 0;            // Reset x position
    cur_y -= TILE_HEIGHT; // Increment y position
  }
}
draw_map();
/// End of game stage /////////////////


// Load player
/*var runner = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Character/running1.png"));
runner.anchor.set(0, 1.0);
runner.position.set(WIDTH/2, 350);
gameStage.addChild(runner);
*/

/// Player ////////////////////////////
var character = new PIXI.Container();
character.height = 100;
character.width = 100;
character.pivot.set(50, 50);
character.position.set(WIDTH/2, HEIGHT - 150);
var gamePlaying = false;
var sheet;

function startGame()
{
	// Play background music
	PIXI.sound.Sound.from({
		url: 'Assets/Sounds/background_music2.mp3',
		autoPlay: true,
		volume: .5,
		loop: true,
		complete: function() {
			console.log('Sound finished');
		}
	});
  sheet = PIXI.Loader.shared.resources["Assets/Character/char_spritesheet.json"].spritesheet;
	gameStage.addChild(character);
	runIdle();
	gamePlaying = true;
}

//var idle = true;
var idle, runner;
var vx = 0; // velocity in the x direction
var vy = 0; // velocity in the y direction
//var max_v = 30;
var runnerOnStage = false;
var jumping = false;
var up, left, right;

// Runs the idle animation.
function runIdle()
{

	idle = new PIXI.AnimatedSprite(sheet.animations["idle"]);
	//idle.position.set(WIDTH/2, HEIGHT - 150);
	//idle.anchor.set(0.5);
	idle.animationSpeed = 0.1;
	character.addChild(idle);
	idle.play();
}

/*
function keyDownControlHandler(e)
{
  var sheet = PIXI.Loader.shared.resources["Assets/Character/char_spritesheet.json"].spritesheet;

  if(e.keyCode == 87 || e.keyCode == 83 ||e.keyCode == 65 ||e.keyCode == 68)
  {
  	if(runnerOnStage == false){
  		runner = new PIXI.AnimatedSprite(sheet.animations["running"]);
  		//runner.position.set(WIDTH/2, HEIGHT - 150);
  		//runner.anchor.set(0.5);
  		runner.animationSpeed = 0.1;
  		runnerOnStage = true;
  	}
    character.removeChild(idle);
    character.addChild(runner);
    runner.play();

  	if(e.keyCode == 87 && jumping == false) // W
    {
        jumping = true;
        vy -= 25;
  	}

    if(e.keyCode == 65) // A
    {
      if(vx >= -max_v) { vx -= 2; } // Limits max speed.
  		//new_x = runner.position.x - 15;
      //runner.position.x -= 15;
  		character.scale.x = -1;
    }
    if(e.keyCode == 68) // D
    {
      if(vx <= max_v) { vx += 2; } // Limits max speed.
  		//new_x = runner.position.x + 15;
      //runner.position.x += 15;
  		character.scale.x = 1;
  	}

    character.position.x += vx;
    character.position.y += vy;

    //createjs.Tween.get(runner.position).to({x: new_x, y: new_y}, 1000); // Tween to new position.
  }
}*/
/*
function keyUpControlHandler(e)
{
  // Stops the movement of the runner.
  vx = 0;

  // Set the idle sprite to the same position as the runner sprite.
  //idle.x = runner.x;
  //idle.y = runner.y;

  // Change sprite to idle.
  character.removeChild(runner);
  character.addChild(idle);
	idle.play();
}*/

// Handles key down event
function keyDownHandler(e)
{
  if(e.keyCode == 87 || e.keyCode == 83 ||e.keyCode == 65 ||e.keyCode == 68)
  {
  	if(runnerOnStage == false){
  		runner = new PIXI.AnimatedSprite(sheet.animations["running"]);
  		//runner.position.set(WIDTH/2, HEIGHT - 150);
  		//runner.anchor.set(0.5);
  		runner.animationSpeed = 0.1;
  		runnerOnStage = true;
  	}

    // Switch to running animation
    character.removeChild(idle);
    character.addChild(runner);
    runner.play();

  	if(e.keyCode == 87 && jumping == false) // W key
    {
      up = true;
  	}
    if(e.keyCode == 65) // A
    {
      left = true;
	  
    }
    if(e.keyCode == 68) // D
    {
      right = true;
  	}
  }
}

// Handles key up event
function keyUpHandler(e)
{
  if(e.keyCode == 87) // W
  {
    up = false;
  }
  if(e.keyCode == 65) // A key
  {
    left = false;

    // Switch to idle animation
    character.removeChild(runner);
    character.addChild(idle);
  	idle.play();
  }

  if(e.keyCode == 68) // D key
  {
    right = false;

    // Switch to idle animation
    character.removeChild(runner);
    character.addChild(idle);
  	idle.play();
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);


// A function for handling collision detection
var collision_counter = 0;
function detectCollision()
{
    var num = 0;
    if(runnerOnStage){
        // Iterate over sprites that can be collided with
        for(num = 0; num < tileSprites.length; num ++){
            if(
            (character.position.y + 70 - character.height/2) + (character.height/2) > tileSprites[num].position.y - 25
            && (character.position.y + 70 - character.height/2) < (tileSprites[num].position.y - 25) + 25
            && (character.position.x - character.width/2) + (character.width/2) > tileSprites[num].position.x - 25
            && (character.position.x - character.width/2) < (tileSprites[num].position.x - 25) + 25)
            {
                // There are two collision detection flags in case we ever need to flag only one
                collision_detected_v = true;
                collision_detected_h = true;
                collision_counter++;
            }
            if(
            (character.position.y - character.height/2) + (character.height/2) > tileSprites[num].position.y - 25
            && (character.position.y - character.height/2) < (tileSprites[num].position.y - 25) + 25
            && (character.position.x - character.width/2) + (character.width/2) > tileSprites[num].position.x - 25
            && (character.position.x - character.width/2) < (tileSprites[num].position.x - 25) + 25)
            {
                // There are two collision detection flags in case we ever need to flag only one
                collision_detected_v = true;
                collision_detected_h = true;
                collision_counter++;
            }
            /*if ((character.position.y + 75 - character.height/2) + (character.height/2) == tileSprites[num].position.y - 25
            && (character.position.y + 75 - character.height/2) == (tileSprites[num].position.y - 25) + 25){
                collision_detected_v = true;
                collision_detected_h = false;
            }*/
        }
    }
}

// Controls player movement based on keyboard input
function update_movement()
{
  if(up && jumping == false) // W key
  {
    vy -= 20;
    jumping = true;
  }
  if(left) // A key
  {
    vx -= 2;
    //character.scale.x = -1; // Make character face left
  }
  if(right) // D key
  {
    vx += 2;
    character.scale.x = 1; // Make character face right
  }

  vy += 2;  // gravity
  character.position.x += vx; // Make character move left or right
  character.position.y += vy; // Make character move up


  detectCollision(); // Check for Collision Detection

  if(collision_detected_h)        // Horizontal Collision Handling
  {
    character.position.x -= vx;       // Reset movement
    collision_detected_h = false;     //  Reset flag
  }
  if(collision_detected_v)        //  Vertical Collision Handling
  {
    character.position.y -= vy;       // Reset Movement
    vy = 0;                           // Stop downward velocity
    collision_detected_v = false;
    if(character.position.y < HEIGHT - 150)
    {
        jumping = false; // Allow for jumping from platforms
    }
  }
  console.log(character.position.y);
  //console.log("Collision ");
  if(character.position.y < HEIGHT - 150 && vy == 0 && (character.position.y - 4) % 50 == 0 && collision_counter <= 2)
  {
    character.position.x += vx;
    console.log("TEST OUTPUT");
  }

  vx *= 0.9; // friction

  if(character.y > HEIGHT-150)
  {
    jumping = false;
    character.y = HEIGHT - 150;
    vy = 0;
  }

  collision_counter = 0;
}
/// End of Player /////////////////////

// Moves the stage with charcater.
function update_camera()
{
  gameStage.position.x = WIDTH/2 - character.x;
  gameStage.position.y = HEIGHT - 50 - character.y - character.height;

}

function animate()
{
    update_movement();
    update_camera();
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
