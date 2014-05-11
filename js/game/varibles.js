//Jaxson C. Van Doorn, 2014

//Player Varibles
var player = {
                movingRight: false,
                movingLeft: false,
                dobuleJump: false,
                dig: false,
                isDigging: false,
                directX: 0,
                startX: 400
            };

//Settings
var settings = {
                    resolutionWidth: 1920,
                    resolutionHeight: 1080,
                    fullscreen: false,
                    fullscreenString: "Off",
                    sound: 10,
                    soundString: "100"
            };
var sav = {
                    slot1: "New File",
                    slot2: "New File",
                    slot3: "New File"
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
                        enterPressed: false
                    };
//Text Style
var titleStyle = {
					font: "250px Century Gothic Bold", 
					fill: "#fff1dd", 
					align: "center" 
				};

//Menu and UI
var menuSelect = 1;
var currentScreen = 1;
var loadedLoadingScreen = false;
var saveLoaded;

//Jaxson C. Van Doorn, 2014
