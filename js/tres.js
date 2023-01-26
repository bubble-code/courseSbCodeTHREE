import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { makePerspectiveCamera, render } from './helpers.js'

function main() {
    const myCanvas = document.getElementById('c5');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10)
    camera.position.x = 4;
    camera.position.y = 4;
    camera.position.z = 4;

    const renderer6 = new THREE.WebGLRenderer({ canvas: myCanvas });
    renderer6.setSize(180, 220)
    const controls = new OrbitControls(camera, renderer6.domElement)
    // controls.target.set(8, 0, 0)

    const light = new THREE.PointLight();
    light.position.set(10, 10, 10);
    scene.add(light)

    const object1 = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshPhongMaterial({ color: 0x0ff0000 }))
    object1.position.set(0, 0, 0);
    scene.add(object1)
    object1.add(new THREE.AxesHelper(5))

    const object2 = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshPhongMaterial({ color: 0xff00000 }))
    object2.position.set(1, 1, 3);
    object1.add(object2)
    object2.add(new THREE.AxesHelper(5))

    // const resize = onWindowResize(scene, camera, renderer)
    window.addEventListener('resize', () => onWindowResize, false);

    render(scene, camera, renderer6);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render(scene, camera, renderer6);
        console.log('resized scene')
    }

    const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        render(scene, camera, renderer6);
    }
}



main();