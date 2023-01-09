import { OrbitControls, Environment, Float } from '@react-three/drei';
import Laptop from './Laptop';

export default function Experience() {
    return (
        <>
            <color args={['#333333']} attach="background" />

            <Environment preset="city" />
            <OrbitControls makeDefault />

            <Float rotationIntensity={0.4}>
                <Laptop position-y={-1.2} />
            </Float>
        </>
    );
}
