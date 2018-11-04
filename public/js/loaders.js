export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image()
    image.src = url
    image.addEventListener('load', () => {
      // setTimeout(resolve, 2000, image)
      resolve(image)
    })
  })
}

export function loadLevel(name) {
  return fetch(`/levels/${name}.json`)
    .then(r => r.json())
    // .then(json => new Promise(resolve => setTimeout(resolve, 3000, json)))
}