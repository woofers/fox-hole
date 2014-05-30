//Jaxson C. Van Doorn, 2014

var playerFunctions = {};

playerFuntions = function(game){};

playerFunctions.prototype = {

    load : function(){

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

    digDown : function(){

        mudTile = 49;
        playerFunctions.prototype.digDelayFunc();
        playerFunctions.prototype.onTile();
    },

    digDelayFunc : function(){

        digDelay = game.time.now;
        player.isDigging = true;
    },

    onTile : function() {

        if (player.movingLeft === true)
        {
            player.onTile = topMap.getTileWorldXY(player.x - 100, player.y);
        }
        else if (player.movingRight === true)
        {
            player.onTile = topMap.getTileWorldXY(player.x - 100, player.y);
        }

        if (player.onTile === null)
        {
            return false;
        }
        else
        {
            return true;
        }
    },

    objectsLayer : function(){
        
        player.layer = 0;
        player.body.velocity.x = 0;
    },

    topLayer : function(){
        
        player.layer = 1;
        player.dig = false;
        player.body.velocity.x = 0;
    },

    tunnel1 : function(){

        player.layer = 2;
        tunnel1.fill(51, layerTunnel1.getTileX(player.x - player.directX), layerTunnel1.getTileY(player.y - 128), 3, 1);
    },

    tunnel2 : function(){

        player.layer = 3;
        tunnel2.fill(51, layerTunnel2.getTileX(player.x - player.directX), layerTunnel2.getTileY(player.y - 128), 3, 1);
    },

    tileAbove : function() {

        if (player.layer == 3)
        {
            player.tileAbove = objectsMap.getTileWorldXY(player.x, player.y - 129);   
        }
        else if (player.layer == 2)
        {
            player.tileAbove = objectsMap.getTileWorldXY(player.x, player.y - 257);   
        }

        if (player.tileAbove === null)
        {
            return true;
        }
        else
        {
            return false;
        }
    },

    tileBelow : function() {

        if (player.layer == 2)
        {
            player.tileBelow = objectsMap.getTileWorldXY(player.x, player.y);   
        }
        else if (player.layer == 1)
        {
            player.tileBelow = objectsMap.getTileWorldXY(player.x, player.y + 129);   
        }

        if (player.tileBelow === null)
        {
            return true;
        }
        else
        {
            return false;
        }
    },

    kill : function(){
        
        //Player
        mudTile = 51;
        player.x = sav.x;
        player.y = 1022;
        player.movingLeft = false;
        player.movingRight = true;
        player.dig = false;
        player.isDigging = false;
        digDelay = null;

        //Enemy
        croc1.destroy();
        croc1Functions.prototype.load();

        //Tree
        treeGroup.destroy();
        tree.prototype.load();

        //Level
        chapter1.prototype.killLevel();
    },
};

//Jaxson C. Van Doorn, 2014
