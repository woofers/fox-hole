//Jaxson C. Van Doorn, 2014

var enemy1Functions = {};

enemy1Funtions = function(game){};

enemy1Functions.prototype = {

    loadEnemy : function(){

        //Create Enemy Group
        enemy = game.add.group(); 
        
        //Create Enemy From Tilemap
        enemyChilldren = topMap.createFromObjects('enemy1', 7, 'enemySprite', 0, true, false, enemy);

        enemy.enableBody = true;
        game.physics.arcade.enable(enemy);

        enemy.setAll('anchor.x', 0.5);
        enemy.setAll('scale.x', 4);
        enemy.setAll('scale.y', 4);

        enemy.setAll('body.bounce', 0);
        enemy.setAll('body.gravity.y', 700);
        enemy.setAll('body.collideWorldBounds', true);

        //Walk
        enemy.callAll('animations.add', 'animations', 'spin', Phaser.Animation.generateFrameNames('foxIdle', 0, 15, '', 4), 10, true);
        enemy.callAll('animations.play', 'animations', 'spin');
    },

    kill : function(player, enemy){

        if (attackButton.isDown && player.scale.x == enemy.scale.x)
        {
            enemy.kill();
        }
        else
        {
        	playerFunctions.prototype.kill();
        }
    }
};

//Jaxson C. Van Doorn, 2014
