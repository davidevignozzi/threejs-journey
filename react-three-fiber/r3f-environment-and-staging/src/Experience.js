import { useFrame } from '@react-three/fiber';
import { useHelper, OrbitControls } from '@react-three/drei';
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
            {/* Background with R3F */}
            <color args={['ivory']} attach="background" />

            <Perf position="top-left" />

            <OrbitControls makeDefault />

            {/* 
                Lights
            */}
            <directionalLight ref={directionalLightRef} position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <mesh position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh ref={cube} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    );
}
