//Jaxson C. Van Doorn, 2014

/*******************
	Things to keep in mind:
	
	Optimization
	Maximize support
	Tidy Code

	Good Tutorial
	Captivating Intro
	Detailed Game Mechanics
	Inviting Game World

	To do:
	
	Smoother Camera Transition
	Sound Effects

	Bugs:

	Pause Bug
	Sound Spike Bug

	Animations:
	
	Finish Tunnel Tiles
	Alt Dig
	Crawl Idle

 ******************/

 //Set up Canvas
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'canvasdiv');

window.onload = function() {

	//Max Scale
	game.scale.maxWidth = 1378;
    game.scale.maxHeight = 770;

    //Auto Scale
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();

	//Create Game States
	game.state.add('Menu', mainMenu);
	game.state.add('Game', chapter1);

	//Load Menu State
	game.state.start('Menu');

};

//Jaxson C. Van Doorn, 2014
