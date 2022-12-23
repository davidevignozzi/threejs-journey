import { useFrame } from '@react-three/fiber';
import {
    Environment,
    Sky,
    ContactShadows,
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
import { useControls } from 'leva';

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

    // Debug UI
    const { color, opacity, blur } = useControls('contact shadow', {
        color: '#1d8f75',
        opacity: { value: 0.4, min: 0, max: 1 },
        blur: { value: 2.8, min: 0, max: 10 }
    });

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [1, 2, 3] }
    });

    const { envMapIntensity } = useControls('environment map', {
        envMapIntensity: { value: 3.5, min: 0, max: 12 }
    });

    return (
        <>
            <Environment
                background
                // preset="sunset"
                // files={
                //     './environmentMaps/the_sky_is_on_fire_2k.hdr'
                //     // [
                //     //     './environmentMaps/2/px.jpg',
                //     //     './environmentMaps/2/nx.jpg',
                //     //     './environmentMaps/2/py.jpg',
                //     //     './environmentMaps/2/ny.jpg',
                //     //     './environmentMaps/2/pz.jpg',
                //     //     './environmentMaps/2/nz.jpg'
                //     // ]
                // }
            >
                <color args={['#000000']} attach="background" />
                <mesh position-z={-5} scale={10}>
                    <planeGeometry />
                    <meshBasicMaterial color={[10, 0, 0]} />
                </mesh>
            </Environment>

            {/* Bake Shadows */}
            {/* <BakeShadows /> */}

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

            <ContactShadows
                position={[0, -0.99, 0]}
                scale={10}
                resolution={512}
                far={5}
                color={color}
                opacity={opacity}
                blur={blur}
                frames={1} // if the scene is static bake
            />

            {/* <directionalLight
                ref={directionalLightRef}
                castShadow
                shadow-mapSize={[1024, 1024]} // directionalLight.shadow.mapSize.set(1024, 1024)
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={5}
                shadow-camera-right={5}
                shadow-camera-bottom={-5}
                shadow-camera-left={-5}
                position={sunPosition}
                intensity={1.5}
            /> */}
            {/* <ambientLight intensity={0.5} /> */}

            {/* <Sky sunPosition={sunPosition} /> */}

            <mesh castShadow position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
            </mesh>

            <mesh ref={cube} castShadow position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
            </mesh>

            <mesh
                // receiveShadow removed for AccumulativeShadows
                position-y={-1}
                rotation-x={-Math.PI * 0.5}
                scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
            </mesh>
        </>
    );
}
