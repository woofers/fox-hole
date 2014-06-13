//Jaxson C. Van Doorn, 2014

var chapter1 = {};

chapter1 = function(game){};

chapter1.prototype = {
	
    preload : function(){

        //Set Varible Values
        debugShow = false;
        currentScreen = 1;
        sav.cameraY = 1208;
        game.time.advancedTiming = true;
        soundPlay = false;

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
        game.load.audio('gameMusic', ['assets/music/chapter1.mp3', 'assets/music/chapter1.ogg']);

        //SFX
        game.load.audio('checkpointSound', ['assets/sfx/checkpoint.mp3', 'assets/sfx/checkpoint.ogg']);
        game.load.audio('deathSound', ['assets/sfx/death.mp3', 'assets/sfx/death.ogg']);
        game.load.audio('tailWhipSound', ['assets/sfx/tailWhip.mp3', 'assets/sfx/tailWhip.ogg']);
        game.load.audio('walkSound', ['assets/sfx/walk.mp3', 'assets/sfx/walk.ogg']);
        game.load.audio('hitSound', ['assets/sfx/hit.mp3', 'assets/sfx/hit.ogg']);
        game.load.audio('digSound', ['assets/sfx/dig.mp3', 'assets/sfx/dig.ogg']);
        game.load.audio('digDelaySound', ['assets/sfx/digDelay.mp3', 'assets/sfx/digDelay.ogg']);
	},

	create : function(){

        //Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Draw Background
        bg = game.add.sprite(0, -40, 'bg');

        //Load Functions
        chapter1.prototype.loadMap();
        checkpoint.prototype.load();
        croc1Functions.prototype.load();
        playerFunctions.prototype.load();
        tree.prototype.load();
        chapter1.prototype.playMusic();
        pauseMenu.prototype.pauseGame();
        pauseMenu.prototype.loadPauseBg();
        gobalFunctions.prototype.sfxDelay();
        
        //Set Varible Values
        playerFunctions.prototype.varibleSet();

        //Set camera boundaries
        camera = game.world.setBounds(0.5, 0, 16000, sav.cameraY);

        //Camera follow player
        cameraFollow = game.camera.follow(player);

        //Controlls
        cursors = game.input.keyboard.createCursorKeys();
        upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.R);
        attackButton2 = game.input.keyboard.addKey(Phaser.Keyboard.T);
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        select = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        backSelect = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);

        //Fixies Clipping
        game.physics.arcade.TILE_BIAS = 120;

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
        checkpointSfx = game.add.audio('checkpointSound', 1, true);
        deathSfx = game.add.audio('deathSound', 1, true);
        tailWhipSfx = game.add.audio('tailWhipSound', 1, true);
        walkSfx = game.add.audio('walkSound', 1, true);
        hitSfx = game.add.audio('hitSound', 1, true);
        digSfx = game.add.audio('digSound', 1, true);
        digDelaySfx = game.add.audio('digDelaySound', 1, true);
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
        game.physics.arcade.collide(treeGroup, layerTop);

        //Reset Velocity
        player.body.velocity.x = 0;
        
        //Create Time Counter
        currentTime = game.time.now;

        playerFunctions.prototype.main();
        gobalFunctions.prototype.camera();
        croc1Functions.prototype.ai();
        gobalFunctions.prototype.keyDebouncing();

        //Fix Sound Offset Bug
        if (currentTime - soundDelay > 2000)
        {
            soundPlay = true;
        }

        //Pause
        if (pauseButton.isDown && keyDebouncing.enterPressed === false && player.body.blocked.down && player.isDigging === false && player.killCheck === false && player.tailWhip === false)
        {
            keyDebouncing.escPressed = true;

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
            //game.debug.text('FPS: ' + game.time.fps, 200, 32);
            game.debug.text('isDigging: ' + player.isDigging, 32, 128);
            game.debug.text('AnimationFrame: ' + player.animations.currentFrame.index, 32, 160);
            game.debug.text('Animation: ' + player.animations.currentAnim.name, 32, 192);
            game.debug.text('Speed: ' + player.body.velocity.x, 32, 226);
            game.debug.text('Menu Selector: ' + menuSelect, 32, 258);
            game.debug.spriteInfo(player, 32, 322);
            game.debug.soundInfo(music, 32, 400);
            game.debug.body(croc1.getAt(1));
            game.debug.body(player);
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

        treeGroup.parent.bringToTop(treeGroup);
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
        music.volume = 0;

        //Start Menu
        game.state.start('Menu');
    }
};

//Jaxson C. Van Doorn, 2014
