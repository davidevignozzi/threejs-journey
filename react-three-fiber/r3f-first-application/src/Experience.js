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
            {/* Sphere */}
            <mesh position-x={-2}>
                <sphereGeometry />
                <meshBasicMaterial color="orange"></meshBasicMaterial>
            </mesh>

            {/* Cube */}
            <mesh rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
                <boxGeometry scale={1.5} />
                <meshBasicMaterial color="mediumpurple"></meshBasicMaterial>
            </mesh>

            {/* Plane / Floor */}
            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color="greenyellow"></meshBasicMaterial>
            </mesh>
        </>
    );
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
