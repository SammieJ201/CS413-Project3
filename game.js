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
var gameGround = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-game-ground.png"));
gameGround.position.set(0,350);
var gameSky = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-game-sky.png"));
gameStage.addChild(gameGround);
gameStage.addChild(gameSky);
/// End of game stage /////////////////



// Load runner
var runner = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Character/running1.png"));
runner.anchor.set(0, 1.0);
runner.position.set(WIDTH/2, 350);
gameStage.addChild(runner);

function runnerControlHandler(e)
{
  if(e.keyCode == 87) { runner.position.y -= 10; } // W
  if(e.keyCode == 83) { runner.position.y += 10; } // S
  if(e.keyCode == 65) { runner.position.x -= 10; } // A
  if(e.keyCode == 68) { runner.position.x += 10; } // D

  if(runner.position.x > WIDTH) {runner.position.x = 0;}
  if(runner.position.x < 0) {runner.position.x = WIDTH;}
  if(runner.position.y > HEIGHT) {runner.position.y = 0;}
  if(runner.position.y < 0) {runner.position.y = HEIGHT;}
}
document.addEventListener('keydown', runnerControlHandler);

// Keeps runner in the center of the gameStage.
function update_camera()
{
  gameStage.x = WIDTH/2 - runner.x - runner.width;
  gameStage.y = HEIGHT/2 - runner.y + runner.height*1.5;
}

function animate()
{
    requestAnimationFrame(animate);
    update_camera();
    renderer.render(stage);
}
animate();
