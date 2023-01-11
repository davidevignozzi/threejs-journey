import { OrbitControls } from '@react-three/drei';
import { Physics, Debug } from '@react-three/rapier';
// ---
import Level from './Level.js';
import Lights from './Lights.js';

export default function Experience() {
    return (
        <>
            <OrbitControls makeDefault />

            <Physics>
                <Debug />
                <Lights />
                <Level />
            </Physics>
        </>
    );
}
