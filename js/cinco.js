import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const init = () => {
    const scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5))
    const light1 = new THREE.PointLight()
    light1.position.set(2.5, 2.5, 2.5)
    light1.castShadow = true
    scene.add(light1)

    const light2 = new THREE.PointLight()
    light2.position.set(-2.5, -2.5, -2.5)
    light2.castShadow = true
    scene.add(light2)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.8, 1.4, 1);

    const renderer = new THREE.WebGLRenderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true
    orbitControls.target.set(0, 1, 0)

    const sceneMesh = []
    let boxHelper;

    const dragControls = new DragControls(sceneMesh, camera, renderer.domElement)

    dragControls.addEventListener('hoveron', (event) => {
        boxHelper.visible = true;
        orbitControls.enabled = false;
    })

    dragControls.addEventListener('hoveroff', (event) => {
        boxHelper.visible = false;
        orbitControls.enabled = false;
    })
    dragControls.addEventListener('drag', (event) => {
        event.object.position.y = 0
    })
    dragControls.addEventListener('dragstart', (event) => {
        boxHelper.visible = true;
        orbitControls.enabled = false;
    })
    dragControls.addEventListener('dragend', (event) => {
        boxHelper.visible = false;
        orbitControls.enabled = false;
    })

    const planeGeometry = new THREE.PlaneGeometry(5, 5)
    // const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffff })
    const texture = new THREE.TextureLoader().load(['img/grid.png'])
    const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ map: texture }))
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.receiveShadow = true
    // scene.add(plane)
    // plane.rotation.x = -0.5 * Math.PI
    plane.receiveShadow = true
    scene.add(plane)


    let modeReady = false;
    let modelGroup, mixer, modelDragBox
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('model/eve@punching.glb', (gltf) => {
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Group) {
                modelGroup = child
            }
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.frustumCulled = false
                child.geometry.computeVertexNormals()
            }
            mixer = new THREE.AnimationMixer(gltf.scene)
            mixer.clipAction(gltf.animations[0]).play()
            modelDragBox = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 1.3, 0.5),
                new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
            )
            modelDragBox.geometry.translate(0, 0.65, 0)
            scene.add(modelDragBox)
            sceneMeshes.push(modelDragBox)

            boxHelper = new THREE.BoxHelper(modelDragBox, 0xffff00)
            boxHelper.visible = false
            scene.add(boxHelper)

            scene.add(gltf.scene)

            modelReady = true
        },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }

        )
    })

    renderer.render(scene, camera);

    const RAF = () => {
        requestAnimationFrame(() => {
            renderer.render(scene, camera);
            RAF()
        });

    }
    RAF()

}

init();