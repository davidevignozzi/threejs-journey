import { PresentationControls, Environment, Float } from '@react-three/drei';
import Laptop from './Laptop';

export default function Experience() {
    return (
        <>
            <color args={['#333333']} attach="background" />

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
                    <Laptop position-y={-1.2} />
                </Float>
            </PresentationControls>
        </>
    );
}
