import SceneManager from './SceneManager'

const canvas = document.getElementById('canvas')
const sceneManager = new SceneManager(canvas, true)

const resizeCanvas = () => {
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  sceneManager.resizeHandler()
}

const mouseHandler = e => {
  sceneManager.mouseHandler({
    x: (e.clientX / window.innerWidth) * 2 - 1,
    y: -(e.clientY / window.innerHeight) * 2 + 1
  })
}

const bindEvents = () => {
  window.onresize = resizeCanvas
  resizeCanvas()
}

const render = () => {
  window.requestAnimationFrame(render)
  sceneManager.update()

  window.onmousemove = mouseHandler
}

bindEvents()
render()
