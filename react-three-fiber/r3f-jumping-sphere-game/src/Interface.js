import React from 'react';
import { useKeyboardControls } from '@react-three/drei';
import useGame from './stores/useGame';

const Interface = () => {
    const forward = useKeyboardControls((state) => state.forward);
    const rightward = useKeyboardControls((state) => state.rightward);
    const backward = useKeyboardControls((state) => state.backward);
    const leftward = useKeyboardControls((state) => state.leftward);
    const jump = useKeyboardControls((state) => state.jump);

    //--------------------------------------
    // will call the method in useGame.js
    // that will set the phase to 'ready'
    // when the phase change to 'ready'
    // in Player.js call the reset function
    // that bring the player to initial position
    const restart = useGame((state) => state.restart);

    return (
        <div className="interface">
            {/* Timer */}
            <div className="time">
                <span>0.00</span>
            </div>

            {/* Restart */}
            <div className="restart" onClick={restart}>
                restart
            </div>

            {/* Controls */}
            <div className="controls">
                <div className="raw">
                    <div className={`key ${forward ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key ${leftward ? 'active' : ''}`}></div>
                    <div className={`key ${backward ? 'active' : ''}`}></div>
                    <div className={`key ${rightward ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key large ${jump ? 'active' : ''}`}></div>
                </div>
            </div>
        </div>
    );
};

export default Interface;
