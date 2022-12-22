import { PivotControls, TransformControls, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

export default function Experience() {
    const cubeRef = useRef();

    return (
        <>
            <OrbitControls
                // is set with enabledDamping: true

                makeDefault // to resolve conflict with TransformControls
            />
            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <PivotControls
                anchor={
                    [0, 0, 0] // relative to the object
                }
                lineWidth={4}
                scale={2}
                axisColors={[
                    '#9381ff', // x
                    '#ff4d6d', // y
                    '#7ae582' // z
                ]}
                depthTest={false} // To show it (like z-index)
            >
                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </PivotControls>

            {/* 
                <TransformControls position-x={2}>
                    <mesh scale={1.5}>
                        <boxGeometry />
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
                </TransformControls>
            */}

            <mesh ref={cubeRef} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <TransformControls
                object={cubeRef}
                // mode="rotate"
                mode="translate"
            />

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    );
}
