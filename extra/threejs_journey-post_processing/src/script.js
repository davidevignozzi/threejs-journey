import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import * as dat from 'lil-gui';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMapIntensity = 2.5;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
]);
environmentMap.encoding = THREE.sRGBEncoding;

scene.background = environmentMap;
scene.environment = environmentMap;

/**
 * Models
 */
gltfLoader.load(
  '/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
  (gltf) => {
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.rotation.y = Math.PI * 0.5;
    scene.add(gltf.scene);

    updateAllMaterials();
  }
);

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 3, -2.25);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Update effect composer
  effectComposer.setSize(sizes.width, sizes.height);
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4, 1, -4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Post Processing
 */
// Render Target
const renderTarget = new THREE.WebGLRenderTarget(800, 600, {
  // most samples, better antialias
  // Every increase on this value will lower the performances
  //   samples: 2,
  samples: renderer.getPixelRatio() === 1 ? 2 : 0,
});

const effectComposer = new EffectComposer(renderer, renderTarget);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
effectComposer.setSize(sizes.width, sizes.height);

const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

// Dot Screen Pass
const dotScreenPass = new DotScreenPass();
dotScreenPass.enabled = false;
effectComposer.addPass(dotScreenPass);

// Glitch Pass
const glitchPass = new GlitchPass();
// glitchPass.goWild = true;
glitchPass.enabled = false;
effectComposer.addPass(glitchPass);

// RGB Shift Pass
const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.enabled = false;
effectComposer.addPass(rgbShiftPass);

const unrealBloomPass = new UnrealBloomPass();
unrealBloomPass.strength = 0.3;
unrealBloomPass.radius = 1;
unrealBloomPass.threshold = 0.6;
effectComposer.addPass(unrealBloomPass);

// Unreal Bloom Pass
gui.add(unrealBloomPass, 'enabled');
gui.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001);

// Gamma Corraction => has to be the last of classic pass
const gammaCorrectionShader = new ShaderPass(GammaCorrectionShader);
effectComposer.addPass(gammaCorrectionShader);

// Tint pass
const TintShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTint: { value: null },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

      vUv = uv;
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec3 uTint;

    varying vec2 vUv;

    void main() {
        vec4 color = texture2D(tDiffuse, vUv);
        color.rgb += uTint;
        // color.r += 0.1;
        // color.b += 0.1;
        gl_FragColor = color;
    }`,
};

const tintPass = new ShaderPass(TintShader);
tintPass.material.uniforms.uTint.value = new THREE.Vector3();
effectComposer.addPass(tintPass);

gui
  .add(tintPass.material.uniforms.uTint.value, 'x')
  .min(-1)
  .max(1)
  .step(0.001)
  .name('red');

gui
  .add(tintPass.material.uniforms.uTint.value, 'y')
  .min(-1)
  .max(1)
  .step(0.001)
  .name('green');

gui
  .add(tintPass.material.uniforms.uTint.value, 'z')
  .min(-1)
  .max(1)
  .step(0.001)
  .name('blue');

// Displacement Pass
const DisplacementShader = {
  uniforms: {
    tDiffuse: { value: null },
    // uTime: { value: null },
    uNormalMap: { value: null },
  },
  vertexShader: `
        varying vec2 vUv;

        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
  fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform sampler2D uNormalMap;
        // uniform float uTime;

        varying vec2 vUv;

        void main(){
            // vec2 newUv = vec2(
            //     vUv.x,
            //     vUv.y + sin(vUv.x * 10.0 + uTime) * 0.1
            // );

            vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
            vec2 newUv = vUv + normalColor.xy * 0.1;
            vec4 color = texture2D(tDiffuse, newUv);

            vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
            float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
            color.rgb += lightness * 2.0;

            gl_FragColor = color;
            
        }
    `,
};

const displacementPass = new ShaderPass(DisplacementShader);
// displacementPass.material.uniforms.uTime.value = 0;
displacementPass.material.uniforms.uNormalMap.value =
  textureLoader.load('/textures/interfaceNormalMap.png');
effectComposer.addPass(displacementPass);

// SMAA Pass
if (
  renderer.getPixelRatio() === 1 &&
  !renderer.capabilities.isWebGL2
) {
  const smaaPass = new SMAAPass();
  effectComposer.addPass(smaaPass);

  console.log('Using SMAA Pass');
}

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update passes
  //   displacementPass.material.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  //   renderer.render(scene, camera);
  effectComposer.render();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
