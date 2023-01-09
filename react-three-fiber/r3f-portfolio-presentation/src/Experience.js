import {
    useGLTF,
    PresentationControls,
    Environment,
    Float,
    Html,
    ContactShadows
} from '@react-three/drei';

export default function Experience() {
    const laptop = useGLTF(
        'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
    );

    return (
        <>
            <color args={['#ffffff']} attach="background" />

            <Environment preset="city" />

            <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 2, tension: 400 }}
            >
                <Float rotationIntensity={0.4}>
                    <primitive object={laptop.scene} position-y={-1.2} />
                </Float>
            </PresentationControls>

            <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
        </>
    );
}
