import * as THREE from 'three';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const BlockStart = ({ position = [0, 0, 0] }) => {
    return (
        <group position={position}>
            <mesh geometry={boxGeometry} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow>
                <meshStandardMaterial color="limegreen" />
            </mesh>
        </group>
    );
};

const Level = () => {
    return (
        <>
            <BlockStart position={[0, 0, 0]} />
        </>
    );
};

export default Level;
