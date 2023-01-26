import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


let camera, scene, renderer, cube, controls;
const perspectiveDistance = 2.5;

function init() {
    scene = new THREE.Scene();
    camera = makePerspectiveCamera();
    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.position.set(0, 0, perspectiveDistance);
    // camera.position.z = 2;
    // const scene = new THREE.Scene()
    //document.body.appendChild(renderer.domElement)

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 3;
    renderer.domElement.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(128,128,255,1) 100%)';

    document.body.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);

    // const controls = new OrbitControls(camera1, renderer1.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    scene.add(new THREE.AxesHelper(5))
    window.addEventListener('resize', onResize);
    // window.addEventListener('change', render);

    const gui = new GUI();
    const cubeFolder = gui.addFolder('Cube');
    cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
    cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
    cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
    cubeFolder.open();
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(camera.position, 'z', 0, 10);
    cameraFolder.open()
    const cubePositionFolder = cubeFolder.addFolder('Position')
    cubePositionFolder.add(cube.position, 'x', -10, 10, 2)
    cubePositionFolder.add(cube.position, 'y', -10, 10, 2)
    cubePositionFolder.add(cube.position, 'z', -10, 10, 2)
    cubeFolder.open()
    cubePositionFolder.open()
    const cubeScaleFolder = cubeFolder.addFolder('Scale')
    cubeScaleFolder.add(cube.scale, 'x', -5, 5)
    cubeScaleFolder.add(cube.scale, 'y', -5, 5)
    cubeScaleFolder.add(cube.scale, 'z', -5, 5)
    render();


}


// --------------------------------------------------------------

function stats() {
    const script = document.createElement('script');
    script.onload = function () {
        var stats = new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop)
        }
        );
    };
    script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
    document.head.appendChild(script);
}
stats()

function render() {
    renderer.render(scene, camera);
}
function makePerspectiveCamera(fov = 75, aspect = (window.innerWidth / window.innerHeight), near = 0.1, far = 10) {
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

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    render();
}

init();
animate()
