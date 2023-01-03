import { useGLTF } from '@react-three/drei';

const Fox = () => {
    const model = useGLTF('./Fox/glTF/Fox.gltf');
    return (
        <primitive object={model.scene} scale={0.02} position={[-2.5, 0, 2.5]} rotation-y={0.3} />
    );
};

export default Fox;
