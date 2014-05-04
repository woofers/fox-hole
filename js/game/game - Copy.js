//Jaxson C. Van Doorn, 2014

var MainGame = {};

MainGame = function(game){};

var keyDebouncing = {
                        downPressed: false,
                        spacePressed: false,
                        enterPressed: false
                    };
var cameraScroll;
var debugShow;

//Player Varibles
var player = {
                movingRight: true,
                movingLeft: false,
                dobuleJump: false,
                dig: false,
                digHold: 0
            };

MainGame.prototype = {
	
    preload : function(){

        //Loading Screen
        game.add.sprite(0, 0, 'loadingScreen');

        //Background and UI
        game.load.image('bg', 'assets/images/backgrounds/level1/level.png');
        game.load.image('pauseScreen', 'assets/images/ui/pause.png');

        //Map
        game.load.tilemap('map', 'assets/images/map/level1/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tunnel1', 'assets/images/map/level1/tunnel1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tunnel2', 'assets/images/map/level1/tunnel2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('top', 'assets/images/map/level1/tunnel3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/images/map/level1/grass.png');

        //Player
        game.load.atlasXML('playerSprite', 'assets/images/fox.png', 'assets/images/fox.xml');

	},

	create : function(){

        //Set Varible Values
        player.movingRight = true;
        player.digHold = 0;
        debugShow = true;

        //Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Draw Background
        game.add.sprite(0, 0, 'bg');

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
        console.log("Jaxson Van Doorn and Avery Suzuki, 2014");

	},

	update : function(){
    
        //Colide
        game.physics.arcade.collide(player, layerTunnel1);
        game.physics.arcade.collide(player, layerTunnel2);
        game.physics.arcade.collide(player, layerTop);
        game.physics.arcade.collide(player, layerMaster);

        //Reset Velocity
        player.body.velocity.x = 0;

        //Walk Left
        if (cursors.left.isDown && player.digHold === 0)
        {
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
        else if (cursors.right.isDown && player.digHold === 0)
        {
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
        else if (player.digHold === 0)
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
        if (jumpButton.isDown && player.body.blocked.down && player.dig === false && keyDebouncing.spacePressed === false)
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

        //Check if in air
        if (player.body.blocked.down)
        {
            player.dobuleJump = false;
        }

        //Key Debouncing Space
        if (!jumpButton.isDown)
        {
            keyDebouncing.spacePressed = false;
        }

        //Key Debouncing Down
        if (!cursors.down.isDown && player.body.blocked.down)
        {
            keyDebouncing.downPressed = false;
        }

        
        //************Dig Start************//

        //Down
        if (cursors.down.isDown && keyDebouncing.downPressed === false && player.body.blocked.down)
        {

            //Tunel 1
            if(player.y == 1024)
            {
                player.digHold = player.digHold + 1;

                    //Go Down
                    if (player.digHold > 75)
                    {
                        player.digHold = 0;
                        keyDebouncing.downPressed = true;
                        player.y = player.y + 256;
                        camera = game.world.setBounds(0.5, 0, 7600, 1380);
                    }

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

            //Tunel 2
            if(player.y == 1280)
            {
                player.digHold = player.digHold + 1;

                    //Go Down
                    if (player.digHold > 75)
                    {
                        player.digHold = 0;
                        keyDebouncing.downPressed = true;
                        player.y = player.y + 128;
                        camera = game.world.setBounds(0.5, 0, 7600, 1536);
                    }

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
        else
        {
            player.digHold = 0;
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
        if (pauseButton.isDown && keyDebouncing.enterPressed === false)
        {

            //Draws Pause Screen 
            keyDebouncing.enterPressed = true;
            pauseImage = game.add.sprite(0, 0, 'pauseScreen');
            pauseImage.fixedToCamera = true;
        
            //Pauses Game
            game.paused = true;
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

	unPause : function(){

        //Unpause
        if (pauseButton.isDown && game.paused === true && keyDebouncing.enterPressed === false)
        {
            keyDebouncing.enterPressed = false;

            //Unpauses Game
            game.paused = false;
      
            //Undraws Pause Screen
            pauseImage.kill();
        }

        //Key Debouncing Pause
        if (!pauseButton.isDown)
        {
            keyDebouncing.enterPressed = false;
        }

        //Refreshs function 120 times a second
        setTimeout(MainGame.prototype.unPause, 1000 / 120);
	},

    tunnel : function(player, tile){

        tile.alpha = 0.2;
        console.log("test");
        return false;
    },

    digDelay : function(){

        

    },

    render : function(){

        //Debug Info
        if(debugShow === true)
        {
            game.debug.cameraInfo(game.camera, 32, 32);
            game.debug.text('Dig Delay: ' + player.digHold, 32, 128);
            game.debug.text('AnimationFrame: ' + player.animations.currentFrame.index, 32, 160);
            game.debug.text('Animation: ' + player.animations.currentAnim.name, 32, 192);
            game.debug.text('Speed: ' + player.body.velocity.x, 32, 226);
            game.debug.spriteInfo(player, 32, 258);
        }
        
    },

	gofull : function(){

        //Scale Screen To Fullscreen
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.startFullScreen();

	}

};

//Jaxson C. Van Doorn, 2014
