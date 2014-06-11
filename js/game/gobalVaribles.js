//Jaxson C. Van Doorn, 2014

//Player
var player = {
                movingRight: false,
                dobuleJump: false,
                dig: false,
                isDigging: false,
                isDiggingUp: false,
                isAnim: false,
                directX: 0,
                layer: 1,
                onTile: null,
                tileAbove: null,
                tileBelow: null,
                tailWhip: false,
                tailWhipJump: false,
                hit: false,
                killCheck: false,
                killAnim: false,
                killUnderground: false
            };

//Settings
var settings = {
                    resolutionWidth: 1920,
                    resolutionHeight: 1080,
                    fullscreen: false,
                    fullscreenString: "Off",
                    sound: 10,
                    resolutionScroller: null
            };
//Save
var sav = {
                    chapter: null,
                    chapterString: null,
                    x: null,
                    cameraY: null
            };

//Text
var text = {
                title: null,
                selector1: null,
                selector2: null,
                selector3: null,
                loaded: false
            };

//Key Debouncing
var keyDebouncing = {
                        downPressed: false,
                        upPressed: false,
                        rightPressed: false,
                        leftPressed: false,
                        enterPressed: false,
                        backPressed: false,
                        attackPressed: false,
                        escPressed: false
                    };
//Text Style
var titleStyle = {
					font: "250px Century Gothic Bold", 
					fill: "#ffffff", 
					align: "center" 
				};
//Music
var music = {
                    volume: 0
            };

//Node Webbkit Import
var gui = require('nw.gui');
var win = gui.Window.get();

//Menu and UI
var menuSelect = 1;
var currentScreen = 1;

//Camera
var camera;
var cameraY;

//Saving and Loading
var loadedLoadingScreen = false;
var saveLoaded;

//Toggle Debug Screen
var debugShow;

//Time Varibles
var digDelay;
var jumpDelay;
var currentTime;
var delay;

//Game Stuff
var mudTile;
var soundDelay;
var soundPlay;

//Jaxson C. Van Doorn, 2014
