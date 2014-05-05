//Jaxson C. Van Doorn, 2014

/*******************
	Things to keep in mind:
	
	Optimization
	Maximize support
	Tidy Code

	Good Tutorial
	Captivating Intro
	Detailed Game Mechanics

	To do:
	
	Fix Music Bug
	Smoother Camera Transition
	Settings
	Chapters | Save Files
	Background
	Sound

	Animations:
	
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
	game.state.add('Menu', MainMenu);
	game.state.add('Game', MainGame);

	//Load Menu State
	game.state.start('Menu');

};

//Jaxson C. Van Doorn, 2014
