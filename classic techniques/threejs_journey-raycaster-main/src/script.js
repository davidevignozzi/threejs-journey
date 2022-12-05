import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

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
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();

/* const rayOrigin = new THREE.Vector3(-3, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);
rayDirection.normalize();
raycaster.set(rayOrigin, rayDirection);

const intersect = raycaster.intersectObject(object2);
console.log(intersect);

const intersects = raycaster.intersectObjects([object1, object2, object3]);
console.log(intersects); */

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
 * Mouse
 */
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (_event) =>{
    mouse.x = _event.clientX / sizes.width * 2 - 1;
    mouse.y = -(_event.clientY / sizes.height) * 2 + 1;
});

window.addEventListener('click', (_event) => {
    if(currentIntersect){
        switch (currentIntersect.object) {
            case object1:
                console.log('click on object 1');
                break;

            case object2:
                console.log('click on object 2');
                break

            case object3:
                console.log('click on object 3');
                break
        
        }
    }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Animate Objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

    // Cast a Ray

    //* Change color if object interdect raycaster
    /* const rayOrigin = new THREE.Vector3(-3, 0, 0);
    const rayDirection = new THREE.Vector3(1, 0, 0);
    rayDirection.normalize();

    raycaster.set(rayOrigin, rayDirection);
    
    const objectToTest = [object1, object2, object3];
    const intersects = raycaster.intersectObjects(objectToTest); 

    for(const object of objectToTest){
        object.material.color.set('#ff0000');
    }
    for(const intersect of intersects){
        intersect.object.material.color.set('#0000ff');
    }
    */

    //* Mouse Hover
    raycaster.setFromCamera(mouse, camera);
    const objectToTest = [object1, object2, object3];
    const intersects = raycaster.intersectObjects(objectToTest); 

    for(const object of objectToTest){
        object.material.color.set('#ff0000');
    }
    for(const intersect of intersects){
        intersect.object.material.color.set('#0000ff');
    }

    //* Mouse Enter / Mouse Leave
    if(intersects.length){
        if(!currentIntersect){
            console.log('mouse enter');
        } 
        currentIntersect = intersects[0];
    } 
    else {
        if(currentIntersect){
            console.log('mouse leave');
        } 
        currentIntersect = null;
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()