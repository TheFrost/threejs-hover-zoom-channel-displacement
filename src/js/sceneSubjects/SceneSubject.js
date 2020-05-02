import * as THREE from 'three'
import Guify from 'guify'
import TweenMax from 'gsap'
import { textureLoader } from '../utils/tools'

// shaders
import vertexShader from '../../shaders/vertexShader.glsl'
import fragmentShader from '../../shaders/fragmentShader.glsl'

export default class SceneSubject {
  raycaster = new THREE.Raycaster()
  scene = null

  constructor (scene) {
    this.scene = scene

    const uniformsValues = {
      hover: 0.0,
      zoomLevel: 0.2
    }

    const geometry = new THREE.PlaneBufferGeometry(5, 7)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        hover: {
          type: 'f',
          value: uniformsValues.hover
        },
        zoomLevel: {
          type: 'f',
          value: uniformsValues.zoomLevel
        },
        texture: {
          type: 't',
          value: textureLoader.load('https://images.unsplash.com/photo-1517462964-21fdcec3f25b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
        }
      }
    })
    material.transparent = true

    this.mesh = new THREE.Mesh(geometry, material)

    this.scene.add(this.mesh)

    /* gui controls */
    this.buildGuiControls(uniformsValues)
  }

  update (delta, time) { }

  mouseHandler (mouse, camera) {
    const { scene, mesh, raycaster } = this

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children)

    TweenMax.to(mesh.material.uniforms.hover, 2, {
      value: intersects.length
    })

    // TweenMax.to(mesh.scale, 0.5, {
    //   x: 1 - mouse.y * 0.1,
    //   y: 1 - mouse.y * 0.1
    // })

    // TweenMax.to(mesh.position, 0.5, {
    //   x: mouse.x
    // })

    // TweenMax.to(mesh.rotation, 0.5, {
    //   x: -mouse.y * (Math.PI / 3) * 0.3,
    //   y: mouse.x * (Math.PI / 3) * 0.3
    // })
  }

  buildGuiControls (uniformsValues) {
    const gui = new Guify({
      root: document.body,
      align: 'right',
      open: true
    })

    gui.Register({
      type: 'range',
      label: 'Hover',
      min: 0,
      max: 1,
      object: uniformsValues,
      property: 'hover',
      onChange: () => {
        this.mesh.material.uniforms.hover.value = uniformsValues.hover
      }
    })
  }
}
