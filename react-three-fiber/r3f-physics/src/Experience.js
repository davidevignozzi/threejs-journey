import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider, BallCollider, Debug } from '@react-three/rapier';
import { Perf } from 'r3f-perf';

export default function Experience() {
    const cube = useRef();

    const cubeJump = () => {
        // console.log(cube.current);
        cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        });
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
                    friction={0}
                >
                    <mesh castShadow onClick={cubeJump}>
                        <boxGeometry />
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
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
            </Physics>
        </>
    );
}
