import './style.css';
import * as THREE from 'three';

console.log(THREE);
// variable for a canva
const canvas = document.querySelector('.webgl');

/**
 * ? Scene 
*/
const scene = new THREE.Scene();


/**
 * ? Objects
*/
// const geometry = new THREE.BoxGeometry(1, 1, 1); // (1, 1, 1) sizes
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
const group = new THREE.Group();
group.position.y = 1;
group.rotation.y = 1
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = - 2;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
group.add(cube3);

//? positionate the mesh
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
// can also positionate mesh in this way:
// mesh.position.set(x, y, z);
// mesh.position.set(0.7, - 0.6, 1);

/**
 * ? Scale 
*/
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.5);

/**
 * ? Rotation
*/
// mesh.rotation.reorder('YXZ');
// mesh.rotation.y = 0.5 
// or
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.x = Math.PI * 0.25;
// Half rotation will be Math.PI 3.14159

//? Add mesh to the scene
// scene.add(mesh);

/**
 * ? Axes Helper
*/
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * ? Sizes
*/
const sizes = {
    width: 800,
    height: 600
}

/**
 * ? Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

//? Move the camera backword
// before the render ! important
camera.position.z = 3;
// camera.position.y = 1;
// camera.position.x = 1;

// Look At This
// camera.lookAt(new THREE.Vector3(3, 0, 0));
// camera.lookAt(mesh.position);

scene.add(camera);

/**
 * ? Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas // for now it will be trasparent
});

/**
 * ? Vector3
*/
// console.log(mesh.position.length());
// console.log(mesh.position.distanceTo(camera.position));
// mesh.position.normalize();

//? update the size of renderer
renderer.setSize(sizes.width, sizes.height);

/**
 * ? First Render
*/
renderer.render(scene, camera);