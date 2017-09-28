import config from '../config'

import { terrainTypes } from '../consts'

// Terrain objects
import Swamp from '../sprites/Swamp'
import Ground from '../sprites/Ground'

// Surface objects
import Grass from '../sprites/Grass'
import Grave from '../sprites/Grave'

// Game state context reference
let ctx

// Game reference
let game

// Reference to a parent class for binding terrain group vars
let parent

// Bottom game layer which consists of grounds, swamps, waters and etc.
// This layer always have body and enabled physics 
let _floor

// On-floor surface which consists of grass, thombstones, thombs and etc.
// Objects of this layer don't always have a physical body
let _surface

// Terrain types roll which is using on updates and terrain changes
let _current = terrainTypes.plateau

// Last terrain length after changing
let _lastLength = 0

const getLastFloor = () => { return _floor.getAt(_floor.children.length - 1) }

const getLastRight = () => {
  const floor = getLastFloor()

  if (floor === -1) return 0

  return floor.right
}

const getLastHeight = () => { return getLastFloor().height / config.tileSize || 1 }

// Add ending terrain tile
const _finish = (terrain) => {
  if (terrain === terrainTypes.plateau) {
    addFloor(new Ground({
      game,
      type: 'middle',
      x: getLastRight(),
      height: getLastFloor().height / config.tileSize
    }))
  }
}

// Add starting terrain tile
const _start = (terrain) => {
  if (terrain === terrainTypes.plateau) {
    addFloor(new Ground({
      game,
      type: 'middle',
      x: getLastRight(),
      height: getLastFloor().height / config.tileSize
    }))
  }
}

const _addSurface = (e) => {
  if (!(e instanceof Ground)) { return }

  _surface.add(new Grass({ game, x: getLastFloor().left, y: getLastFloor().top - config.tileSize }))

  if (10 * Math.random() << 0 > 8 && _floor.getAt(_floor.children.length - 2) instanceof Ground) {
    _surface.add(new Grave({ game, x: getLastFloor().left - config.tileSize, y: getLastFloor().top - config.tileSize }))
  }
}

const addFloor = e => {
  _floor.add(e)
  _addSurface(e)
}

export default class {
  constructor (context, _parent) {
    ctx = context
    parent = _parent

    this.game = ctx.game
    game = ctx.game

    // init terrain objects
    _floor = this.game.add.group()
    _surface = this.game.add.group()

    // bind terrain objects to parent
    parent.floor = _floor
    parent.surface = _surface
  }

  get current () {
    return _current
  }

  init () {
    do {
      this.plateau()
    } while (getLastFloor().right <= game.world.width)
  }

  update () {
    const firstFloor = _floor.getAt(0)
    if (!firstFloor.inCamera) _floor.remove(firstFloor)

    if (getLastRight() - (this.game.camera.view.x + this.game.camera.view.width) < -3) {
      this[terrainTypes[_current]]()

      _lastLength++
    }

    const firstSurface = _surface.getAt(0)
    if (!firstSurface.inCamera) _surface.remove(firstSurface)

    return _lastLength
  }

  change (next) {
    if (terrainTypes[next] === undefined) {
      throw new Error('undefined terrain type')
    }

    _finish(_current)
    _start(next)

    _current = next
    _lastLength = 0
  }

  // Terrain generators
  plateau (height = getLastHeight(), type = 'middle') {
    addFloor(new Ground({ game, type, x: getLastRight(), height }))
  }

  habitual () {
    const swampsCount = _floor.children.reduce((sum, f) => {
      return sum + (f instanceof Swamp ? 1 : 0)
    }, 0)

    if (swampsCount < 2) {
      addFloor(new Ground({ game, type: 'right', x: getLastRight(), height: 1 }))
      addFloor(new Swamp({ game, type: 'middle', x: getLastRight() }))
      addFloor(new Swamp({ game, type: 'middle', x: getLastRight() }))
      addFloor(new Ground({ game, type: 'left', x: getLastRight(), height: 1 }))
    } else {
      addFloor(new Ground({ game, type: 'middle', x: getLastRight(), height: 1 }))
    }
  }

  swampy () {
    addFloor(new Ground({ game, type: 'right', x: getLastRight(), height: 1 }))
    addFloor(new Swamp({ game, type: 'middle', x: getLastRight() }))
    addFloor(new Ground({ game, type: 'left', x: getLastRight(), height: 1 }))
  }
}
