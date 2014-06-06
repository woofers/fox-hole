//Jaxson C. Van Doorn, 2014

var tree = {};

tree = function(game){};

tree.prototype = {

    load: function(){

        //Create Checkpoint Group
        treeGroup = game.add.group(); 
        
        //Create Checkpoint From Tilemap
        treeGroupChilldren = objectsMap.createFromObjects('objects', 53, 'treeSprite', 0, true, false, treeGroup);

        //Enable Body and Physics
        treeGroup.enableBody = true;
        game.physics.arcade.enable(treeGroup);

        //Set Properties
        treeGroup.setAll('anchor.x', 0.5);
        treeGroup.setAll('scale.x', 4);
        treeGroup.setAll('scale.y', 4);
        treeGroup.setAll('body.offset.y', -76);
        treeGroup.setAll('body.bounce', 0);
        treeGroup.setAll('body.gravity.y', 700);
        treeGroup.setAll('smoothed', false);
    }
};

//Jaxson C. Van Doorn, 2014
