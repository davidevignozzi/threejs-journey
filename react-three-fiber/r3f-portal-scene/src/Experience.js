import { OrbitControls } from '@react-three/drei';

export default function Experience() {
    return (
        <>
            <color args={['#201919']} attach="background" />

            <OrbitControls makeDefault />

            <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh>
        </>
    );
}
