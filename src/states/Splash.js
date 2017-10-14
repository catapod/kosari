import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.stage.backgroundColor = '#191820'
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.atlas('player', 'assets/images/player.png', 'assets/images/player.json')
    this.load.image('surface', 'assets/images/surface.png')

    this.load.atlas('surface.grass', 'assets/images/grass.png', 'assets/images/grass.json')
    this.load.image('surface.grave', 'assets/images/grave.png')

    this.load.atlas('bg', 'assets/images/bg.png', 'assets/images/bg.json')

    this.load.atlas('enemy.skeleton', 'assets/images/enemies/skeleton.png', 'assets/images/enemies/skeleton.json')
    this.load.atlas('enemy.bat', 'assets/images/enemies/bat.png', 'assets/images/enemies/bat.json')

    this.load.atlas('menu', 'assets/images/menu.png', 'assets/images/menu.json')

    this.load.image('pauseBtn', 'assets/images/pauseBtn.png')
    this.load.image('resumeBtn', 'assets/images/resumeBtn.png')
    this.load.image('controlsInfo', 'assets/images/controlsInfo.png')

    this.load.spritesheet('splash', 'assets/images/splash.png', 256, 128)

    this.load.audio('sound.background', 'assets/audio/background.wav')
    this.load.audio('sound.jump', 'assets/audio/jump.wav')
    this.load.audio('sound.attack', 'assets/audio/mow.wav')
  }

  create () {
    const { background, jump, attack } = this.game.vars.sounds
    this.game.sounds = {}
    this.game.sounds.background = this.game.sound.add('sound.background', background.volume, background.loop)
    this.game.sounds.jump = this.game.sound.add('sound.jump', jump.volume, jump.loop)
    this.game.sounds.attack = this.game.sound.add('sound.attack', attack.volume, attack.loop)

    const splash = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'splash')
    centerGameObjects([splash])

    splash.animations.add('play')

    splash.events.onAnimationStart.add(() => {
      this.loaderBar.destroy()
      this.loaderBg.destroy()
    }, this)
    splash.events.onAnimationComplete.add(() => {
      this.state.start('Menu')
    }, this)

    splash.animations.play('play', 20)
  }
}
