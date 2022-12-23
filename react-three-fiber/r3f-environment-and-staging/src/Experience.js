import { useFrame } from '@react-three/fiber';
import { BakeShadows, useHelper, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';

export default function Experience() {
    const cube = useRef();
    const directionalLightRef = useRef();

    /**
     * Lights Helpers
     */
    // 1th parameter is the ref
    // 2nd parameter is the helper class from THREE
    // 3rd parameter is the size of the helper
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2;
    });

    return (
        <>
            {/* Bake Shadows */}
            <BakeShadows />

            {/* Background with R3F */}
            <color args={['ivory']} attach="background" />

            <Perf position="top-left" />

            <OrbitControls makeDefault />

            {/* 
                Lights
            */}
            <directionalLight
                ref={directionalLightRef}
                castShadow
                position={[1, 2, 3]}
                intensity={1.5}
            />
            <ambientLight intensity={0.5} />

            <mesh castShadow position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh ref={cube} castShadow position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    );
}
