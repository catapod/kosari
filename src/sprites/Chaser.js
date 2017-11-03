import Phaser from 'phaser'

import signals from '../signals'
import config from '../config'

import Ground from './Ground'
import Swamp from './Swamp'

let _floor

export default class extends Phaser.Sprite {
  constructor (game, floorManager) {
    super(game, 0, 0, 'player')

    _floor = floorManager

    this.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    this.animations.add('mow', [15, 16, 17])

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
    const cameraOffset = Math.max(0, this.x - this.game.camera.x)
    const bodyOffset = this.body.offset.x - this.body.width / 2
    const currentTile = Math.floor((cameraOffset + bodyOffset) / config.tileSize)

    return ((_floor.getAt(currentTile) instanceof Ground) &&
      (_floor.getAt(currentTile + 1) instanceof Swamp)) ||
      (_floor.getAt(currentTile) instanceof Swamp)
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
