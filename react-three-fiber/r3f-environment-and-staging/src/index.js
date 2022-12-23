import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.js';
import * as THREE from 'three';

const root = ReactDOM.createRoot(document.querySelector('#root'));

const created = ({ scene }) => {
    // It’s a way of filling the <canvas> with a color
    // before rendering the various objects in the scene.
    // gl.setClearColor('#ff0000', 1);

    //Instead of doing it on the renderer
    // on the scene
    scene.background = new THREE.Color('#ff0000');
};

root.render(
    <Canvas
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6]
        }}
        onCreated={created}>
        <Experience />
    </Canvas>
);
