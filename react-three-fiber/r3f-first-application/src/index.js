import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import * as THREE from 'three';
import { ToneMapping } from 'three';

const root = ReactDOM.createRoot(document.querySelector('#root'));

// const cameraSettings = {
//     fov: 45,
//     zoom: 100,
//     near: 0.1,
//     far: 200,
//     position: [3, 2, 6]
// };

root.render(
    <Canvas
        // orthographic
        // flat // To delete the default tonemapping
        gl={{
            // antialias: false
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping, // default tone mapping
            // toneMapping: THREE.CineonToneMapping
            outputEncoding: THREE.LinearEncoding
        }}
        camera={
            {
                fov: 45,
                // zoom: 100,
                near: 0.1,
                far: 200,
                position: [3, 2, 6]
            }
            // cameraSettings
        }>
        <Experience />
    </Canvas>
);
