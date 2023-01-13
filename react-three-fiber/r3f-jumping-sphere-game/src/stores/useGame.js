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
            set((state) => {
                if (state.phase === 'ready') {
                    return { phase: 'playing' };
                } else {
                    return {
                        // have to return something
                        // empty object
                    };
                }
            });
        },

        // * When user press restart return to initial phase
        restart: () => {
            set((state) => {
                if (state.phase === 'playing' || state.phase === 'ended') {
                    return { phase: 'ready' };
                } else {
                    return {
                        // have to return something
                        // empty object
                    };
                }
            });
        },

        // * When user end the level the state will be 'ended'
        end: () => {
            set((state) => {
                if (state.phase === 'playing') {
                    return { phase: 'ended' };
                } else {
                    return {
                        // have to return something
                        // empty object
                    };
                }
            });
        }
    };
});
