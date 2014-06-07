//Jaxson C. Van Doorn, 2014

var pauseMenu = {};

pauseMenu = function(game){};

pauseMenu.prototype = {

    loadPauseBg : function(){

        //Toggle About Menu
        pauseMenuBg = game.add.sprite(0, 0, 'pausedImage');
        pauseMenuBg.visible =! pauseMenuBg.visible;
        pauseMenuBg.fixedToCamera = true;
    },

    pauseText : function(){
            
        text.title.setText("PAUSED");
        text.selector1.setText("Resume");
        text.selector2.setText("Settings");
        text.selector3.setText("Save and Quit");
    },

	pauseGame : function(){      

        //Menu
        if (game.paused === true && text.loaded === true)
        {
            //Selectors
            if (menuSelect == 1)
            {
                gobalFunctions.prototype.highlight1();
            }
            if (menuSelect == 2)
            {
                gobalFunctions.prototype.highlight2();
            }
            if (menuSelect == 3)
            {
                gobalFunctions.prototype.highlight3();
            }

            //Paused
            if (currentScreen == 1)
            {
                //Resume
                if (menuSelect == 1)
                {
                    //Unpause
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = false;

                        //Unpauses Game
                        game.paused = false;

                        pauseMenu.prototype.textKill();

                        pauseMenuBg.visible =! pauseMenuBg.visible;
                    }
                }

                //Settings
                if (menuSelect == 2)
                {
                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = false;
                        currentScreen = 2;
                        menuSelect = 1;
                    }
                }

                //Back To Menu
                if (menuSelect == 3)
                {
                    //To Menu
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        
                        //Call Function To Exit
                        chapter1.prototype.exit();
                    }
                }
                    
                //Go Back
                if (backSelect.isDown && keyDebouncing.backPressed === false)
                {
                    //Unpauses Game
                    game.paused = false;

                    keyDebouncing.backPressed = true;

                    //Reset Selector
                    menuSelect = 1;

                    //Kill Pause Assets
                    pauseMenu.prototype.textKill();
                    pauseMenuBg.visible =! pauseMenuBg.visible;
                }
            }
            
            //Settings
            if (currentScreen == 2)
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
                        if (win.isFullscreen === true)
                        {
                            //Left
                            if (cursors.left.isDown && keyDebouncing.leftPressed === false)
                            {
                                keyDebouncing.leftPressed = true;
                                win.isFullscreen = false;
                                settings.fullscreenString = "Off";
                            }

                            //Right
                            if (cursors.right.isDown && keyDebouncing.rightPressed === false)
                            {
                                keyDebouncing.rightPressed = true;
                                win.isFullscreen = false;
                                settings.fullscreenString = "Off";
                            }
                        }
                        
                        //Enter
                        if (win.isFullscreen === false)
                        {
                            //Left
                            if (cursors.left.isDown && keyDebouncing.leftPressed === false)
                            {
                                keyDebouncing.leftPressed = true;
                                win.isFullscreen = true;
                                settings.fullscreenString = "On";
                            }

                            //Right
                            if (cursors.right.isDown && keyDebouncing.rightPressed === false)
                            {
                                keyDebouncing.rightPressed = true;
                                win.isFullscreen = true;
                                settings.fullscreenString = "On";
                            }
                        }
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
                if (backSelect.isDown && keyDebouncing.backPressed === false)
                {
                    keyDebouncing.backPressed = true;
                    currentScreen = 1;
                    menuSelect = 2;
                    pauseMenu.prototype.pauseText();
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

            //Looping
            if (menuSelect > 3)
            {
                menuSelect = 1;
            }
            else if (menuSelect < 1)
            {
                menuSelect = 3;
            }
            
            gobalFunctions.prototype.menuKeyDebouncing();
        }

        gobalFunctions.prototype.soundAdjust();

        //Refreshs function 60 times a second
        setTimeout(pauseMenu.prototype.pauseGame, 16);
	},

    createTextPause : function(){

        //Draw Title
        text.title = game.add.text(960, 240, "PAUSED", titleStyle);
        text.title.anchor.setTo(0.5);
        text.title.fill = "#ffffff";
        text.title.fixedToCamera = true;
        
        //Draw Selector 1
        text.selector1 = game.add.text(960, 525, "Resume");
        text.selector1.anchor.setTo(0.5);
        text.selector1.font = 'Century Gothic Bold';
        text.selector1.fontSize = 80;
        text.selector1.fill = "#ffffff";
        text.selector1.fixedToCamera = true;
        
        //Draw Selector 2
        text.selector2 = game.add.text(960, 690, "Settings");
        text.selector2.anchor.setTo(0.5);
        text.selector2.font = 'Century Gothic';
        text.selector2.fontSize = 60;
        text.selector2.fill = "#ffffff";
        text.selector2.fixedToCamera = true;

        //Draw Selector 3
        text.selector3 = game.add.text(960, 840, "Save and Quit");
        text.selector3.anchor.setTo(0.5);
        text.selector3.font = 'Century Gothic';
        text.selector3.fontSize = 60;
        text.selector3.fill = "#ffffff";
        text.selector3.fixedToCamera = true;

        text.loaded = true;
    },

    textKill : function(){

        //Remove Text
        text.title.destroy();
        text.selector1.destroy();
        text.selector2.destroy();
        text.selector3.destroy();
    }
};

//Jaxson C. Van Doorn, 2014
