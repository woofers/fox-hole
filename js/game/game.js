//Jaxson C. Van Doorn, 2014

var MainGame = {};

MainGame = function(game){};

//Key Debouncing
var keyDebouncing = {
                        downPressed: false,
                        spacePressed: false,
                        enterPressed: false
                    };

//Player Varibles
var player = {
                movingRight: true,
                movingLeft: false,
                dobuleJump: false,
                dig: false,
                isDigging: false
            };

//Toggle Debug Screen
var debugShow;

//Time Varibles
var timeChecker;
var currentTime;
var pauseTime;

//Menu and UI
var menuSelect;
var pauseGame;

MainGame.prototype = {
	
    preload : function(){

        //Loading Screen
        game.add.sprite(0, 0, 'loadingScreen');

        //Background and UI
        game.load.image('bg', 'assets/levels/level1/level.png');
        game.load.spritesheet('pauseScreen', 'assets/images/ui/pause.png', 1920, 1080, 3);

        //Map
        game.load.tilemap('map', 'assets/levels/level1/bottom.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tunnel1', 'assets/levels/level1/tunnel1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tunnel2', 'assets/levels/level1/tunnel2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('top', 'assets/levels/level1/top.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/levels/level1/grass.png');

        //Player
        game.load.atlasXML('playerSprite', 'assets/images/sprites/fox.png', 'assets/images/sprites/fox.xml');

        game.load.audio('music', ['assets/music/PeacefulIsland.mp3', 'assets/music/PeacefulIsland.ogg']);

	},

	create : function(){

        //Play Music
        //music = game.add.audio('music', 1, true);
        //music.play('', 0, 1, true);

        //Set Varible Values
        player.movingRight = true;
        player.movingLeft = false;
        debugShow = false;

        //Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Draw Background
        bg = game.add.sprite(0, 0, 'bg');

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

        //Draw Player
        player = game.add.sprite(400, 400, 'playerSprite');
        player.anchor.setTo(0.7, 1);
        player.scale.setTo(4, 4);
        player.smoothed = false;

        //Draw Map on top of player
        layerTop = topMap.createLayer('collisionLayer');

        //Map collision
        map.setCollisionBetween(0, 6);
        tunnel1.setCollisionBetween(0, 6);
        tunnel2.setCollisionBetween(0, 6);
        topMap.setCollisionBetween(0, 6);

        //Set camera boundaries
        camera = game.world.setBounds(0.5, 0, 7600, 1208);

        //Add Physics
        game.physics.arcade.enable(player);
        game.physics.arcade.enable(layerMaster);
        game.physics.arcade.enable(layerTunnel1);
        game.physics.arcade.enable(layerTunnel2);
        game.physics.arcade.enable(layerTop);

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

        //Add Pause Image
        pauseImage = game.add.sprite(0, 0, 'pauseScreen');
        pauseImage.fixedToCamera = true;
        pauseImage.visible =! pauseImage.visible;

        //Addd different selectors
        pauseImage.animations.add('pausePlay', [0], 8, true);
        pauseImage.animations.add('pauseSetting', [1], 8, true);
        pauseImage.animations.add('pauseMenu', [2], 8, true);

        //Controlls
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        //Camera follow player
        cameraFollow = game.camera.follow(player);

        //Fullscreen on click
        this.input.onDown.add(MainGame.prototype.gofull, game);

        //Calls unpause function to start looping
        MainGame.prototype.unPause();

        //Name
        console.log("Copyright 2014, Jaxson C. Van Doorn and Avery M. Suzuki");

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
        if (cursors.left.isDown && player.isDigging === false)
        {
            //Flip Image
            player.scale.x = -4;
                
                //Above Ground
                if(player.dig === false)
                {
                    player.movingRight = false;
                    player.movingLeft = true;
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
                    player.body.velocity.x = -350;
                        
                        //Crawl Left Animation
                        if(player.body.blocked.down)
                        {
                            player.animations.play('crawlLeft');
                        }
                }
        }

        //Walk Right
        else if (cursors.right.isDown && player.isDigging === false)
        {
            //Flip Image
            player.scale.x = 4;
                
                //Above Ground
                if(player.dig === false)
                {
                    player.movingLeft = false;
                    player.movingRight = true;
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
        if (!cursors.down.isDown && player.body.blocked.down)
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
        if (cursors.down.isDown && keyDebouncing.downPressed === false && player.body.blocked.down && !player.isDigging === true && player.y < 1281)
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
            camera = game.world.setBounds(0.5, 0, 7600, 1380);
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
        if (pauseButton.isDown && keyDebouncing.enterPressed === false && player.body.blocked.down)
        {
            keyDebouncing.enterPressed = true;

            //Draws Pause Screen 
            pauseImage.visible =! pauseImage.visible;
        
            //Pauses Game
            game.paused = true;
        }
	},

	unPause : function(){

        if (game.paused === true)
        {
            //Resume
            if (menuSelect == 1)
            {
                pauseImage.animations.play('pausePlay');
                    
                    //Unpause
                    if (pauseButton.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = false;

                        //Unpauses Game
                        game.paused = false;

                        //Undraws Pause Screen
                        pauseImage.visible =! pauseImage.visible;
                    }
            }

            //Settings
            if (menuSelect == 2)
            {
                pauseImage.animations.play('pauseSetting');
            }

            //Back To Menu
            if (menuSelect == 3)
            {
                pauseImage.animations.play('pauseMenu');

                    //To Menu
                    if (pauseButton.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        
                        //Call Function To Exit
                        MainGame.prototype.exit();
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
        }
        else 
        {
            game.scale.maxWidth = 1920;
            game.scale.maxHeight = 1080;
            game.scale.setScreenSize();
        }

        //Refreshs function 60 times a second
        setTimeout(MainGame.prototype.unPause, 1000 / 60);
	},

    timeCheck : function(){

        timeChecker = game.time.now; 
        player.isDigging = true;
        return false; 
    },

    tunnel1 : function(){

        tunnel1.fill(1, layerTunnel1.getTileX(player.x), layerTunnel1.getTileY(player.y - 128), 1, 1);
        return false;
    },

    tunnel2 : function(){

        tunnel2.fill(1, layerTunnel2.getTileX(player.x), layerTunnel2.getTileY(player.y - 128), 1, 1);
        return false;
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

    exit : function(){
        
        //Unpause The Game
        game.paused = false;
        
        //Cleanup      
        bg.kill();
        pauseImage.kill();
        player.kill();
        layerMaster.kill();
        layerTunnel1.kill();
        layerTunnel2.kill();
        layerTop.kill();
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
