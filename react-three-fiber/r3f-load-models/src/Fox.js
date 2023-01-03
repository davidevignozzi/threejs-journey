import { useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';

const Fox = () => {
    const model = useGLTF('./Fox/glTF/Fox.gltf');
    // console.log('🚀 ~ file: Fox.js:5 ~ Fox ~ model', model);

    const animations = useAnimations(model.animations, model.scene);
    // console.log("🚀 ~ file: Fox.js:9 ~ Fox ~ animations", animations)

    const { animationName } = useControls({
        animationName: { options: animations.names }
    });

    useEffect(() => {
        // const action = animations.actions.Run;
        // action.play();

        // window.setTimeout(() => {
        //     animations.actions.Walk.play();
        //     animations.actions.Walk.crossFadeFrom(action, 1);
        // }, 2000);

        const action = animations.actions[animationName];
        action.reset().fadeIn(0.5).play();

        return () => {
            // console.log('dispose');

            action.fadeOut(0.5);
        };
    }, [animationName]);

    return (
        <primitive object={model.scene} scale={0.02} position={[-2.5, 0, 2.5]} rotation-y={0.3} />
    );
};

export default Fox;
