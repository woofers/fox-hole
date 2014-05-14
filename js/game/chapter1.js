//Jaxson C. Van Doorn, 2014

var chapter1 = {};

chapter1 = function(game){};

//Toggle Debug Screen
var debugShow;

//Time Varibles
var digDelay;
var jumpDelay;
var currentTime;

chapter1.prototype = {
	
    preload : function(){

        //Set Varible Values
        player.movingRight = true;
        player.movingLeft = false;
        debugShow = false;
        currentScreen = 1;

        //Loading Screen
        game.add.sprite(0, 0, 'loadingScreen');

        //Pause
        game.load.image('pausedImage', 'assets/images/ui/pause.png');

        //Background and UI
        game.load.image('bg', 'assets/levels/level1/level.png');

        //Map
        game.load.tilemap('map', 'assets/levels/level1/bottom.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tunnel1', 'assets/levels/level1/tunnel1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tunnel2', 'assets/levels/level1/tunnel2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('top', 'assets/levels/level1/top.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/levels/level1/grass.png');

        //Player
        game.load.atlasXML('playerSprite', 'assets/images/sprites/fox.png', 'assets/images/sprites/fox.xml');
        game.load.atlasXML('enemySprite', 'assets/images/sprites/enemy.png', 'assets/images/sprites/fox.xml');

        //Music
        game.load.audio('music', ['assets/music/PeacefulIsland.mp3', 'assets/music/PeacefulIsland.ogg']);
	},

	create : function(){

        //Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Draw Background
        bg = game.add.sprite(0, 0, 'bg');

        //Load Functions
        chapter1.prototype.loadMap();
        playerFunctions.prototype.loadPlayer();
        chapter1.prototype.loadEnemy();
        chapter1.prototype.playMusic();
        pauseMenu.prototype.pauseGame();
        pauseMenu.prototype.loadPauseBg();

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
        this.input.onDown.add(gobalFunctions.prototype.gofull, game);

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

    loadEnemy : function(){

        enemy = game.add.group();
        enemy.enableBody = true;
        topMap.createFromObjects('enemy', 7, 'enemySprite', 0, true, false, enemy);
        game.physics.arcade.enable(enemy);

        //Walk
        enemy.callAll('animations.add', 'animations', 'spin', Phaser.Animation.generateFrameNames('foxIdle', 0, 15, '', 4), 10, true);
        enemy.callAll('animations.play', 'animations', 'spin');
    },

    playMusic : function(){
        
        //Play Music
        music = game.add.audio('music', 1, true);
        music.play('', 0, 1, true);

        //Volume Controll
        music.volume = settings.sound / 10;
    },

    update : function(){
    
        //Colide
        game.physics.arcade.collide(player, layerTunnel1);
        game.physics.arcade.collide(player, layerTunnel2, playerFunctions.prototype.tunnel1);
        game.physics.arcade.collide(player, layerTop);
        game.physics.arcade.collide(player, layerMaster, playerFunctions.prototype.tunnel2);

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
                if (player.dig === false)
                {
                    player.movingRight = false;
                    player.movingLeft = true;
                    player.directX = 80;
                    player.body.velocity.x = -550;

                        //Walk Left Animation
                        if (player.body.blocked.down)
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
                if (player.dig === true)
                {
                    player.movingRight = false;
                    player.movingLeft = true;
                    player.directX = 80;
                    player.body.velocity.x = -350;
                        
                        //Crawl Left Animation
                        if (player.body.blocked.down)
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
                if (player.dig === false)
                {
                    player.movingLeft = false;
                    player.movingRight = true;
                    player.directX = 190;
                    player.body.velocity.x = 550;
                    
                        //Walk Right Animation
                        if (player.body.blocked.down)
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
                if (player.dig === true)
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
                    if (player.movingLeft === true)
                    {
                        player.animations.play('idleLeft');
                        player.scale.x = -4;
                    }

                    //Idle Right Animation
                    if (player.movingRight === true)
                    {
                        player.animations.play('idleRight');
                        player.scale.x = 4;
                    } 
                }

                //Underground
                if (player.dig === true)
                {
                    //Idle Left Animation
                    if (player.movingLeft === true)
                    {
                        player.animations.play('crawlIdleLeft');
                        player.scale.x = -4;
                    }

                    //Idle Right Animation
                    if (player.movingRight === true)
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
        if (currentTime - digDelay > 1600)
        {
            //Tunnel 1
            if (player.y == 1024  && player.isDigging === true)
            {
                player.isDigging = false;
                keyDebouncing.downPressed = true;
                player.y = player.y + 256;
                camera = game.world.setBounds(0.5, 0, 7600, 1380);
            }

            //Tunnel 2
            if (player.y == 1280 && player.isDigging === true)
            {
                player.isDigging = false;
                keyDebouncing.downPressed = true;
                player.y = player.y + 128;
                camera = game.world.setBounds(0.5, 0, 7600, 1536);
            }  
        }

        //Digging Animations
        if (player.isDigging === true)
        {
            //To Tunnel 1
            if (player.y == 1024)
            {
                //Dig Left Animation
                if (player.movingLeft === true)
                {
                    player.animations.play('digLeft');
                    player.scale.x = -4;
                }

                //Dig Right Animation
                if (player.movingRight === true)
                {
                    player.animations.play('digRight');
                    player.scale.x = 4;
                }    
            }

            //To Tunnel 2
            if (player.y == 1280)
            {
                //Dig Left Animation
                if (player.movingLeft === true)
                {
                    player.animations.play('digLeft');
                    player.scale.x = -4;
                }

                //Dig Right Animation
                if (player.movingRight === true)
                {
                    player.animations.play('digRight');
                    player.scale.x = 4;
                }    
            }
        }

        //Down With Delay
        if (downButton.isDown && keyDebouncing.downPressed === false && player.body.blocked.down && !player.isDigging === true && player.y < 1281)
        {
            playerFunctions.prototype.digDelayFunc();
        }

        //Up to Earth
        if (jumpButton.isDown && keyDebouncing.spacePressed === false && player.y == 1280 && player.isDigging === false)
        {
            keyDebouncing.spacePressed = true;
            player.y = player.y - 256;
            camera = game.world.setBounds(0.5, 0, 7600, 1208);
        }

        //Up to Tunnel 1
        if (jumpButton.isDown && keyDebouncing.spacePressed === false && player.y == 1408 && player.body.blocked.down && player.isDigging === false)
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

            pauseMenuBg.visible =! pauseMenuBg.visible;

            //Draw Text
            pauseMenu.prototype.createTextPause();

            //Pauses Game
            game.paused = true;
        }
	},

    render : function(){

        //Debug Info
        if (debugShow === true)
        {
            game.debug.cameraInfo(game.camera, 32, 32);
            game.debug.text('isDigging: ' + player.isDigging, 32, 128);
            game.debug.text('AnimationFrame: ' + player.animations.currentFrame.index, 32, 160);
            game.debug.text('Animation: ' + player.animations.currentAnim.name, 32, 192);
            game.debug.text('Speed: ' + player.body.velocity.x, 32, 226);
            game.debug.text('Menu Selector: ' + menuSelect, 32, 258);
            game.debug.spriteInfo(player, 32, 290);
            game.debug.body(player);
        } 
    },

    exit : function(){
        
        //Unpause The Game
        game.paused = false;
        
        //Save
        store.set("save.slot1.x", player.x);

        //Cleanup      
        pauseMenu.prototype.textKill();
        bg.kill();
        player.kill();
        layerMaster.kill();
        layerTunnel1.kill();
        layerTunnel2.kill();
        layerTop.kill();
        music.stop();

        //Start Menu
        game.state.start('Menu');
    }
};

//Jaxson C. Van Doorn, 2014
