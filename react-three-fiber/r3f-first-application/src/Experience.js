import React from 'react';

// Don't have to create a Scene
// Don't have to create a WebGLRenderer
// The scene is being rendered on each frame
// Don't have to place a PerspectiveCamera
// Resize automaticly
// Don't have to provide specific value for <torusKnotGeometry />
// Don't have to provide mesh

const Experience = () => {
    return (
        <>
            <mesh>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh>
        </>
    );
};

export default Experience;
