import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
    subscribeWithSelector((set) => {
        return {
            /**
             * Blocks
             */
            blocksCount: 10,
            // -- randomness
            // on restart will change this value
            // on change will call useMemo in Level.js
            blocksSeed: 0,

            /**
             * Time
             */
            startTime: 0,
            endTime: 0,

            /**
             * Phases
             */
            // * First fase
            phase: 'ready',

            // * When User press a key the phase will change in 'playing'
            start: () => {
                set((state) => {
                    if (state.phase === 'ready') {
                        return { phase: 'playing', startTime: Date.now() };
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
                        return {
                            phase: 'ready',
                            // Randomize level
                            blocksSeed: Math.random()
                        };
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
                        return { phase: 'ended', endTime: Date.now() };
                    } else {
                        return {
                            // have to return something
                            // empty object
                        };
                    }
                });
            }
        };
    })
);
