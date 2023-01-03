import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import Model from './Model';
import Placeholder from './Placeholder';

export default function Experience() {
    // const model = useLoader(GLTFLoader, './hamburger.glb');
    // console.log('🚀 ~ model', model);

    // const model = useLoader(GLTFLoader, './hamburger-draco.glb', (loader) => {
    //     // console.log(loader);
    //     const dracoLoader = new DRACOLoader();
    //     dracoLoader.setDecoderPath('./draco/');
    //     loader.setDRACOLoader(dracoLoader);
    // });

    // const model = useLoader(GLTFLoader, './FlightHelmet/glTF/FlightHelmet.gltf', (loader) => {
    //     // console.log(loader);
    //     const dracoLoader = new DRACOLoader();
    //     dracoLoader.setDecoderPath('./draco/');
    //     loader.setDRACOLoader(dracoLoader);
    // });

    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

            {/* Load Moadel */}

            {/* 
                <primitive object={model.scene} scale={5} position-y={-1} />
            */}

            {/* Lazy Loading */}
            <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
                <Model />
            </Suspense>
        </>
    );
}
