//Jaxson C. Van Doorn, 2014

var mainMenu = {};

mainMenu = function(game){};

mainMenu.prototype = {
    
    preload : function(){

        //Reset Varibles
        menuSelect = 1;
        currentScreen = 1;

        //Loading Screen
        mainMenu.prototype.loadingScreenDisplay();

        //Manages Save Data
        mainMenu.prototype.checkSave();

        //Scale Window
        gobalFunctions.prototype.scale();

        //Souund Adjustor
        gobalFunctions.prototype.soundAdjust();

        //Menu
        game.load.image('aboutScreen', 'assets/images/ui/about.png');
        game.load.image('menuBg', 'assets/images/ui/orange.png');

        //Loading Screen
        game.load.image('loadingScreen', 'assets/images/ui/loading.png');

        //Tell Game that the loading image has loaded
        loadedLoadingScreen = true;
    },

    checkSave : function(){

        //Check if Save is Created
        saveLoaded = store.get("save.loaded");
        
        //If not create Save File
        if (saveLoaded === undefined)
        {
            mainMenu.prototype.createSave();
        }

        //Then Read the Save File
        mainMenu.prototype.readSave();
    },

    createSave : function(){
            
        store.set("save.loaded", true);
        store.set("save.settings.sound", 10);
        store.set("save.chapter", 1);
        store.set("save.chapterString", "New File");
        store.set("save.x", 400);
    },

    readSave : function(){
        
        settings.sound = store.get("save.settings.sound");
        sav.chapter = store.get("save.chapter");
        sav.chapterString = store.get("save.chapterString");
        sav.x = store.get("save.x");
    },

    create : function(){

        //Draw Settings Menu            
        menu = game.add.sprite(0, 0, 'menuBg');

        //Draw Text
        mainMenu.prototype.createMenuText();

        //Controls
        cursors = game.input.keyboard.createCursorKeys();
        select = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        backSelect = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);

        //Fullscreen on click
        this.input.onDown.add(gobalFunctions.prototype.gofull, this);

        //Turns on smoothing
        game.stage.smoothed = true;

        //Name
        console.log("Copyright 2014, Jaxson C. Van Doorn and Avery M. Suzuki");
    },

    createMenuText : function(){

        //Draw Title
        text.title = game.add.text(960, 240, "FOX", titleStyle);
        text.title.anchor.setTo(0.5);
        
        //Draw Selector 1
        text.selector1 = game.add.text(960, 525, "Play");
        text.selector1.anchor.setTo(0.5);
        text.selector1.font = 'Century Gothic Bold';
        text.selector1.fontSize = 80;
        text.selector1.fill = "#ffffff";
        
        //Draw Selector 2
        text.selector2 = game.add.text(960, 690, "Settings");
        text.selector2.anchor.setTo(0.5);
        text.selector2.font = 'Century Gothic';
        text.selector2.fontSize = 60;
        text.selector2.fill = "#ffffff";

        //Draw Selector 3
        text.selector3 = game.add.text(960, 840, "About");
        text.selector3.anchor.setTo(0.5);
        text.selector3.font = 'Century Gothic';
        text.selector3.fontSize = 60;
        text.selector3.fill = "#ffffff";

        text.loaded = true;

        //Load About Screen
        mainMenu.prototype.toggleAbout();
    },

    update : function(){

        //Selectors
        if (menuSelect == 1 && text.loaded === true)
        {
            gobalFunctions.prototype.highlight1();
        }
        if (menuSelect == 2 && text.loaded === true)
        {
            gobalFunctions.prototype.highlight2();
        }
        if (menuSelect == 3 && text.loaded === true)
        {
            gobalFunctions.prototype.highlight3();
        }

        //Main Menu
        if (currentScreen == 1 && text.loaded === true)
        {
            mainMenu.prototype.mainText();

                //Play
                if (menuSelect == 1)
                {
                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        currentScreen = 2;
                        menuSelect = 1;
                    }
                }

                //Settings
                if (menuSelect == 2)
                {
                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        currentScreen = 3;
                        menuSelect = 1;
                    }
                }

                //About
                if (menuSelect == 3)
                {
                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        aboutMenu.visible =! aboutMenu.visible;
                        currentScreen = 4;
                        menuSelect = 1;
                    }
                }
        }

        //Save Slots
        if (currentScreen == 2 && text.loaded === true)
        {
            mainMenu.prototype.saveText();
            
                //Slot 1
                if (menuSelect == 1)
                {
                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        mainMenu.prototype.exit();
                    }
                }

                //Slot 2
                if (menuSelect == 2)
                {

                }

                //Slot 3
                if (menuSelect == 3)
                {

                }

                //Go Back
                if (backSelect.isDown)
                {
                    currentScreen = 1;
                    menuSelect = 1;
                }
        }
        
        //Settings
        if (currentScreen == 3 && text.loaded === true)
        {
            gobalFunctions.prototype.settingsText();

                //Resolution
                if (menuSelect == 1)
                {

                }

                //Fullscreen
                if (menuSelect == 2)
                {
                    //Exit
                    if (settings.fullscreen === true)
                    {
                        cursors.right.onDown.removeAll();

                        //Left
                        if (cursors.left.isDown && keyDebouncing.leftPressed === false)
                        {
                            keyDebouncing.leftPressed = true;
                            gobalFunctions.prototype.fullExit();
                        }

                        //Right
                        if (cursors.right.isDown && keyDebouncing.rightPressed === false)
                        {
                            keyDebouncing.rightPressed = true;
                            gobalFunctions.prototype.fullExit(); 
                        }
                    }

                    /*
                    //Enter
                    if (settings.fullscreen === false)
                    {
                        cursors.left.onDown.add(gobalFunctions.prototype.gofull, this);
                        cursors.right.onDown.add(gobalFunctions.prototype.gofull, this);
                    }
                    */
                }

                //Sound
                if (menuSelect == 3)
                {
                    //Sound Down
                    if (settings.sound > 0 && cursors.left.isDown && keyDebouncing.leftPressed === false)
                    {
                        keyDebouncing.leftPressed = true;
                        gobalFunctions.prototype.soundDown(); 
                    }

                    //Sound Up
                    if (settings.sound < 10 && cursors.right.isDown && keyDebouncing.rightPressed === false)
                    {
                        keyDebouncing.rightPressed = true;
                        gobalFunctions.prototype.soundUp();
                    }
                }

                //Go Back
                if (backSelect.isDown)
                {
                    currentScreen = 1;
                    menuSelect = 2;
                }
        }

        //About
        if (currentScreen == 4 && text.loaded === true)
        {
            //Go Back
            if (backSelect.isDown)
            {
                aboutMenu.visible =! aboutMenu.visible;
                currentScreen = 1;
                menuSelect = 3;
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
        if (!cursors.right.isDown)
        {
            keyDebouncing.rightPressed = false;
        }
        if (!cursors.left.isDown)
        {
            keyDebouncing.leftPressed = false;
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
    },

    render : function(){

    },

    toggleAbout : function(){

        //Toggle About Menu
        aboutMenu = game.add.sprite(0, 0, 'aboutScreen');
        aboutMenu.visible =! aboutMenu.visible;
    },

    mainText : function(){
            
        text.title.setText("FOX");
        text.selector1.setText("Play");
        text.selector2.setText("Settings");
        text.selector3.setText("About");
    },

    saveText : function(){
            
        text.title.setText("SAVES");
        text.selector1.setText("Chapter" + " " + sav.chapter + " - " + sav.chapterString);
        text.selector2.setText("Erase Save");
        text.selector3.setText("Export Save");
    },

    loadingScreenDisplay : function(){
        
        if (loadedLoadingScreen === true)
        {
            game.add.sprite(0, 0, 'loadingScreen');
        }
    },

    exit : function(){

        //Clean Up
        menu.kill();
        text.title.destroy();
        text.selector1.destroy();
        text.selector2.destroy();
        text.selector3.destroy();

        mainMenu.prototype.chapter1();
    },

    chapter1 : function(){

        //Start Chapter
        game.state.start('chapter1');
    }
};

//Jaxson C. Van Doorn, 2014
