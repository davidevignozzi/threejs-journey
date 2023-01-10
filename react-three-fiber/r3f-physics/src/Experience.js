import { OrbitControls } from '@react-three/drei';
import { Physics, RigidBody, Debug } from '@react-three/rapier';
import { Perf } from 'r3f-perf';

export default function Experience() {
    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <Physics>
                <Debug />

                {/* Sphere */}
                <RigidBody colliders="ball">
                    <mesh castShadow position={[0, 4, 0]}>
                        <sphereGeometry />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                </RigidBody>

                {/* Donut */}
                <RigidBody colliders="hull">
                    <mesh castShadow position={[0, 1, 0]} rotation={[Math.PI * 0.1, 0, 0]}>
                        <torusGeometry args={[1, 0.5, 16, 42]} />
                        <meshStandardMaterial color="midiumpurple" />
                    </mesh>
                </RigidBody>

                {/* Floor */}
                <RigidBody type="fixed">
                    <mesh receiveShadow position-y={-1.25}>
                        <boxGeometry args={[10, 0.5, 10]} />
                        <meshStandardMaterial color="greenyellow" />
                    </mesh>
                </RigidBody>
            </Physics>
        </>
    );
}
