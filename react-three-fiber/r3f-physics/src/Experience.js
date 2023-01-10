import { useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider, BallCollider, Debug } from '@react-three/rapier';
import { Perf } from 'r3f-perf';

export default function Experience() {
    const [hitSound] = useState(() => new Audio('./hit.mp3'));

    const cube = useRef();
    const twister = useRef();

    const cubeJump = () => {
        // console.log(cube.current);

        const mass = cube.current.mass();
        // console.log('🚀 ~ cubeJump ~ mass', mass);

        cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        });
    };

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // console.log('🚀 ~ useFrame ~ getElapsedTime', time);

        // Unfortunately, there is a small issue. setNextKinematicRotation is expecting a Quaternion and not a Euler. Quaternions are harder to express and we can’t just write one directly.

        //To solve this, we are going to create a Three.js Euler, then create a Three.js Quaternion out of this Euler and since most mathematics objects are inter-compatible between Three.js and Rapier, we are going to send that Quaternion to setNextKinematicRotation.

        // create Euler
        const eulerRotation = new THREE.Euler(0, time, 0);

        // convert Euler in Quaternion for R3F
        const quaternionRotation = new THREE.Quaternion();
        quaternionRotation.setFromEuler(eulerRotation);

        // apply rotation
        twister.current.setNextKinematicRotation(quaternionRotation);

        const angle = time * 0.5;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;
        twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
    });

    const collisionEnter = () => {
        // console.log('collide');
        hitSound.currentTime = 0;
        hitSound.volume = Math.random();
        hitSound.play();
    };

    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <Physics gravity={[0, -9.08, 0]}>
                <Debug />

                {/* Sphere */}
                <RigidBody colliders="ball">
                    <mesh castShadow position={[-1.5, 2, 0]}>
                        <sphereGeometry />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                </RigidBody>

                {/* Donut */}
                {/* 
                    <RigidBody colliders={false} position={[0, 1, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
                        <BallCollider args={[1.5]} />
                        <mesh castShadow>
                            <torusGeometry args={[1, 0.5, 16, 42]} />
                            <meshStandardMaterial color="midiumpurple" />
                        </mesh>
                    </RigidBody>
                */}

                {/* Cube */}
                <RigidBody
                    ref={cube}
                    position={[1.5, 2, 0]}
                    gravityScale={1}
                    restitution={0}
                    friction={0.7}
                    colliders={false}
                    onCollisionEnter={collisionEnter}
                >
                    <mesh castShadow onClick={cubeJump}>
                        <boxGeometry />
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
                    <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
                </RigidBody>

                {/* Floor */}
                <RigidBody
                    type="fixed"
                    // restitution={1}
                    // friction={0}
                >
                    <mesh receiveShadow position-y={-1.25}>
                        <boxGeometry args={[10, 0.5, 10]} />
                        <meshStandardMaterial color="greenyellow" />
                    </mesh>
                </RigidBody>

                {/* Long Box */}
                <RigidBody
                    ref={twister}
                    position={[0, -0.8, 0]}
                    friction={0}
                    type="kinematicPosition"
                >
                    <mesh castShadow scale={[0.4, 0.4, 3]}>
                        <boxGeometry />
                        <meshStandardMaterial color="red" />
                    </mesh>
                </RigidBody>
            </Physics>
        </>
    );
}
