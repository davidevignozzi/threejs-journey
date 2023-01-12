import create from 'zustand';

export default create((set) => {
    return {
        // * the block count
        blocksCount: 5,

        /**
         * Phases
         */
        // * First fase
        phase: 'ready',

        // * When User press a key the phase will change in 'playing'
        start: () => {
            set(() => {
                return { phase: 'playing' };
            });
        },

        // * When user press restart return to initial phase
        restart: () => {
            set(() => {
                return { phase: 'ready' };
            });
        },

        // * When user end the level the state will be 'ended'
        end: () => {
            set(() => {
                return { phase: 'ended' };
            });
        }
    };
});
