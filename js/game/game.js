//Jaxson C. Van Doorn, 2014

var MainGame = {};

MainGame = function(game){};

//Player Varibles
var player = {
                movingRight: false,
                movingLeft: false,
                dobuleJump: false,
                dig: false,
                isDigging: false,
                directX: 0
            };

//Toggle Debug Screen
var debugShow;

//Time Varibles
var timeChecker;
var currentTime;
var pauseTime;

MainGame.prototype = {
	
    preload : function(){

        //Set Varible Values
        player.movingRight = true;
        player.movingLeft = false;
        debugShow = false;
        currentScreen = 1;

        //Loading Screen
        game.add.sprite(0, 0, 'loadingScreen');

        //Pause
        game.load.image('pausedScreen', 'assets/images/ui/pause.png');

        //Background and UI
        game.load.image('bg', 'assets/levels/level1/level.png');

        //Map
        game.load.tilemap('map', 'assets/levels/level1/bottom.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tunnel1', 'assets/levels/level1/tunnel1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tunnel2', 'assets/levels/level1/tunnel2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('top', 'assets/levels/level1/top.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/levels/level1/cube.png');

        //Player
        game.load.atlasXML('playerSprite', 'assets/images/sprites/fox.png', 'assets/images/sprites/fox.xml');

        //Music
        game.load.audio('music', ['assets/music/PeacefulIsland.mp3', 'assets/music/PeacefulIsland.ogg']);
	},

	create : function(){

        //Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Draw Background
        bg = game.add.sprite(0, 0, 'bg');

        //Load Functions
        MainGame.prototype.loadMap();
        MainGame.prototype.loadPlayer();
        MainGame.prototype.playMusic();
        MainGame.prototype.unPause();
        MainGame.prototype.loadPause();

        //Set camera boundaries
        camera = game.world.setBounds(0.5, 0, 7600, 1208);

        //Camera follow player
        cameraFollow = game.camera.follow(player);

        //Controlls
        upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        backSelect = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);

        //Fullscreen on click
        this.input.onDown.add(MainGame.prototype.gofull, game);

        //Name
        console.log("Copyright 2014, Jaxson C. Van Doorn and Avery M. Suzuki");
	},

    loadMap : function(){
        
        //Loads title map
        map = game.add.tilemap('map');
        tunnel1 = game.add.tilemap('tunnel1');
        tunnel2 = game.add.tilemap('tunnel2');
        topMap = game.add.tilemap('top');

        map.addTilesetImage('block', 'tiles');
        tunnel1.addTilesetImage('block', 'tiles');
        tunnel2.addTilesetImage('block', 'tiles');
        topMap.addTilesetImage('block', 'tiles');

        //Draws map to screen        
        layerMaster = map.createLayer('collisionLayer');
        layerTunnel1 = tunnel1.createLayer('collisionLayer');
        layerTunnel2 = tunnel2.createLayer('collisionLayer');
        layerTop = topMap.createLayer('collisionLayer');

        //Map collision
        map.setCollisionBetween(0, 6);
        tunnel1.setCollisionBetween(0, 6);
        tunnel2.setCollisionBetween(0, 6);
        topMap.setCollisionBetween(0, 6);

        game.physics.arcade.enable(layerMaster);
        game.physics.arcade.enable(layerTunnel1);
        game.physics.arcade.enable(layerTunnel2);
        game.physics.arcade.enable(layerTop);
    },

    loadPlayer : function(){

        //Draw Player
        player = game.add.sprite(400, 400, 'playerSprite');
        player.anchor.setTo(0.7, 1);
        player.scale.setTo(4, 4);
        player.smoothed = false;

        //Add Physics
        game.physics.arcade.enable(player);
        
        //Physics Properties
        player.body.bounce.y = 0;
        player.body.gravity.y = 700;
        player.body.collideWorldBounds = true;

        //Player Animations

            //Walk
            player.animations.add('idleLeft', Phaser.Animation.generateFrameNames('foxIdle', 0, 15, '', 4), 10, true);
            player.animations.add('idleRight', Phaser.Animation.generateFrameNames('foxIdle', 0, 15, '', 4), 10, true);

            //Idle
            player.animations.add('walkingLeft', Phaser.Animation.generateFrameNames('foxRunning', 0, 6, '', 4), 10, true);
            player.animations.add('walkingRight', Phaser.Animation.generateFrameNames('foxRunning', 0, 6, '', 4), 10, true);

            //Jump
            player.animations.add('jumpingLeft', Phaser.Animation.generateFrameNames('foxRunning', 0, 0, '', 4), 10, true);
            player.animations.add('jumpingRight', Phaser.Animation.generateFrameNames('foxRunning', 0, 0, '', 4), 10, true);

            //Crawl
            player.animations.add('crawlLeft', Phaser.Animation.generateFrameNames('foxCrawl', 0, 3, '', 4), 10, true);
            player.animations.add('crawlRight', Phaser.Animation.generateFrameNames('foxCrawl', 0, 3, '', 4), 10, true);

            //Crawl Idle
            player.animations.add('crawlIdleLeft', Phaser.Animation.generateFrameNames('foxCrawl', 0, 0, '', 4), 10, true);
            player.animations.add('crawlIdleRight', Phaser.Animation.generateFrameNames('foxCrawl', 0, 0, '', 4), 10, true);

            //Diging
            player.animations.add('digLeft', Phaser.Animation.generateFrameNames('foxDig', 0, 17, '', 4), 10, false);
            player.animations.add('digRight', Phaser.Animation.generateFrameNames('foxDig', 0, 17, '', 4), 10, false);
    },

    playMusic : function(){
        
        //Play Music
        music = game.add.audio('music', 1, true);
        
        //Music Toggle
        if (settings.sound > 0)
        {
            music.play('', 0, 1, true);
        }
    },

    loadPause : function(){

        //Toggle About Menu
        pauseMenu = game.add.sprite(0, 0, 'pausedScreen');
        pauseMenu.visible =! pauseMenu.visible;
        pauseMenu.fixedToCamera = true;
    },

	update : function(){
    
        //Colide
        game.physics.arcade.collide(player, layerTunnel1);
        game.physics.arcade.collide(player, layerTunnel2, MainGame.prototype.tunnel1);
        game.physics.arcade.collide(player, layerTop);
        game.physics.arcade.collide(player, layerMaster, MainGame.prototype.tunnel2);

        //Reset Velocity
        player.body.velocity.x = 0;
        
        //Create Time Counter
        currentTime = game.time.now;

        //Walk Left
        if (leftButton.isDown && player.isDigging === false)
        {
            //Flip Image
            player.scale.x = -4;
                
                //Above Ground
                if(player.dig === false)
                {
                    player.movingRight = false;
                    player.movingLeft = true;
                    player.directX = 80;
                    player.body.velocity.x = -550;

                        //Walk Left Animation
                        if(player.body.blocked.down)
                        {
                            player.animations.play('walkingLeft');
                        }

                        //Jump Left Animation
                        else
                        {
                            player.animations.play('jumpingLeft');
                        }
                }

                //Underground
                if(player.dig === true)
                {
                    player.movingRight = false;
                    player.movingLeft = true;
                    player.directX = 80;
                    player.body.velocity.x = -350;
                        
                        //Crawl Left Animation
                        if(player.body.blocked.down)
                        {
                            player.animations.play('crawlLeft');
                        }
                }
        }

        //Walk Right
        else if (rightButton.isDown && player.isDigging === false)
        {
            //Flip Image
            player.scale.x = 4;
                
                //Above Ground
                if(player.dig === false)
                {
                    player.movingLeft = false;
                    player.movingRight = true;
                    player.directX = 190;
                    player.body.velocity.x = 550;
                    
                        //Walk Right Animation
                        if(player.body.blocked.down)
                        {
                            player.animations.play('walkingRight');
                        }

                        //Jump Right Animation
                        else
                        {
                            player.animations.play('jumpingRight'); 
                        }
                }

                //Underground
                if(player.dig === true)
                {
                    player.movingLeft = false;
                    player.movingRight = true;
                    player.directX = 190;
                    player.body.velocity.x = 350;
                    
                        //Crawl Right Animation
                        if(player.body.blocked.down)
                        {
                            player.animations.play('crawlRight');
                        }
                }
        }
    
        //Still
        else if (player.isDigging === false)
        {
                //Above Ground
                if(player.dig === false)
                {
                    //Idle Left Animation
                    if(player.movingLeft === true)
                    {
                        player.animations.play('idleLeft');
                        player.scale.x = -4;
                    }

                    //Idle Right Animation
                    if(player.movingRight === true)
                    {
                        player.animations.play('idleRight');
                        player.scale.x = 4;
                    } 
                }

                //Underground
                if(player.dig === true)
                {
                    //Idle Left Animation
                    if(player.movingLeft === true)
                    {
                        player.animations.play('crawlIdleLeft');
                        player.scale.x = -4;
                    }

                    //Idle Right Animation
                    if(player.movingRight === true)
                    {
                        player.animations.play('crawlIdleRight');
                        player.scale.x = 4;
                    } 
                }
        }

        //Jump
        if (jumpButton.isDown && player.body.blocked.down && player.isDigging === false && player.dig === false && keyDebouncing.spacePressed === false)
        {
            keyDebouncing.spacePressed = true;
            player.body.velocity.y = -350;
        }

        //Double Jump
        if (jumpButton.isDown && player.dobuleJump === false && !player.body.blocked.down && keyDebouncing.spacePressed === false)
        {
            keyDebouncing.spacePressed = true;
            player.dobuleJump = true;
            player.body.velocity.y = -350;
        }

        //Reset Double Jump Varible
        if (player.body.blocked.down)
        {
            player.dobuleJump = false;
        }

        //Key Debouncing
        if (!jumpButton.isDown)
        {
            keyDebouncing.spacePressed = false;
        }
        if (!downButton.isDown)
        {
            keyDebouncing.downPressed = false;
        }
        if (!cursors.down.isDown)
        {
            keyDebouncing.enterPressed = false;
        }

        //************Dig Start************//

        //Set isDigging to false
        if (!player.isDigging === true)
        {
           player.isDigging = false;
        }

        //Delay Camera Move Until Animation is Done
        if (currentTime - timeChecker > 1600)
        {
            //Tunnel 1
            if(player.y == 1024  && player.isDigging === true)
            {
                player.isDigging = false;
                keyDebouncing.downPressed = true;
                player.y = player.y + 256;
                camera = game.world.setBounds(0.5, 0, 7600, 1380);
            }

            //Tunnel 2
            if(player.y == 1280 && player.isDigging === true)
            {
                player.isDigging = false;
                keyDebouncing.downPressed = true;
                player.y = player.y + 128;
                camera = game.world.setBounds(0.5, 0, 7600, 1536);
            }  
        }

        //Digging Animations
        if(player.isDigging === true)
        {
            //To Tunnel 1
            if (player.y == 1024)
            {
                //Dig Left Animation
                if(player.movingLeft === true)
                {
                    player.animations.play('digLeft');
                    player.scale.x = -4;
                }

                //Dig Right Animation
                if(player.movingRight === true)
                {
                    player.animations.play('digRight');
                    player.scale.x = 4;
                }    
            }

            //To Tunnel 2
            if (player.y == 1280)
            {
                //Dig Left Animation
                if(player.movingLeft === true)
                {
                    player.animations.play('digLeft');
                    player.scale.x = -4;
                }

                //Dig Right Animation
                if(player.movingRight === true)
                {
                    player.animations.play('digRight');
                    player.scale.x = 4;
                }    
            }
        }

        //Down With Delay
        if (downButton.isDown && keyDebouncing.downPressed === false && player.body.blocked.down && !player.isDigging === true && player.y < 1281)
        {
            MainGame.prototype.timeCheck();
        }

        //Up to Earth
        if (jumpButton.isDown && keyDebouncing.spacePressed === false && player.y == 1280)
        {
            keyDebouncing.spacePressed = true;
            player.y = player.y - 256;
            camera = game.world.setBounds(0.5, 0, 7600, 1208);
        }

        //Up to Tunnel 1
        if (jumpButton.isDown && keyDebouncing.spacePressed === false && player.y == 1408 && player.body.blocked.down)
        {
            keyDebouncing.spacePressed = true;
            player.y = player.y - 128;
            camera = game.world.setBounds(0.5, 0, 7600, 1340);
        }

        //Dig Check
        if (player.y > 1024)
        {
            player.dig = true;
        }
        else
        {
            player.dig = false;
        }
        
        //************Dig End************//

        //Pause
        if (pauseButton.isDown && keyDebouncing.enterPressed === false && player.body.blocked.down && player.isDigging === false)
        {
            keyDebouncing.enterPressed = true;

            pauseMenu.visible =! pauseMenu.visible;

            //Draw Text
            MainGame.prototype.createTextPause();

            //Pauses Game
            game.paused = true;
        }
	},

	unPause : function(){

        //Selectors
        if (menuSelect == 1 && game.paused === true)
        {
            MainMenu.prototype.highlight1();
        }
        if (menuSelect == 2 && game.paused === true)
        {
            MainMenu.prototype.highlight2();
        }
        if (menuSelect == 3 && game.paused === true)
        {
            MainMenu.prototype.highlight3();
        }

        //Menu
        if (game.paused === true)
        {
            //Paused
            if(currentScreen == 1)
            {
                //Resume
                if (menuSelect == 1)
                {
                    //Unpause
                    if (pauseButton.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = false;

                        //Unpauses Game
                        game.paused = false;

                        MainGame.prototype.textKill();

                        pauseMenu.visible =! pauseMenu.visible;
                    }
                }

                //Settings
                if (menuSelect == 2)
                {
                    //Enter
                    if (pauseButton.isDown && keyDebouncing.enterPressed === false)
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
                    if (pauseButton.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        
                        //Call Function To Exit
                        MainGame.prototype.exit();
                    }
                }
                    
                //Go Back
                if (backSelect.isDown)
                {
                    //Unpauses Game
                    game.paused = false;

                    menuSelect = 1;

                    MainGame.prototype.textKill();

                    pauseMenu.visible =! pauseMenu.visible;
                }
            }
            
            //Settings
            if(currentScreen == 2)
            {
                MainGame.prototype.settingsText();

                //Resolution
                if (menuSelect == 1)
                {

                }

                //Fullscreen
                if (menuSelect == 2)
                {

                }

                //Sound
                if (menuSelect == 3)
                {
                    //Sound Down
                    if(settings.sound > 0 && cursors.left.isDown && keyDebouncing.leftPressed === false)
                    {
                        keyDebouncing.leftPressed = true;
                        MainGame.prototype.soundDown();
                    }

                    //Sound Up
                    if(settings.sound < 100 && cursors.right.isDown && keyDebouncing.rightPressed === false)
                    {
                        keyDebouncing.rightPressed = true;
                        MainGame.prototype.soundUp();
                    }
                }

                //Go Back
                if (backSelect.isDown)
                {
                    currentScreen = 1;
                    menuSelect = 2;
                    MainGame.prototype.pauseText();
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
            if (menuSelect < 1)
            {
                menuSelect = 3;
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
            if (!pauseButton.isDown)
            {
                keyDebouncing.enterPressed = false;
            }
        }

        //Rescale when In and Out of Fullscreen
        if (Phaser.ScaleManager.prototype.isFullScreen === null)
        {
            game.scale.maxWidth = 1368;
            game.scale.maxHeight = 768;
            game.scale.setScreenSize();
            settings.fullscreenString = "Off";
            settings.fullscreen = false;
        }
        else 
        {
            game.scale.maxWidth = 1920;
            game.scale.maxHeight = 1080;
            game.scale.setScreenSize();
            settings.fullscreenString = "On";
            settings.fullscreen = true;
        }
        
        //Change Resolution String
        settings.resolutionWidth = game.scale.width;
        settings.resolutionHeight = game.scale.height;

        //Update Sound String
        settings.soundString = settings.sound.toString();

        //Volume Controll
        music.volume = settings.sound / 100;

        //Refreshs function 60 times a second
        setTimeout(MainGame.prototype.unPause, 1000 / 60);
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
        text.selector3 = game.add.text(960, 840, "Return To Main Menu");
        text.selector3.anchor.setTo(0.5);
        text.selector3.font = 'Century Gothic';
        text.selector3.fontSize = 60;
        text.selector3.fill = "#ffffff";
        text.selector3.fixedToCamera = true;

        text.loaded = true;
    },
    
    pauseText : function(){
            
        text.title.setText("PAUSED");
        text.selector1.setText("Resume");
        text.selector2.setText("Settings");
        text.selector3.setText("Return To Main Menu");
    },

    settingsText : function(){
            
        text.title.setText("SETTINGS");
        text.selector1.setText("Resolution - " + settings.resolutionWidth + " x " + settings.resolutionHeight);
        text.selector2.setText("Fullscreen - " + settings.fullscreenString);
        text.selector3.setText("Sound - " + settings.soundString);
    },

    highlight1: function(){

        text.selector1.font = 'Century Gothic Bold';
        text.selector1.fontSize = 80;
        text.selector2.font = 'Century Gothic';
        text.selector2.fontSize = 60;
        text.selector3.font = 'Century Gothic';
        text.selector3.fontSize = 60;
    },

    highlight2: function(){

        text.selector1.font = 'Century Gothic';
        text.selector1.fontSize = 60;
        text.selector2.font = 'Century Gothic Bold';
        text.selector2.fontSize = 80;
        text.selector3.font = 'Century Gothic';
        text.selector3.fontSize = 60;
    },

    highlight3: function(){

        text.selector1.font = 'Century Gothic';
        text.selector1.fontSize = 60;
        text.selector2.font = 'Century Gothic';
        text.selector2.fontSize = 60;
        text.selector3.font = 'Century Gothic Bold';
        text.selector3.fontSize = 80;
    },

    timeCheck : function(){

        timeChecker = game.time.now; 
        player.isDigging = true;
        return false; 
    },

    tunnel1 : function(){

        tunnel1.fill(9, layerTunnel1.getTileX(player.x - player.directX), layerTunnel1.getTileY(player.y - 128), 3, 1);
        return false;
    },

    tunnel2 : function(){

        tunnel2.fill(11, layerTunnel2.getTileX(player.x - player.directX), layerTunnel2.getTileY(player.y - 128), 3, 1);
        return false;
    },

    soundUp : function(){

        settings.sound = settings.sound + 10;
    },

    soundDown : function(){

        settings.sound = settings.sound - 10;
    },

    render : function(){

        //Debug Info
        if(debugShow === true)
        {
            game.debug.cameraInfo(game.camera, 32, 32);
            game.debug.text('isDigging: ' + player.isDigging, 32, 128);
            game.debug.text('AnimationFrame: ' + player.animations.currentFrame.index, 32, 160);
            game.debug.text('Animation: ' + player.animations.currentAnim.name, 32, 192);
            game.debug.text('Speed: ' + player.body.velocity.x, 32, 226);
            game.debug.text('Menu Selector: ' + menuSelect, 32, 258);
            game.debug.spriteInfo(player, 32, 290);
        }      
    },

    textKill : function(){

        //Remove Text
        text.title.destroy();
        text.selector1.destroy();
        text.selector2.destroy();
        text.selector3.destroy();
    },

    exit : function(){
        
        //Unpause The Game
        game.paused = false;
        
        //Cleanup      
        bg.kill();
        player.kill();
        layerMaster.kill();
        layerTunnel1.kill();
        layerTunnel2.kill();
        layerTop.kill();
        text.title.destroy();
        text.selector1.destroy();
        text.selector2.destroy();
        text.selector3.destroy();
        music.stop();

        //Start Menu
        game.state.start('Menu');
    },

	gofull : function(){

        //Scale Screen To Fullscreen
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.startFullScreen();
	}
};

//Jaxson C. Van Doorn, 2014
