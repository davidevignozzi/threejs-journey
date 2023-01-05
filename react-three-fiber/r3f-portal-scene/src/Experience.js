import { OrbitControls, useGLTF } from '@react-three/drei';

export default function Experience() {
    /**
     * Portal model
     */
    // const model = useGLTF('./model/portal.glb');
    // console.log('🚀 ~ Experience ~ model', model);

    const { nodes } = useGLTF('./model/portal.glb');
    console.log('🚀 ~ Experience ~ nodes', nodes);

    return (
        <>
            <color args={['#201919']} attach="background" />

            <OrbitControls makeDefault />

            <mesh geometry={nodes.baked.geometry} />
        </>
    );
}
