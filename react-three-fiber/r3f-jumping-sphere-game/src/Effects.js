import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

const Effects = () => {
    return (
        <EffectComposer>
            <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={3} />
        </EffectComposer>
    );
};

export default Effects;
