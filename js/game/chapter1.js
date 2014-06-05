//Jaxson C. Van Doorn, 2014

var chapter1 = {};

chapter1 = function(game){};

chapter1.prototype = {
	
    preload : function(){

        //Set Varible Values
        debugShow = true;
        currentScreen = 1;
        sav.cameraY = 1208;
        game.time.advancedTiming = true;

        //Loading Screen
        game.add.sprite(0, 0, 'loadingScreen');

        //Pause
        game.load.image('pausedImage', 'assets/images/ui/pause.png');

        //Background and UI
        game.load.image('bg', 'assets/levels/level1/level.png');

        //Tile Maps
        game.load.tilemap('dug', 'assets/levels/level1/dug.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map', 'assets/levels/level1/bottom.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tunnel1', 'assets/levels/level1/tunnel1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tunnel2', 'assets/levels/level1/tunnel2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('top', 'assets/levels/level1/top.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('objects', 'assets/levels/level1/objects.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/levels/level1/tiles.png');

        //Player
        game.load.atlasXML('playerSprite', 'assets/images/sprites/fox.png', 'assets/images/sprites/fox.xml');
        
        //Enemy
        game.load.atlasXML('croc1Sprite', 'assets/images/sprites/croc1.png', 'assets/images/sprites/croc1.xml');

        //Checkpoint
        game.load.atlasXML('checkpointSprite', 'assets/images/sprites/checkpoint.png', 'assets/images/sprites/checkpoint.xml');

        //Tree
        game.load.image('treeSprite', 'assets/images/sprites/tree.png');

        //Music
        game.load.audio('gameMusic', ['assets/music/PeacefulIsland.mp3', 'assets/music/PeacefulIsland.ogg']);
	},

	create : function(){

        //Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Draw Background
        bg = game.add.sprite(0, 0, 'bg');

        //Load Functions
        chapter1.prototype.loadMap();
        croc1Functions.prototype.load();
        checkpoint.prototype.load();
        tree.prototype.load();
        playerFunctions.prototype.load();
        chapter1.prototype.playMusic();
        pauseMenu.prototype.pauseGame();
        pauseMenu.prototype.loadPauseBg();
        
        //Set Varible Values
        player.movingRight = true;
        player.movingLeft = false;
        player.directX = 80;
        player.isDigging = false;
        player.dig = false;

        //Set camera boundaries
        camera = game.world.setBounds(0.5, 0, 45600, sav.cameraY);

        //Camera follow player
        cameraFollow = game.camera.follow(player);

        //Controlls
        cursors = game.input.keyboard.createCursorKeys();
        upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.R);
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        backSelect = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);

        //Fixies Clipping
        game.physics.arcade.TILE_BIAS = 128;

        //Name
        console.log("Copyright 2014, Jaxson C. Van Doorn and Avery M. Suzuki");
	},

    loadMap : function(){
        
        //Loads title map
        dug = game.add.tilemap('dug');
        map = game.add.tilemap('map');
        tunnel1 = game.add.tilemap('tunnel1');
        tunnel2 = game.add.tilemap('tunnel2');
        topMap = game.add.tilemap('top');
        objectsMap = game.add.tilemap('objects');

        dug.addTilesetImage('tiles', 'tiles');
        map.addTilesetImage('tiles', 'tiles');
        tunnel1.addTilesetImage('tiles', 'tiles');
        tunnel2.addTilesetImage('tiles', 'tiles');
        topMap.addTilesetImage('tiles', 'tiles');
        objectsMap.addTilesetImage('tiles', 'tiles');

        //Draws map to screen        
        layerDug = dug.createLayer('dug');
        layerTunnel1 = tunnel1.createLayer('collisionLayer');
        layerTunnel2 = tunnel2.createLayer('collisionLayer');
        layerMaster = map.createLayer('collisionLayer');
        layerTop = topMap.createLayer('collisionLayer');
        layerObjects = objectsMap.createLayer('collisionLayer');

        //Map collision
        map.setCollisionBetween(0, 47);
        tunnel1.setCollisionBetween(0, 47);
        tunnel2.setCollisionBetween(0, 47);
        topMap.setCollisionBetween(0, 47);
        objectsMap.setCollisionBetween(0, 47);
    },

    playMusic : function(){

        //Play Music
        music = game.add.audio('gameMusic', 1, true);
        music.play('', 0, 1, true);
    },

    update : function(){

        //Colide
        game.physics.arcade.collide(player, layerTop, playerFunctions.prototype.topLayer);
        game.physics.arcade.collide(player, layerTunnel1);
        game.physics.arcade.collide(player, layerTunnel2, playerFunctions.prototype.tunnel1);
        game.physics.arcade.collide(player, layerMaster, playerFunctions.prototype.tunnel2);
        game.physics.arcade.collide(player, layerObjects, playerFunctions.prototype.objectsLayer);

        //Enemy
        game.physics.arcade.overlap(player, croc1, croc1Functions.prototype.killCheck, null, this);
        game.physics.arcade.collide(croc1, layerTop);
        game.physics.arcade.collide(croc1, layerObjects);

        //Checkpoint
        game.physics.arcade.overlap(player, checkpointGroup, checkpoint.prototype.activate, null, this);
        game.physics.arcade.collide(checkpointGroup, layerTop);

        //Tree
        //game.physics.arcade.collide(treeGroup, layerTop);
        //game.physics.arcade.overlap(player, treeGroup, croc1Functions.prototype.killCheck, null, this);


        //Reset Velocity
        player.body.velocity.x = 0;
        
        //Create Time Counter
        currentTime = game.time.now;

        //Moving
        if (player.isDigging === false)
        {
            //Walk Left
            if (leftButton.isDown)
            {
                player.scale.x = -4;
                player.body.offset.x = 35; 
                player.movingRight = false;
                player.movingLeft = true;
                player.directX = 80;

                    //Above Ground
                    if (player.dig === false)
                    {
                        player.body.velocity.x = -550;

                            //Walk Left Animation
                            if (player.body.blocked.down)
                            {
                                player.animations.play('walking');
                            }

                            //Jump Left Animation
                            else
                            {
                                player.animations.play('jumping');
                            }
                    }

                    //Underground
                    if (player.dig === true)
                    {
                        player.body.velocity.x = -350;
                            
                            //Crawl Left Animation
                            if (player.body.blocked.down)
                            {
                                player.animations.play('crawl');
                            }
                    }
            }

            //Walk Right
            else if (rightButton.isDown)
            {
                player.scale.x = 4;
                player.body.offset.x = 30; 
                player.movingLeft = false;
                player.movingRight = true;
                player.directX = 190;
                    
                    //Above Ground
                    if (player.dig === false)
                    {
                        player.body.velocity.x = 550;
                        
                            //Walk Right Animation
                            if (player.body.blocked.down)
                            {
                                player.animations.play('walking');
                            }

                            //Jump Right Animation
                            else
                            {
                                player.animations.play('jumping'); 
                            }
                    }

                    //Underground
                    if (player.dig === true)
                    {
                        player.body.velocity.x = 350;
                        
                            //Crawl Right Animation
                            if(player.body.blocked.down)
                            {
                                player.animations.play('crawl');
                            }
                    }
            }
        
            //Still
            else
            {
                //Above Ground
                if(player.dig === false)
                {
                    player.animations.play('idle');
                            
                        //Idle Left Animation
                        if (player.movingLeft === true)
                        {
                            player.scale.x = -4;
                        }

                        //Idle Right Animation
                        if (player.movingRight === true)
                        {
                            player.scale.x = 4;
                        }
                }

                //Underground
                if (player.dig === true)
                {
                    player.animations.play('crawlIdle');

                        //Idle Left Animation
                        if (player.movingLeft === true)
                        {
                            player.scale.x = -4;
                        }

                        //Idle Right Animation
                        if (player.movingRight === true)
                        {
                            player.scale.x = 4;
                        } 
                }
            }
        }

        //Jump
        if (jumpButton.isDown)
        {
            //Single Jump
            if (player.body.blocked.down && player.isDigging === false && player.dig === false && keyDebouncing.spacePressed === false)
            {
                keyDebouncing.spacePressed = true;
                player.body.velocity.y = -450;
            }

            //Double Jump
            if (player.dobuleJump === false && !player.body.blocked.down && keyDebouncing.spacePressed === false)
            {
                keyDebouncing.spacePressed = true;
                player.dobuleJump = true;
                player.body.velocity.y = -450;
            }
        }

        //Reset Double Jump Varible
        if (player.body.blocked.down)
        {
            player.dobuleJump = false;
        }
        else if (!player.body.blocked.down)
        {
            player.dig = false;
        }

        //----------Dig Start----------//

        //Delay Camera Move Until Animation is Done
        if (player.isDigging === true)
        {
            //Tunnel 1
            if (currentTime - digDelay > 1600 && player.layer == 1)
            {
                player.isDigging = false;
                keyDebouncing.downPressed = true;
                topMap.putTileWorldXY(mudTile, player.x, player.y - 100, 128, 128, layerTop);
                player.y = player.y + 256;
                player.dig = true;
            }

            //Tunnel 2
            if (currentTime - digDelay > 1800 && player.layer == 2)
            {
                player.isDigging = false;
                keyDebouncing.downPressed = true;
                player.y = player.y + 128;
            }  
        }

        //Digging Animations
        if (player.isDigging === true)
        {
            //To Tunnel 1
            if (player.layer == 1)
            {
                player.animations.play('dig');
                    
                    //Dig Left Animation
                    if (player.movingLeft === true)
                    {
                        player.scale.x = -4;
                    }

                    //Dig Right Animation
                    else if (player.movingRight === true)
                    {
                        player.scale.x = 4;
                    }    
            }

            //To Tunnel 2
            if (player.layer == 2)
            {
                player.animations.play('digSmall');
                
                    //Dig Left Animation
                    if (player.movingLeft === true)
                    {
                        player.scale.x = -4;
                    }

                    //Dig Right Animation
                    else if (player.movingRight === true)
                    {
                        player.scale.x = 4;
                    }    
            }
        }

        //Down
        if (downButton.isDown && player.body.blocked.down && !player.isDigging === true && player.layer < 3 && playerFunctions.prototype.tileBelow() && keyDebouncing.downPressed === false)
        {
            if (player.layer < 2 && playerFunctions.prototype.onTile())
            {
                playerFunctions.prototype.digDown();
            }
            else if (player.layer > 1)
            {
                playerFunctions.prototype.digDown();
            }
        }

        //Up
        if (jumpButton.isDown && player.isDigging === false && playerFunctions.prototype.tileAbove() && keyDebouncing.spacePressed === false)
        {
            if (player.layer == 2)
            {
                keyDebouncing.spacePressed = true;
                player.y = player.y - 260;
                
                chapter1.prototype.killLevel();
                player.dig = false;
            }

            if (player.layer == 3)
            {
                keyDebouncing.spacePressed = true;
                player.y = player.y - 128;
            }
        }
        
        //----------Dig End----------//

        //Camera
        sav.cameraY = 184 + player.y;
        camera = game.world.setBounds(0.5, 0, 45600, sav.cameraY);

        //Camera Max out
        if (sav.cameraY > 1536)
        {
            sav.cameraY = 1536;
            camera = game.world.setBounds(0.5, 0, 45600, sav.cameraY);
        }

        //Stop the anmation
        if (player.body.blocked.right || player.body.blocked.left)
        {
            player.animations.stop();
        }

        //Croc1 AI
        for (i = 0; i < croc1.length; i++)
        {
            if (player.dig === false)
            {
                //Facing Right -->
                if (croc1.getAt(i).scale.x == 2.5)
                {
                    //Follow Right
                    if (player.x - 500 < croc1.getAt(i).x && player.x > croc1.getAt(i).x)
                    {
                        croc1.getAt(i).scale.x = 2.5;
                        croc1.getAt(i).follow = true;
                        croc1.getAt(i).tileBeside = topMap.getTileWorldXY(player.x + 128, player.y - 128);
                    }
                    
                    //Flip to Left
                    if (player.x + 500 > croc1.getAt(i).x && player.x < croc1.getAt(i).x && croc1.getAt(i).follow === true)
                    {
                        croc1.getAt(i).scale.x = -2.5;
                    }

                    //Stop Follow Right
                    if (player.x - 1200 > croc1.getAt(i).x && player.x > croc1.getAt(i).x && croc1.getAt(i).body.blocked.down)
                    {
                        croc1.getAt(i).follow = false;
                        game.physics.arcade.moveToObject(croc1.getAt(i), player, 0, 0);
                    }
                }
                
                //Facing Left <--
                if (croc1.getAt(i).scale.x == -2.5)
                {
                    //Follow Left
                    if (player.x + 500 > croc1.getAt(i).x && player.x < croc1.getAt(i).x)
                    {
                        croc1.getAt(i).scale.x = -2.5;
                        croc1.getAt(i).follow = true;
                        croc1.getAt(i).tileBeside = topMap.getTileWorldXY(player.x - 128, player.y - 128);
                    }
                    
                    //Flip to Right
                    if (player.x - 500 < croc1.getAt(i).x && player.x > croc1.getAt(i).x && croc1.getAt(i).follow === true)
                    {
                        croc1.getAt(i).scale.x = 2.5;
                    }

                    //Stop Follow Left
                    if (player.x + 1200 < croc1.getAt(i).x && player.x < croc1.getAt(i).x && croc1.getAt(i).body.blocked.down)
                    {
                        croc1.getAt(i).follow = false;
                        game.physics.arcade.moveToObject(croc1.getAt(i), player, 0, 0);
                    }
                }

                if (!croc1.getAt(i).tileBeside === null)
                {
                    //Jump
                    if (croc1.getAt(i).body.blocked.right || croc1.getAt(i).body.blocked.left)
                    {
                        croc1.getAt(i).y -= 20;
                    }
                }

                //Follow
                if (croc1.getAt(i).follow === true)
                {
                    game.physics.arcade.moveToObject(croc1.getAt(i), player, 375, 0); 
                }
                
                //Set follow to false
                if (!croc1.getAt(i).follow === true)
                {
                    croc1.getAt(i).follow = false;
                }
            }
            
            //Stop Follow
            else if (player.dig === true) 
            {
                croc1.getAt(i).follow = false;
                game.physics.arcade.moveToObject(croc1.getAt(i), player, 0, 0);
            }
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

        //Pause
        if (pauseButton.isDown && keyDebouncing.enterPressed === false && player.body.blocked.down && player.isDigging === false)
        {
            keyDebouncing.enterPressed = true;

            pauseMenuBg.bringToTop();
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
            game.debug.text('FPS: ' + game.time.fps, 200, 32);
            game.debug.text('isDigging: ' + player.isDigging, 32, 128);
            game.debug.text('AnimationFrame: ' + player.animations.currentFrame.index, 32, 160);
            game.debug.text('Animation: ' + player.animations.currentAnim.name, 32, 192);
            game.debug.text('Speed: ' + player.body.velocity.x, 32, 226);
            game.debug.text('Menu Selector: ' + menuSelect, 32, 258);
            game.debug.spriteInfo(player, 32, 322);
            game.debug.soundInfo(music, 32, 400);
            //game.debug.body(player);
            //game.debug.body(treeGroup.getAt(0));
        }
    },

    killLevel : function(){

        layerTunnel1.kill();
        layerTunnel2.kill();
        layerTop.kill();
        layerObjects.kill();

        chapter1.prototype.resetLevel();
    },

    resetLevel : function(){

        //Loads title map
        tunnel1 = game.add.tilemap('tunnel1');
        tunnel2 = game.add.tilemap('tunnel2');
        topMap = game.add.tilemap('top');
        objectsMap = game.add.tilemap('objects');

        tunnel1.addTilesetImage('tiles', 'tiles');
        tunnel2.addTilesetImage('tiles', 'tiles');
        topMap.addTilesetImage('tiles', 'tiles');
        objectsMap.addTilesetImage('tiles', 'tiles');

        //Draws map to screen        
        layerTunnel1 = tunnel1.createLayer('collisionLayer');
        layerTunnel2 = tunnel2.createLayer('collisionLayer');
        layerTop = topMap.createLayer('collisionLayer');
        layerObjects = objectsMap.createLayer('collisionLayer');

        //Map collision
        tunnel1.setCollisionBetween(0, 47);
        tunnel2.setCollisionBetween(0, 47);
        topMap.setCollisionBetween(0, 47);
        objectsMap.setCollisionBetween(0, 47);
    },

    save : function(){

        //Save
        store.set("save.x", sav.x);
        store.set("save.chapterString", "The Forest");
        store.set("save.chapter", sav.chapter);
    },

    exit : function(){
        
        //Unpause The Game
        game.paused = false;

        //Save
        chapter1.prototype.save();

        //Cleanup      
        pauseMenu.prototype.textKill();
        bg.kill();
        pauseMenuBg.kill();
        player.kill();
        croc1.destroy();
        checkpointGroup.destroy();
        treeGroup.destroy();
        layerDug.kill();
        layerMaster.kill();
        layerTunnel1.kill();
        layerTunnel2.kill();
        layerTop.kill();
        layerObjects.kill();
        music.stop();

        //Start Menu
        game.state.start('Menu');
    }
};

//Jaxson C. Van Doorn, 2014
