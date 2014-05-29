//Jaxson C. Van Doorn, 2014

var checkpoint = {};

checkpoint = function(game){};

checkpoint.prototype = {

    loadCheckpoint: function(){

        //Create Checkpoint Group
        checkpointGroup = game.add.group(); 
        
        //Create Checkpoint From Tilemap
        checkpointGroupChilldren = objectsMap.createFromObjects('objects', 52, 'checkpointSprite', 0, true, false, checkpointGroup);

        //Enable Body
        checkpointGroup.enableBody = true;
        game.physics.arcade.enable(checkpointGroup);

        //Set Properties
        //croc1.setAll('anchor.x', 0.5);
        //croc1.setAll('scale.x', 2.5);
        //croc1.setAll('scale.y', 2.5);
        //croc1.setAll('smoothed', false);

        //croc1.getAt(0).scale.x = -2.5;
    },

    activate : function(){

        sav.x = player.x;
    }
};

//Jaxson C. Van Doorn, 2014
