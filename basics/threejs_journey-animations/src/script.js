import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
// renderer.render (scene, camera);

/***
    // Time
    let time = Date.now();

    // Animations
    const tick = () => {

        // Time
        const currentTime = Date.now();
        const deltaTime = currentTime - time;

        // for the next tick
        time = currentTime;

        // Update Objects
        mesh.rotation.y += 0.001 * deltaTime

        // Render
        renderer.render (scene, camera);

        window.requestAnimationFrame(tick);

    }
    tick();
*/

// Clock
// let clock = new THREE.Clock();

// // Animations
// const tick = () => {

//     // Clock
//     const elapsedTime = clock.getElapsedTime();

//     // Update Objects
//     // mesh.rotation.y = Math.sin(elapsedTime);
//     mesh.rotation.y = elapsedTime;
//     mesh.position.y = Math.sin(elapsedTime);
//     mesh.position.x = Math.cos(elapsedTime);

//     // Render
//     renderer.render (scene, camera);

//     window.requestAnimationFrame(tick);

// }
// tick();


gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

// Animations
const tick = () => {
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}
tick();