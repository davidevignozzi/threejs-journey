import { useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
    Physics,
    RigidBody,
    CuboidCollider,
    BallCollider,
    Debug,
    CylinderCollider,
    InstancedRigidBodies
} from '@react-three/rapier';
import { Perf } from 'r3f-perf';

export default function Experience() {
    const [hitSound] = useState(() => new Audio('./hit.mp3'));

    const cube = useRef();
    const twister = useRef();

    const hamburger = useGLTF('./hamburger.glb');

    const cubesCount = 250;
    const cubes = useRef();

    const cubeTransforms = useMemo(() => {
        const positions = [];
        const rotations = [];
        const scales = [];

        for (let i = 0; i < cubesCount; i++) {
            positions.push([(Math.random() - 0.5) * 8, 6 + i * 0.2, (Math.random() - 0.5) * 8]);

            rotations.push([Math.random(), Math.random(), Math.random()]);

            const scale = 0.2 + Math.random() * 0.8;
            scales.push([scale, scale, scale]);
        }

        return { positions, rotations, scales };
    }, []);
    // console.log('🚀 ~ cubeTransforms ~ cubeTransforms', cubeTransforms);

    // Doesn't work with <InstancedRigidBodies>
    // useEffect(() => {
    //     for (let i = 0; i < cubesCount; i++) {
    //         const matrix = new THREE.Matrix4();
    //         matrix.compose(
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1, 1, 1)
    //         );
    //         cubes.current.setMatrixAt(i, matrix);
    //     }
    // }, []);

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
                {/* <Debug /> */}

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
                    // onCollisionExit={() => console.log('exit')}
                    // onSleep={() => console.log('sleep')}
                    // onWake={() => console.log('wake')}
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

                <RigidBody colliders={false} position={(0, 4, 0)}>
                    <primitive object={hamburger.scene} scale={0.25} />
                    <CylinderCollider args={[0.5, 1.25]} />
                </RigidBody>

                <RigidBody type="fixed">
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
                </RigidBody>

                <InstancedRigidBodies
                    positions={cubeTransforms.positions}
                    rotations={cubeTransforms.rotations}
                    scales={cubeTransforms.scales}
                >
                    <instancedMesh ref={cubes} castShadow args={[null, null, cubesCount]}>
                        <boxGeometry />
                        <meshStandardMaterial color="tomato" />
                    </instancedMesh>
                </InstancedRigidBodies>
            </Physics>
        </>
    );
}
