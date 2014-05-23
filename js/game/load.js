//Jaxson C. Van Doorn, 2014

/*
	Things to keep in mind:
	
		Optimization
		Maximize support
		Tidy Code

		Good Tutorial
		Captivating Intro
		Detailed Game Mechanics
		Inviting Game World

	To do:
	
		Stop Animation On Collide
		Better Camera
		Finsih Fullscreen Toggle
		Attacks | Pounce and Tail Wip

	Bugs:

		Memory Hog | Laggy
		Dig Bug

	Graphics:
	
		Finish Tunnel Tiles
		Hills
		Alt Dig
		Crawl Idle
		Pounce
		Tail Wip
		Lose Animation

	Resultions:
		
		640		×	360
		848		×	480
		854		×	480
		960		×	540
		960		×	544
		1024	×	576
		1024	×	600
		1136	×	640
		1280	×	720
		1366	×	768
		1600	×	900
		1920	×	1080
*/

//Set up Canvas
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'canvasdiv');

window.onload = function() {

	//Max Scale
	game.scale.maxWidth = 1920;
    game.scale.maxHeight = 1080;

    //Auto Scale
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();

	//Create Game States
	game.state.add('Menu', mainMenu);
	game.state.add('chapter1', chapter1);

	//Load Menu State
	game.state.start('Menu');
};

//Jaxson C. Van Doorn, 2014
