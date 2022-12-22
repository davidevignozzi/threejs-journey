import React, { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, useThree, useFrame } from '@react-three/fiber';
import CustomObject from './CustomObject';

// Don't have to create a Scene
// Don't have to create a WebGLRenderer
// The scene is being rendered on each frame
// Don't have to place a PerspectiveCamera
// Resize automaticly
// Don't have to provide specific value for <torusKnotGeometry />
// Don't have to provide mesh

// extend() => will try to automatically convert a Three.js class
// into a declarative version and make it available in JSX.
extend({
    // OrbitControls: OrbitControls
    OrbitControls
});

const Experience = () => {
    // three contains everything we need like:
    // three.camera: the PerspectiveCamera
    // three.gl: the WebGLRenderer that contains a domElement, in other words, the <canvas>
    // three.clock: An instance of the Clock
    // Etc.
    // const three = useThree();
    const { camera, gl } = useThree();

    // Refs
    const cubeRef = useRef();
    const groupRef = useRef();

    // On each frame
    useFrame((state, delta) => {
        /**
         * Animate
         */
        // Update camera
        // console.log(state.camera);
        // console.log(state.clock);
        // console.log(state.clock.getElapsedTime);
        // const angle = state.clock.elapsedTime * 0.5;
        // state.camera.position.x = Math.sin(angle) * 8;
        // state.camera.position.z = Math.cos(angle) * 8;
        // state.camera.lookAt(0, 0, 0);

        // Update cube;
        // cubeRef.current.rotation.y -= 0.01; => Different Fps? problem
        cubeRef.current.rotation.y -= delta;

        // Update group
        // groupRef.current.rotation.y += delta;
    });

    return (
        <>
            {/* Orbit Controls
                // We need to provide camera
            */}

            <orbitControls args={[camera, gl.domElement]} />

            {/* Lights */}
            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <group ref={groupRef}>
                {/* Sphere */}
                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange"></meshStandardMaterial>
                </mesh>

                {/* Cube */}
                <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
                    <boxGeometry scale={1.5} />
                    <meshStandardMaterial color="mediumpurple"></meshStandardMaterial>
                </mesh>
            </group>

            {/* Plane / Floor */}
            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow"></meshStandardMaterial>
            </mesh>

            <CustomObject />
        </>
    );
};

const oldStff = () => {
    return (
        <>
            <mesh
                // scale={[3, 2, 1]}> => [x,y,z]
                scale={1.5}
                // position={[x,y,z]}
                position-x={2}
                // rotation={[x,y,z]}
                rotation-y={Math.PI * 0.25}>
                {/* <torusKnotGeometry />
                <meshNormalMaterial /> */}
                <sphereGeometry
                    args={[
                        // radious
                        1.5,
                        // widthSegments
                        32,
                        // heigthSegments
                        32
                    ]}
                />

                {/* <meshBasicMaterial args={[{ color: 'red', wireframe: true }]} /> */}

                <meshBasicMaterial color={'red'} wireframe />
            </mesh>
        </>
    );
};

export default Experience;
