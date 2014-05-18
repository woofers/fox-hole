//Jaxson C. Van Doorn, 2014

//Player Varibles
var player = {
                movingRight: false,
                movingLeft: false,
                dobuleJump: false,
                dig: false,
                isDigging: false,
                directX: 0,
                layer: 1
            };

//Settings
var settings = {
                    resolutionWidth: 1920,
                    resolutionHeight: 1080,
                    fullscreen: false,
                    fullscreenString: "Off",
                    sound: 10
            };
var sav = {
                    chapter: 1,
                    chapterString: "New File",
                    x: null
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
                        backPressed: false
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

//Menu and UI
var menuSelect = 1;
var currentScreen = 1;
var camraY

//Saving and Loading
var loadedLoadingScreen = false;
var saveLoaded;

//Toggle Debug Screen
var debugShow;

//Time Varibles
var digDelay;
var jumpDelay;
var currentTime;

//Jaxson C. Van Doorn, 2014
