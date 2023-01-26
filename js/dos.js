import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


let camera, scene, renderer, cube;
const perspectiveDistance = 2.5;
const canvas1 = document.getElementById('c1')
const canvas2 = document.getElementById('c2')
const canvas3 = document.getElementById('c3')
const canvas4 = document.getElementById('c4')

function init() {
    scene = new THREE.Scene();
    const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 10)
    const camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    const camera3 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    const camera4 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 })
    renderer1.setSize(243, 243)
    const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 })
    renderer2.setSize(243, 243)
    const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3 })
    renderer3.setSize(243, 243)
    const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4 })
    renderer4.setSize(243, 243)
    //document.body.appendChild(renderer.domElement)
    const controls = new OrbitControls(camera1, renderer1.domElement)
    const controls2 = new OrbitControls(camera2, renderer2.domElement)
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    camera1.position.z = 2
    camera2.position.y = 1
    camera2.lookAt(new THREE.Vector3(0, 0, 0))
    camera3.position.z = 1
    camera4.position.x = 1
    camera4.lookAt(new THREE.Vector3(0, 0, 0))
    const animate = function () {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        controls.update()
        renderer1.render(scene, camera1)
        renderer2.render(scene, camera2)
        renderer3.render(scene, camera3)
        renderer4.render(scene, camera4)
    }
    animate()
}


// --------------------------------------------------------------
function render() {
    renderer.render(scene, camera);
}
function makePerspectiveCamera(fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 10) {
    // const fov = 75;
    // const aspect = window.innerWidth / window.innerHeight;
    // const near = 0.1;
    // const far = 10;
    return new THREE.PerspectiveCamera(fov, aspect, near, far);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}


init();
