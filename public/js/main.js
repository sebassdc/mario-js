import { loadLevel } from './loaders.js'
import {
  loadMarioSprite,
  loadBackgroundSprites
} from './sprites.js'

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) {
      for (let y = y1; y < y2; ++y) {
        sprites.drawTile(background.tile , context, x, y)
      }
    }
  });
}

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

class Compositor {
  constructor() {
    this.layers = []
  }
  draw(context) {
    this.layers.forEach(layer => {
      layer(context)
    })
  }
}

function createBackgroundLayer(backgrounds, sprites) {
  const buffer = document.createElement('canvas')
  buffer.width = 256
  buffer.height = 240

  backgrounds.forEach(bg => {
    drawBackground(bg, buffer, sprites)
  })

  return function(context) {
    context.drawImage(buffer, 0, 0)
  }
}

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1')
]).then(([mario, sprites, level]) => {
  console.log('Level loaded', level)
  const backgroundBuffer = document.createElement('canvas')
  backgroundBuffer.width = 256
  backgroundBuffer.height = 240

  
  level.backgrounds.forEach(bg => {
    drawBackground(bg, backgroundBuffer.getContext('2d'), sprites)
  })

  const pos = {
    x: 64,
    y: 64
  }

  function update() {
    context.drawImage(backgroundBuffer, 0, 0)
    mario.draw('idle', context, pos.x, pos.y)
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }
  update()
})