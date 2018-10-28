//Jaxson C. Van Doorn, 2014

//Set up Canvas
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'canvasdiv')
var isFullscreen = 'Off'

window.onload = function() {
  //Max Scale
  game.scale.maxWidth = 1920
  game.scale.maxHeight = 1080

  //Auto Scale
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  game.scale.setScreenSize()

  //Create Game States
  game.state.add('Menu', mainMenu)
  game.state.add('chapter1', chapter1)

  //Load Menu State
  game.state.start('Menu')

  let resize = (e) => {
    window.dispatchEvent(new Event('resize'))
    isFullscreen = isFullscreen === 'Off' ? 'On' : 'Off'
  }
  document.addEventListener("fullscreenchange", resize, false)
  document.addEventListener("webkitfullscreenchange", resize, false)
  document.addEventListener("mozfullscreenchange", resize, false)
}

//Jaxson C. Van Doorn, 2014
