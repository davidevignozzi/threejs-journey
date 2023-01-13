import {} from '@react-three/drei';
import { Physics, Debug } from '@react-three/rapier';
import useGame from './stores/useGame';
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
    const blocksCount = useGame((state) => state.blocksCount);
    const blocksSeed = useGame((state) => state.blocksSeed);

    return (
        <>
            <Physics>
                {/* <Debug /> */}
                <Lights />
                <Level
                    // * change this values to modify the block count and block types
                    count={blocksCount}
                    seed={blocksSeed}
                    // types={[BlockSpinner, BlockLimbo, BlockAxe]}
                />
                <Player />
            </Physics>
        </>
    );
}
