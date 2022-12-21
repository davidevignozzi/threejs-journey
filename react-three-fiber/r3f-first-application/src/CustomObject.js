import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const CustomObject = () => {
    const geometryRef = useRef();

    const verticesCount = 10 * 3;
    // const positions = new Float32Array(verticesCount * 3);

    // for (let i = 0; i < verticesCount * 3; i++) {
    //     positions[i] = (Math.random() - 0.5) * 3;
    // }

    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3);

        for (let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3;
        }

        return positions;
    }, []);
    // In the dependencies array verticesCount? It's not a state

    // After the first render
    useEffect(() => {
        geometryRef.current.computeVertexNormals();
    }, []);

    return (
        <mesh>
            <bufferGeometry ref={geometryRef}>
                {/* geometry.attribute.position */}
                <bufferAttribute
                    attach="attributes-position"
                    count={verticesCount}
                    itemSize={3}
                    array={positions}
                />
            </bufferGeometry>
            {/* <meshBasicMaterial color="red" side={THREE.DoubleSide} /> */}
            <meshStandardMaterial color="red" side={THREE.DoubleSide} />
        </mesh>
    );
};

export default CustomObject;
