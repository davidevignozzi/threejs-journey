import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models 
 */
const dracoLoader = new DRACOLoader();

// Worker for optimization
dracoLoader.setDecoderPath('/draco/'); // Pasted in static folder the draco folder => node_modules/three/examples/js/libs/draco

let mixer = null // Scope

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
    /* 
        '/models/Duck/glTF-Draco/Duck.gltf',

        '/models/Duck/glTF/Duck.gltf',

        // OR
        '/models/Duck/glTF-Binary/Duck.glb', // glTF-Binary
        // OR
        '/models/Duck/glTF-Embedded/Duck.gltf', // glTF-Embedded
    */
    (gltf) => {
        console.log(gltf, 'success');
        
        /* 
            scene.add(gltf.scene.children[0]);

            The problem is that when we add a child from one scene to the other, 
            it gets automatically removed from the first scene.
            That means that the first scene now has fewer children in it.
            
            for(const child of gltf.scene.children){
                scene.add(child);
            }

            Could be a solution:

            while(gltf.scene.children.length > 0){
                scene.add(gltf.scene.children[0]);
            }

            Another solution:
        
            const children = [...gltf.scene.children];
            for(const child of gltf.scene.children){
                scene.add(child);
            }
        */

        mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[1]);

        action.play();

        gltf.scene.scale.set(0.025, 0.025, 0.025);
        scene.add(gltf.scene);
       
    },
    /* 
    (progress) => {
        console.log('progress');
        console.log(progress);
    },
    (error) => {
        console.log('error');
        console.log(error);
    }
    */
)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update mixer
    if(mixer !== null){
        mixer.update(deltaTime);
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()