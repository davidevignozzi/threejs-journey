import React, { useRef, useEffect } from 'react';
import { addEffect } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import useGame from './stores/useGame';

const Interface = () => {
    const time = useRef();

    const forward = useKeyboardControls((state) => state.forward);
    const rightward = useKeyboardControls((state) => state.rightward);
    const backward = useKeyboardControls((state) => state.backward);
    const leftward = useKeyboardControls((state) => state.leftward);
    const jump = useKeyboardControls((state) => state.jump);

    /**
     * Phase
     */
    const phase = useGame((state) => state.phase);

    //-------------------------------------- Restart
    // will call the method in useGame.js
    // that will set the phase to 'ready'
    // when the phase change to 'ready'
    // in Player.js call the reset function
    // that bring the player to initial position
    const restart = useGame((state) => state.restart);

    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState();

            /**
             * Timer
             */
            let elapsedTime = 0;

            if (state.phase === 'playing') {
                elapsedTime = Date.now() - state.startTime;
            } else if (state.phase === 'ended') {
                elapsedTime = state.endTime - state.startTime;
            }

            // to delete milliseconds
            elapsedTime /= 1000;
            elapsedTime = elapsedTime.toFixed(2);

            if (time.current) {
                time.current.textContent = elapsedTime;
            }
        });

        return () => unsubscribeEffect;
    }, []);

    return (
        <div className="interface">
            {/* Timer */}
            <div className="time">
                <span ref={time}>0.00</span>
            </div>

            {/* Restart */}
            {phase === 'ended' && (
                <div className="restart" onClick={restart}>
                    restart
                </div>
            )}

            {/* Controls */}
            <div className="controls">
                <div className="raw">
                    <div className={`key ${forward ? 'active' : ''}`}>&#8593;</div>
                </div>
                <div className="raw">
                    <div className={`key ${leftward ? 'active' : ''}`}>&#8592;</div>
                    <div className={`key ${backward ? 'active' : ''}`}>&#8595;</div>
                    <div className={`key ${rightward ? 'active' : ''}`}>&#8594;</div>
                </div>
                <div className="raw">
                    <div className={`key large ${jump ? 'active' : ''}`}>Space</div>
                </div>
            </div>
        </div>
    );
};

export default Interface;
