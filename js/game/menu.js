//Jaxson C. Van Doorn, 2014

var MainMenu = {};

MainMenu = function(game){};

//Menu and UI
var menuSelect = 1;
var currentScreen = 1;
var loadedLoadingScreen = false;

//Key Debouncing
var keyDebouncing = {
                        downPressed: false,
                        upPressed: false,
                        enterPressed: false
                    };

MainMenu.prototype = {
    
    preload : function(){

        //Reset Varibles
        menuSelect = 1;
        currentScreen = 1;

        //Loading Screen
        if(loadedLoadingScreen === true)
        {
            loadingMenu = game.add.sprite(0, 0, 'loadingScreen');
        }

        //Menu
        game.load.spritesheet('menuScreen', 'assets/images/ui/menu.png', 1920, 1080, 3);
        game.load.spritesheet('saveScreen', 'assets/images/ui/save.png', 1920, 1080, 3);
        game.load.spritesheet('settingsScreen', 'assets/images/ui/settings.png', 1920, 1080, 3);
        game.load.image('aboutScreen', 'assets/images/ui/about.png');

        //Loading Screen
        game.load.image('loadingScreen', 'assets/images/ui/loading.png');

        //Controls
        cursors = game.input.keyboard.createCursorKeys();
        select = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        backSelect = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);

    },

    create : function(){

        //Draw Settings Menu            
        game.add.sprite(0, 0, 'aboutScreen');

        //Load Functions
        MainMenu.prototype.loadSetting();
        MainMenu.prototype.loadSave();
        MainMenu.prototype.loadMenu();

        //Fullscreen on click
        this.input.onDown.add(MainGame.prototype.gofull, this);

        //Display Loading Screen if the image is loaded
        loadedLoadingScreen = true;

        //Name
        console.log("Copyright 2014, Jaxson C. Van Doorn and Avery M. Suzuki");

    },

    loadSetting : function(){

        //Draw Settings Menu            
        settingsMenu = game.add.sprite(0, 0, 'settingsScreen');

        //Addd different selectors
        settingsMenu.animations.add('settingsResolution', [0], 8, true);
        settingsMenu.animations.add('settingsFullscreen', [1], 8, true);
        settingsMenu.animations.add('settingsSound', [2], 8, true);
    },

    loadSave : function(){
        
        //Draw Save Menu            
        saveMenu = game.add.sprite(0, 0, 'saveScreen');

        //Addd different selectors
        saveMenu.animations.add('saveSlot1', [0], 8, true);
        saveMenu.animations.add('saveSlot2', [1], 8, true);
        saveMenu.animations.add('saveSlot3', [2], 8, true);
    },

    loadMenu : function(){
        
        //Draw Menu
        menu = game.add.sprite(0, 0, 'menuScreen');

        //Addd different selectors
        menu.animations.add('menuPlay', [0], 8, true);
        menu.animations.add('menuSetting', [1], 8, true);
        menu.animations.add('menuAbout', [2], 8, true);
    },

    update : function(){
        
        //Main Menu
        if (currentScreen == 1)
        {
            //Play
            if (menuSelect == 1)
            {
                menu.animations.play('menuPlay');
            
                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        menuSelect = 1;
                        menu.visible =! menu.visible;
                        currentScreen = 2;
                    }
            }

            //Settings
            if (menuSelect == 2)
            {
                menu.animations.play('menuSetting');

                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        menuSelect = 1;
                        menu.visible =! menu.visible;
                        saveMenu.visible =! saveMenu.visible;
                        currentScreen = 3;
                    }
            }

            //About
            if (menuSelect == 3)
            {
                menu.animations.play('menuAbout');

                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        menuSelect = 1;
                        menu.visible =! menu.visible;
                        saveMenu.visible =! saveMenu.visible;
                        settingsMenu.visible =! settingsMenu.visible;
                        currentScreen = 4;
                    }
            }
        }

        //Save Slots
        if (currentScreen == 2)
        {
            //Slot 1
            if (menuSelect == 1)
            {
                saveMenu.animations.play('saveSlot1');
            
                //Enter
                if (select.isDown && keyDebouncing.enterPressed === false)
                {
                    keyDebouncing.enterPressed = true;
                    MainMenu.prototype.exit();
                }
            }

            //Slot 2
            if (menuSelect == 2)
            {
                saveMenu.animations.play('saveSlot2');
            }

            //Slot 3
            if (menuSelect == 3)
            {
                saveMenu.animations.play('saveSlot3');
            }

            //Go Back
            if (backSelect.isDown)
            {
                currentScreen = 1;
                menuSelect = 1;
                menu.visible =! menu.visible;
            }
        }
        
        //Settings
        if (currentScreen == 3)
        {
            //Slot 1
            if (menuSelect == 1)
            {
                settingsMenu.animations.play('settingsResolution');
            }

            //Slot 2
            if (menuSelect == 2)
            {
                settingsMenu.animations.play('settingsFullscreen');
            }

            //Slot 3
            if (menuSelect == 3)
            {
                settingsMenu.animations.play('settingsSound');
            }

            //Go Back
            if (backSelect.isDown)
            {
                currentScreen = 1;
                menuSelect = 2;
                menu.visible =! menu.visible;
                saveMenu.visible =! saveMenu.visible;
            }
        }

        //About
        if (currentScreen == 4)
        {
            //Go Back
            if (backSelect.isDown)
            {
                currentScreen = 1;
                menuSelect = 3;
                menu.visible =! menu.visible;
                saveMenu.visible =! saveMenu.visible;
                settingsMenu.visible =! settingsMenu.visible;
            }
        }
        
        //Up
        if (cursors.up.isDown && keyDebouncing.upPressed === false)
        {
            keyDebouncing.upPressed = true;
            menuSelect = menuSelect - 1;
        }

        //Down
        else if (cursors.down.isDown && keyDebouncing.downPressed === false)
        {
            keyDebouncing.downPressed = true;
            menuSelect = menuSelect + 1;
        }

        //Key Deboucing
        if (!cursors.up.isDown)
        {
            keyDebouncing.upPressed = false;
        }
        if (!cursors.down.isDown)
        {
            keyDebouncing.downPressed = false;
        }
        if (!select.isDown)
        {
            keyDebouncing.enterPressed = false;
        }

        //Looping
        if (menuSelect > 3)
        {
            menuSelect = 1;
        }
        if (menuSelect < 1)
        {
            menuSelect = 3;
        }

        //Rescale when In and Out of Fullscreen
        if (Phaser.ScaleManager.prototype.isFullScreen === null)
        {
            game.scale.maxWidth = 1368;
            game.scale.maxHeight = 768;
            game.scale.setScreenSize();

        }
        else 
        {
            game.scale.maxWidth = 1920;
            game.scale.maxHeight = 1080;
            game.scale.setScreenSize();
        }
    },

    render : function(){
        
    },

    exit : function(){
        
        //Clean Up
        menu.kill();
        saveMenu.kill();
        
        //Start Game
        game.state.start('Game');
    },

    gofull : function(){

        //Scale Screen To Fullscreen
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.startFullScreen();
    }

};

//Jaxson C. Van Doorn, 2014
