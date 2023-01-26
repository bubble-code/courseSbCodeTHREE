import * as THREE from 'three';

function makePerspectiveCamera(fov = 75, aspect = (window.innerWidth / window.innerHeight), near = 0.1, far = 10) {
    return new THREE.PerspectiveCamera(fov, aspect, near, far);
}

function render(scene, camera, renderer) {
    renderer.render(scene, camera);
}

function onWindowResize(scene, camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render(scene, camera, renderer);

}




export { makePerspectiveCamera, render, onWindowResize };