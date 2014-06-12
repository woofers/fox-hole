//Jaxson C. Van Doorn, 2014

//Set up Canvas
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'canvasdiv');

window.onload = function() {

	//Show Dev Tools
	win.showDevTools();

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
