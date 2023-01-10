import {
    useGLTF,
    PresentationControls,
    Environment,
    Float,
    Html,
    Text,
    ContactShadows
} from '@react-three/drei';
import { Suspense } from 'react';
import { isMobile } from 'react-device-detect';
import image from './Images/ComingSoon.png';

export default function Experience() {
    const laptop = useGLTF(
        'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
    );

    return (
        <>
            <color args={['#334F5B']} attach="background" />

            <Environment preset="city" />

            <Suspense fallback={null}>
                <PresentationControls
                    global
                    rotation={[0.13, 0.1, 0]}
                    polar={[-0.4, 0.2]}
                    azimuth={[-1, 0.75]}
                    config={{ mass: 2, tension: 400 }}
                    snap={{ mass: 2, tension: 400 }}
                >
                    <Float rotationIntensity={0.4}>
                        {/* Screen Light */}
                        <rectAreaLight
                            width={2.5}
                            height={1.65}
                            intensity={isMobile ? 10 : 65}
                            color={'#faa582'}
                            rotation={[0.1, Math.PI, 0]}
                            position={[0.75, 0.55, -1.15]}
                        />

                        {/* Laptop */}
                        <primitive
                            object={laptop.scene}
                            scale={isMobile ? 0.6 : 1}
                            position-x={isMobile ? 0.3 : 0.75}
                            position-y={isMobile ? -1 : -1.2}
                        >
                            {/* Image with the actual website */}
                            <Html
                                transform
                                wrapperClass="htmlScreen"
                                distanceFactor={isMobile ? 1.15 : 1.17}
                                position={isMobile ? [-0.04, 1.87, -1.37] : [0, 1.56, -1.4]}
                                rotation-x={isMobile ? -0.258 : -0.256}
                                scale={isMobile && 0.99}
                            >
                                <img src={image} />
                            </Html>
                        </primitive>

                        {/*
                            // Text 
                            <Text
                                font="./bangers-v20-latin-regular.woff"
                                fontSize={1}
                                position={[2, 0.75, 0.75]}
                                rotation-y={-1.25}
                                maxWidth={2}
                                textAlign="center"
                            >
                                DAVIDE VIGNOZZI
                            </Text> 
                        */}
                    </Float>
                </PresentationControls>
            </Suspense>

            <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
        </>
    );
}

useGLTF.preload(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
);
