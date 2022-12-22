import { Text, Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

export default function Experience() {
    const cubeRef = useRef();
    const sphereRef = useRef();

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
                // scale={2}
                axisColors={[
                    '#9381ff', // x
                    '#ff4d6d', // y
                    '#7ae582' // z
                ]}
                depthTest={false} // To show it (like z-index)
            >
                <mesh ref={sphereRef} position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                    <Html
                        position={[1, 1, 0]}
                        wrapperClass="label"
                        center
                        distanceFactor={6}
                        occlude={[sphereRef, cubeRef]}>
                        That's a sphere 👍
                    </Html>
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

            {/* <Html>Test</Html> */}
            <Text
                // Default font => Roboto
                font="./bangers-v20-latin-regular.woff"
                color="salmon"
                fontSize={1}
                position-y={2}
                // maxWidth={2}
                textAlign="center">
                I LOVE R3F
            </Text>
        </>
    );
}
