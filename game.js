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
[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]]

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
        newTile.anchor.set(0, 1);           // Set anchor
        newTile.position.set(cur_x, cur_y); // Set position
        gameStage.addChild(newTile);       // Add to stage
      }
      if(subArray[j] == 1) // Draw grass
      {
        var newTile = new PIXI.Sprite(grassTileTex);  // Load sprite
        newTile.anchor.set(0, 1);           // Set anchor
        newTile.position.set(cur_x, cur_y); // Set position
        gameStage.addChild(newTile);        // Add to stage
      }
      if(subArray[j] == 2) // Draw dirt
      {
        var newTile = new PIXI.Sprite(dirtTileTex);  // Load sprite
        newTile.anchor.set(0, 1);           // Set anchor
        newTile.position.set(cur_x, cur_y); // Set position
        gameStage.addChild(newTile);        // Add to stage
      }
	  if(subArray[j] == 3) // Draw dirt
      {
        var newTile = new PIXI.Sprite(cloudTileTex);  // Load sprite
        newTile.anchor.set(0, 1);           // Set anchor
        newTile.position.set(cur_x, cur_y); // Set position
        gameStage.addChild(newTile);        // Add to stage
      }
      cur_x += TILE_WIDTH;                // Increment x position
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

var character = new PIXI.Container();

var gamePlaying = false;

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
   
	gameStage.addChild(character);
	runIdle();
	gamePlaying = true;
}

//var idle = true;
var idle, runner;
var new_x, new_y, vx = 0, vy = 0;
var max_v = 30;
var runnerOnStage = false;
// Runs the idle animation.
function runIdle()
{
	var sheet = PIXI.Loader.shared.resources["Assets/Character/char_spritesheet.json"].spritesheet;
	idle = new PIXI.AnimatedSprite(sheet.animations["idle"]);
	idle.position.set(WIDTH/2, HEIGHT - 150);
	idle.anchor.set(0.5);
	idle.animationSpeed = 0.1;
	character.addChild(idle);
	idle.play();
}
function keyDownControlHandler(e)
{
  var sheet = PIXI.Loader.shared.resources["Assets/Character/char_spritesheet.json"].spritesheet;

  if(e.keyCode == 87 || e.keyCode == 83 ||e.keyCode == 65 ||e.keyCode == 68)
  {
  	if(runnerOnStage == false){
  		runner = new PIXI.AnimatedSprite(sheet.animations["running"]);
  		runner.position.set(WIDTH/2, HEIGHT - 150);
  		runner.anchor.set(0.5);
  		runner.animationSpeed = 0.1;
  		runnerOnStage = true;
  	}
    character.removeChild(idle);
    character.addChild(runner);
    runner.play();

  	if(e.keyCode == 87) // W
    {
      //vy -= 9;
  		//new_y = runner.position.y - 100;
  		runner.scale.x = 1;
  	}
    /*if(e.keyCode == 83) // S
    {
  		runner.position.y += 15;
  		runner.scale.x = 1;
  	}*/
    if(e.keyCode == 65) // A
    {
      if(vx >= -max_v) { vx -= 2; } // Limits max speed.
  		//new_x = runner.position.x - 15;
      //runner.position.x -= 15;
  		runner.scale.x = -1;
    }
    if(e.keyCode == 68) // D
    {
      if(vx <= max_v) { vx += 2; } // Limits max speed.
  		//new_x = runner.position.x + 15;
      //runner.position.x += 15;
  		runner.scale.x = 1;
  	}

    /*if(runner.y <= 400)
    {
      //vy += 10;
    }*/
    runner.position.x += vx;
    runner.position.y += vy;

    //createjs.Tween.get(runner.position).to({x: new_x, y: new_y}, 1000); // Tween to new position.
  }

  // Move stage with charcater
  gameStage.position.x = WIDTH/2 - runner.x - runner.width/2;
  gameStage.position.y = HEIGHT - 50 - runner.y - runner.height;
}

function keyUpControlHandler(e)
{
  // Stops the movement of the runner.
  vx = 0;
  vy = 0;

  // Set the idle sprite to the same position as the runner sprite.
  idle.x = runner.x;
  idle.y = runner.y;

  // Change sprite to idle.
  character.removeChild(runner);
  character.addChild(idle);
	idle.play();
}

document.addEventListener('keydown', keyDownControlHandler);
document.addEventListener('keyup', keyUpControlHandler);

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
