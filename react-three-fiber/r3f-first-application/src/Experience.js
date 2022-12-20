import React from 'react';

// Don't have to create a Scene
// Don't have to create a WebGLRenderer
// The scene is being rendered on each frame
// Don't have to place a PerspectiveCamera
// Resize automaticly
// Don't have to provide specific value for <torusKnotGeometry />
// Don't have to provide mesh

const Experience = () => {
    return <></>;
};

const oldStff = () => {
    return (
        <>
            <mesh
                // scale={[3, 2, 1]}> => [x,y,z]
                scale={1.5}
                // position={[x,y,z]}
                position-x={2}
                // rotation={[x,y,z]}
                rotation-y={Math.PI * 0.25}>
                {/* <torusKnotGeometry />
                <meshNormalMaterial /> */}
                <sphereGeometry
                    args={[
                        // radious
                        1.5,
                        // widthSegments
                        32,
                        // heigthSegments
                        32
                    ]}
                />

                {/* <meshBasicMaterial args={[{ color: 'red', wireframe: true }]} /> */}

                <meshBasicMaterial color={'red'} wireframe />
            </mesh>
        </>
    );
};

export default Experience;
