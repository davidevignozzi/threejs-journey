import {} from '@react-three/drei';
import { Physics, Debug } from '@react-three/rapier';
// ---
import {
    Level
    // BlockSpinner,
    // BlockLimbo,
    // BlockAxe
} from './Level.js';
import Player from './Player.js';
import Lights from './Lights.js';

export default function Experience() {
    return (
        <>
            <Physics>
                {/* <Debug /> */}
                <Lights />
                <Level
                // * change this values to modify the block count and block types
                // count={10}
                // types={[BlockSpinner, BlockLimbo, BlockAxe]}
                />
                <Player />
            </Physics>
        </>
    );
}
