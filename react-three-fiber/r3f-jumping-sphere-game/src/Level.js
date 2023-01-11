import { useState, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

/**
 * Materials
 */
THREE.ColorManagement.legacyMode = false;
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

/**
 *  First Block
 */
const BlockStart = ({ position = [0, 0, 0] }) => {
    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={floor1Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
        </group>
    );
};

/**
 *  Spinner Block
 */
const BlockSpinner = ({ position = [0, 0, 0] }) => {
    const obstacle = useRef();
    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1));

    // spinner animation
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // console.log('🚀 ~ useFrame ~ time', time);
        const rotation = new THREE.Quaternion();
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
        obstacle.current.setNextKinematicRotation(rotation);
    });
    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />

            {/* Spinner Obstacle */}
            <RigidBody
                ref={obstacle}
                type="kinematicPosition"
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[3.5, 0.3, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    );
};

/**
 *  Limbo Block
 */
const BlockLimbo = ({ position = [0, 0, 0] }) => {
    const obstacle = useRef();
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

    // LImbo animation
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const y = Math.sin(time + timeOffset) + 1.15;
        obstacle.current.setNextKinematicTranslation({
            x: position[0],
            y: position[1] + y,
            z: position[2]
        });
    });
    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />

            {/* Limbo Obstacle */}
            <RigidBody
                ref={obstacle}
                type="kinematicPosition"
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[3.5, 0.3, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    );
};

const Level = () => {
    return (
        <>
            <BlockStart position={[0, 0, 8]} />
            <BlockSpinner position={[0, 0, 4]} />
            <BlockLimbo position={[0, 0, 0]} />
        </>
    );
};

export default Level;
