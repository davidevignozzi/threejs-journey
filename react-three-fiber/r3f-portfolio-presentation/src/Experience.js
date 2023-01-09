import { OrbitControls, Environment } from '@react-three/drei';
import Laptop from './Laptop';

export default function Experience() {
    return (
        <>
            <color args={['#333333']} attach="background" />

            <Environment preset="city" />
            <OrbitControls makeDefault />

            <Laptop />
        </>
    );
}
