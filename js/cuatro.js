import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';


const init = () => {
    const scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5))

    // const light = new THREE.PointLight(0xffffff, 5)
    // light.position.set(10, 10, 10)
    // scene.add(light)

    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
    // camera.aspect(window.innerWidth / window.innerHeight)
    camera.position.z = 3
    camera.position.y = 1
    const renderer = new THREE.WebGL1Renderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(128,128,255,1) 100%)';
    document.body.appendChild(renderer.domElement)

    const button = document.querySelector("#start")
    const panel = document.querySelector("#container")


    // new OrbitControls(camera, renderer.domElement)
    const controls = new PointerLockControls(camera, renderer.domElement)
    controls.addEventListener("lock", () => (panel.style.display = 'none'))
    controls.addEventListener('unlock', () => (panel.style.display = 'block'))


    button.addEventListener("click", () => {
        controls.lock()
    }, false)

    const onKeyDown = (event) => {
        switch (event.code) {
            case 'KeyW':
                controls.moveForward(0.25)
                break
            case 'KeyA':
                controls.moveRight(-0.25)
                break
            case 'KeyS':
                controls.moveForward(-0.25)
                break
            case 'KeyD':
                controls.moveRight(0.25)
                break
        }
    }
    document.body.addEventListener('keydown', onKeyDown, false)

    // ----------------------------------------------------------
    const material = new THREE.MeshPhysicalMaterial();
    material.reflectivity = 0
    material.transmission = 1.0
    material.roughness = 0.2
    material.metalness = 0
    material.clearcoat = 0.3
    material.clearcoatRoughness = 0.25
    material.color = new THREE.Color(0xffffff)
    material.ior = 1.2
    material.thickness = 10.0


    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const envTexture = new THREE.CubeTextureLoader().load([
        'img/px.png',
        'img/nx.png',
        'img/py.png',
        'img/ny.png',
        'img/pz.png',
        'img/nz.png',
    ], () => {
        material.envMap = pmremGenerator.fromCubemap(envTexture).texture
        pmremGenerator.dispose()
        scene.background = material.envMap
    })

    const animate = () => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }
    animate()

    renderer.render(scene, camera)

};

init()