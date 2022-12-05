console.log(THREE);
// variable for a canva
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1); // (1, 1, 1) sizes
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// Add mesh to the scene
scene.add(mesh);

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// Move the camera backword
// before the render ! important
camera.position.z = 3;

scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas // for now it will be trasparent
});

// update the size of renderer
renderer.setSize(sizes.width, sizes.height);

// First Render
renderer.render(scene, camera);
