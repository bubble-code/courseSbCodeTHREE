import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer, controls;

function init() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(8))
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 3;
    renderer.domElement.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(128,128,255,1) 100%)';
    document.body.appendChild(renderer.domElement);

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const sphereGeometry = new THREE.SphereGeometry()
    const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0)
    const planeGeometry = new THREE.PlaneGeometry()
    const torusKnotGeometry = new THREE.TorusKnotGeometry()

    const material = new THREE.MeshBasicMaterial({ wireframe: false })
    const texture = new THREE.TextureLoader().load('img/grid.png')
    material.map = texture
    const envTexture = new THREE.CubeTextureLoader().load([
        'img/px.png',
        'img/nx.png',
        'img/py.png',
        'img/ny.png',
        'img/pz.png',
        'img/nz.png',
    ])
    envTexture.mapping = THREE.CubeRefractionMapping
    material.envMap = envTexture

    const cube = new THREE.Mesh(boxGeometry, material)
    const sphere = new THREE.Mesh(sphereGeometry, material)
    const icosahedron = new THREE.Mesh(icosahedronGeometry, material)
    const plane = new THREE.Mesh(planeGeometry, material)
    const torusKnot = new THREE.Mesh(torusKnotGeometry, material)

    cube.position.x = 0
    sphere.position.x = 3
    icosahedron.position.x = 7
    plane.position.x = -2
    torusKnot.position.x = -5


    scene.add(cube, sphere, icosahedron, plane, torusKnot)

    controls = new OrbitControls(camera, renderer.domElement)

    scene.add(new THREE.AmbientLight())
    // scene.add(cube)
    // scene.add(sphere)

    window.addEventListener('resize', onWindowResize, false);


    render()
    animate()
}



const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    render()
}

const render = () => {
    renderer.render(scene, camera)
}
function animate() {
    requestAnimationFrame(animate)
    // controls.update()
    render()
}
init()