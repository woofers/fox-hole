//Jaxson C. Van Doorn, 2014

var gobalFunctions = {};

gobalFunctions = function(game){};

gobalFunctions.prototype = {

    highlight1: function(){

        text.selector1.font = 'Century Gothic Bold';
        text.selector1.fontSize = 80;
        text.selector2.font = 'Century Gothic';
        text.selector2.fontSize = 60;
        text.selector3.font = 'Century Gothic';
        text.selector3.fontSize = 60;
    },

    highlight2: function(){

        text.selector1.font = 'Century Gothic';
        text.selector1.fontSize = 60;
        text.selector2.font = 'Century Gothic Bold';
        text.selector2.fontSize = 80;
        text.selector3.font = 'Century Gothic';
        text.selector3.fontSize = 60;
    },

    highlight3: function(){

        text.selector1.font = 'Century Gothic';
        text.selector1.fontSize = 60;
        text.selector2.font = 'Century Gothic';
        text.selector2.fontSize = 60;
        text.selector3.font = 'Century Gothic Bold';
        text.selector3.fontSize = 80;
    },

    mainText : function(){
            
        text.title.setText("FOX");
        text.selector1.setText("Play");
        text.selector2.setText("Settings");
        text.selector3.setText("About");
    },

    settingsText : function(){
            
        text.title.setText("SETTINGS");
        text.selector1.setText("Resolution - " + settings.resolutionWidth + " x " + settings.resolutionHeight);
        text.selector2.setText("Fullscreen - " + settings.fullscreenString);
        text.selector3.setText("Sound - " + settings.sound);
    },

    soundUp : function(){

        settings.sound += 1;
    },

    soundDown : function(){

        settings.sound -= 1;
    },

    scale: function(){
        
        //Rescale when In and Out of Fullscreen
        if (Phaser.ScaleManager.prototype.isFullScreen === null)
        {
            game.scale.maxWidth = 1368;
            game.scale.maxHeight = 768;
            game.scale.setScreenSize();
            settings.fullscreenString = "Off";
            settings.fullscreen = false;
        }
        else 
        {
            game.scale.maxWidth = 1920;
            game.scale.maxHeight = 1080;
            game.scale.setScreenSize();
            settings.fullscreenString = "On";
            settings.fullscreen = true;
        }
        
        //Change Resolution String
        settings.resolutionWidth = game.scale.width;
        settings.resolutionHeight = game.scale.height;

        //Refreshs function 60 times a second
        setTimeout(gobalFunctions.prototype.scale, 1000 / 60);
    },

    soundAdjust : function(){
        
        //Volume Controll
        music.volume = settings.sound / 10;

        //Refreshs function 60 times a second
        setTimeout(gobalFunctions.prototype.soundAdjust, 1000 / 60);
    },

    empty : function(){
    
    },

    fullExit : function(){
        
        if (document.exitFullscreen) 
        {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) 
        {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) 
        {
            document.webkitCancelFullScreen();
        }
    },

    gofull : function(){

        //Scale Screen To Fullscreen
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.startFullScreen();
    }
};

//Jaxson C. Van Doorn, 2014