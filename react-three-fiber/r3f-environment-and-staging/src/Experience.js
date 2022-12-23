import { useFrame } from '@react-three/fiber';
import {
    RandomizedLight,
    AccumulativeShadows,
    softShadows,
    BakeShadows,
    useHelper,
    OrbitControls
} from '@react-three/drei';
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';

/**
 * Soft Shadows
 */
// The default shadows are too sharp. There are multiple ways of softening them and we are going to discover one technique called Percent Closer Soft Shadows (PCSS).

// The idea is to make the shadow look blurry by picking the shadow map texture at an offset position according to the distance between the surface casting the shadow and the surface receiving the shadow, which is kind of how it happens in real life.

// softShadows({ frustum: 3.75, size: 0.005, near: 9.5, samples: 17, rings: 11 }); // removed for AccumulativeShadows

export default function Experience() {
    const cube = useRef();
    const directionalLightRef = useRef();

    /**
     * Lights Helpers
     */
    // 1th parameter is the ref
    // 2nd parameter is the helper class from THREE
    // 3rd parameter is the size of the helper
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1); // removed because is drwan by AccumulativeShadow

    useFrame((state, delta) => {
        // const time = state.clock.elapsedTime;
        // cube.current.position.x = 2 * Math.sin(time);
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
            {/* // frames.value = number of renders on first frame => bad for performances */}
            {/* <AccumulativeShadows
                position={[0, -0.99, 0]}
                scale={10}
                color="#316d39"
                opacity={0.8}
                frames={Infinity}
                temporal
                blend={100}>
                <RandomizedLight
                    amount={8}
                    radius={1}
                    ambient={0.5}
                    intensity={1}
                    position={[1, 2, 3]}
                    bias={0.001}
                />
                /* 
                    // castShadow
                    // mapSize={}
                    // size={}
                    // near={}
                    // far={}
                
            </AccumulativeShadows> */}

            {/* 
                🎗{
                    Each light casting shadows will render
                    the scene in a specific way and output that
                    we call “shadow map”.
                }
            */}

            <directionalLight
                ref={directionalLightRef}
                castShadow
                shadow-mapSize={[1024, 1024]} // directionalLight.shadow.mapSize.set(1024, 1024)
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={5}
                shadow-camera-right={5}
                shadow-camera-bottom={-5}
                shadow-camera-left={-5}
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

            <mesh
                // receiveShadow removed for AccumulativeShadows
                position-y={-1}
                rotation-x={-Math.PI * 0.5}
                scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    );
}
