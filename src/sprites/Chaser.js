import Phaser from 'phaser'

import signals from '../signals'
import config from '../config'

import Ground from './Ground'
import Swamp from './Swamp'

// game terrain instance
let _terrain

export default class extends Phaser.Sprite {
  constructor (game, terrain) {
    _terrain = terrain

    super(game, 0, 0, 'player')

    this.animations.add('run')
    this.animations.play('run', 30, true)

    this.game.physics.enable(this)
    this.body.setSize(19, 54, 43, 10)

    this.game.add.existing(this)

    this.backlogRate = 1

    signals.speedReset.add(this.slowDown, this)
  }

  catch (obj, ...args) {
    return this.game.physics.arcade.collide(obj, this, ...args)
  }

  isTimeToJump () {
    return (_terrain.floor.getAt(0) instanceof Ground) &&
      (_terrain.floor.getAt(2) instanceof Swamp)
  }

  update () {
    if (this.isTimeToJump()) this.jump()

    if (this.left <= this.game.camera.x) {
      this.backlogRate = 1
    }

    this.run()
  }

  run () {
    this.body.velocity.x = this.game.vars.speed * this.backlogRate
  }

  isOnFloor () {
    return this.body.touching.down
  }

  jump () {
    if (this.isOnFloor()) {
      this.body.velocity.y = -this.game.vars.player.jumpSpeed.y
    }
  }

  attack () {
    // attack animation
  }

  slowDown () {
    this.backlogRate = config.chaser.backlogRate
  }
}
