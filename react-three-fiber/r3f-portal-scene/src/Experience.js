import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';

export default function Experience() {
    /**
     * Portal model
     */
    // const model = useGLTF('./model/portal.glb');
    // console.log('🚀 ~ Experience ~ model', model);

    const { nodes } = useGLTF('./model/portal.glb');
    // console.log('🚀 ~ Experience ~ nodes', nodes);

    const bakedTexture = useTexture('./model/baked.jpg');
    bakedTexture.flipY = false;
    // console.log('🚀 ~ Experience ~ bakedTexture', bakedTexture);

    return (
        <>
            <color args={['#201919']} attach="background" />

            <OrbitControls makeDefault />

            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
        </>
    );
}
