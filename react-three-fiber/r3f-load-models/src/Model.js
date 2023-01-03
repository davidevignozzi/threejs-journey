// import { useLoader } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Clone, useGLTF } from '@react-three/drei';

const Model = () => {
    // FlightHelmet
    // const model = useLoader(GLTFLoader, './FlightHelmet/glTF/FlightHelmet.gltf', (loader) => {
    //     // console.log(loader);
    //     const dracoLoader = new DRACOLoader();
    //     dracoLoader.setDecoderPath('./draco/');
    //     loader.setDRACOLoader(dracoLoader);
    // });

    // Hamburger
    // const model = useLoader(GLTFLoader, './hamburger-draco.glb', (loader) => {
    //     const dracoLoader = new DRACOLoader();
    //     dracoLoader.setDecoderPath('./draco/');
    //     loader.setDRACOLoader(dracoLoader);
    // });

    // const model = useGLTF('./hamburger.glb');
    const model = useGLTF('./hamburger-draco.glb');

    return (
        <>
            <Clone object={model.scene} scale={0.3} position-y={-1} position-x={-4} />;
            <Clone object={model.scene} scale={0.3} position-y={-1} position-x={0} />;
            <Clone object={model.scene} scale={0.3} position-y={-1} position-x={4} />;
        </>
    );
};

export default Model;
