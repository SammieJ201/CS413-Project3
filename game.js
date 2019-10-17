var gameport = document.getElementById("gameport");

// Frame init
var WIDTH = 1000;
var HEIGHT = 400;
var renderer = PIXI.autoDetectRenderer({width: WIDTH, height: HEIGHT, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);
var stage = new PIXI.Container();

// Menu stage
var menuStage = new PIXI.Container();
stage.addChild(menuStage);
var menuBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
menuStage.addChild(menuBackground);

// Add play Button
var playButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-play.png"));
playButton.anchor.set(0.5);
playButton.position.set(250,100);
playButton.interactive = true;
playButton.buttonMode = true;
playButton.on('mousedown', playButtonHandler);
menuStage.addChild(playButton);

// Add credits Button
var creditsButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/creditsBtn.png"));
creditsButton.anchor.set(0.5);
creditsButton.position.set(250,200);
creditsButton.interactive = true;
creditsButton.buttonMode = true;
creditsButton.on('mousedown', creditsButtonHandler);
menuStage.addChild(creditsButton);

// Add instructions Button
var instructionsButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/htpBtn.png"));
instructionsButton.anchor.set(0.5);
instructionsButton.position.set(250,300);
instructionsButton.interactive = true;
instructionsButton.buttonMode = true;
instructionsButton.on('mousedown', instructionsButtonHandler);
menuStage.addChild(instructionsButton);

// Handles mouse click on play button
function playButtonHandler(e)
{
  stage.removeChild(menuStage); // leave main menu
  stage.addChild(gameStage);    // Go to game stage
}

// Handles mouse click on instructions button
//TODO: Wire up to background-instructions
function instructionsButtonHandler(e)
{
  stage.removeChild(menuStage); // leave main menu
  stage.addChild(gameStage);    // Go to game stage
}

// Handles mouse click on credits button
//TODO: Wire up to background-credits
function creditsButtonHandler(e)
{
  stage.removeChild(menuStage); // leave main menu
  stage.addChild(gameStage);    // Go to game stage
}

/// Game Stage ////////////////////////
var gameStage = new PIXI.Container();
var gameGround = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-game-ground.png"));
gameGround.position.set(0,350);
var gameSky = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-game-sky.png"));
gameStage.addChild(gameGround);
gameStage.addChild(gameSky);

/// End of game stage /////////////////

// Load player
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

  // Move stage with charcater
  gameStage.x = WIDTH/2 - runner.x - runner.width/2;
  gameStage.y = HEIGHT/2 - runner.y - runner.height/2;
}
document.addEventListener('keydown', runnerControlHandler);





function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
