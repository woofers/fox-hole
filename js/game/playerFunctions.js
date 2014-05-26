//Jaxson C. Van Doorn, 2014

var playerFunctions = {};

playerFuntions = function(game){};

playerFunctions.prototype = {

    loadPlayer : function(){

        //Draw Player
        player = game.add.sprite(sav.x, 700, 'playerSprite');
        player.anchor.setTo(0.7, 1);
        player.scale.setTo(4, 4);
        player.smoothed = false;

        //Add Physics
        game.physics.arcade.enable(player);
        
        //Adjust Body Size
        player.body.setSize(40, 30, 30, 0);
        
        //Physics Properties
        player.body.bounce.y = 0;
        player.body.gravity.y = 700;
        player.body.collideWorldBounds = true;

        //Create Group
        playerGroup = game.add.group();
        playerGroup.add(player);

        //Player Animations

        //Walk
        player.animations.add('idle', Phaser.Animation.generateFrameNames('foxIdle', 0, 15, '', 4), 10, true);

        //Idle
        player.animations.add('walking', Phaser.Animation.generateFrameNames('foxRunning', 0, 6, '', 4), 10, true);

        //Jump
        player.animations.add('jumping', Phaser.Animation.generateFrameNames('foxRunning', 0, 0, '', 4), 10, true);
        
        //Crawl
        player.animations.add('crawl', Phaser.Animation.generateFrameNames('foxCrawl', 0, 3, '', 4), 10, true);
        player.animations.add('crawlIdle', Phaser.Animation.generateFrameNames('foxCrawl', 0, 0, '', 4), 10, true);

        //Diging
        player.animations.add('dig', Phaser.Animation.generateFrameNames('foxDig', 0, 17, '', 4), 10, false);
        player.animations.add('digSmall', Phaser.Animation.generateFrameNames('foxDigSmall', 0, 24, '', 4), 13, false);
    },

    digDelayFunc : function(){

        digDelay = game.time.now; 
        player.isDigging = true;
    },

    topLayer : function(){
        
        player.layer = 1;
        player.body.velocity.x = 0;
    },

    tunnel1 : function(){

        player.layer = 2;
        tunnel1.fill(8, layerTunnel1.getTileX(player.x - player.directX), layerTunnel1.getTileY(player.y - 128), 3, 1);
    },

    tunnel2 : function(){

        player.layer = 3;
        tunnel2.fill(8, layerTunnel2.getTileX(player.x - player.directX), layerTunnel2.getTileY(player.y - 128), 3, 1);
    },

    kill : function(){
        
        //Player
        mudTile = 8;
        player.x = sav.x;
        player.y = 700;
        player.movingLeft = false;
        player.movingRight = true;
        digDelay = null;

        //Enemy
        follow = false;
        croc1.destroy();
        croc11Functions.prototype.loadCroc1();

        //Level
        chapter1.prototype.killLevel();
    },
};

//Jaxson C. Van Doorn, 2014
