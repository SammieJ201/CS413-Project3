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
playButton.position.set(250,200);
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

/// Game Stage ////////////////////////
var gameStage = new PIXI.Container();
var gameGround = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-game-ground.png"));
gameGround.position.set(0,350);
var gameSky = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-game-sky.png"));
gameStage.addChild(gameGround);
gameStage.addChild(gameSky);
/// End of game stage /////////////////


function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
