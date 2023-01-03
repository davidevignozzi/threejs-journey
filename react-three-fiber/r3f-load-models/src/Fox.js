import { useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';

const Fox = () => {
    const model = useGLTF('./Fox/glTF/Fox.gltf');
    // console.log('🚀 ~ file: Fox.js:5 ~ Fox ~ model', model);

    const animations = useAnimations(model.animations, model.scene);
    // console.log("🚀 ~ file: Fox.js:9 ~ Fox ~ animations", animations)

    useEffect(() => {
        const action = animations.actions.Run;
        action.play();
    }, []);

    return (
        <primitive object={model.scene} scale={0.02} position={[-2.5, 0, 2.5]} rotation-y={0.3} />
    );
};

export default Fox;
