import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';

// torusGeometry
const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);

//matcapMaterial
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
    // const [torusGeometry, setTorusGeometry] = useState();
    // const [material, setMaterial] = useState();

    // const donutsGroup = useRef();
    const donuts = useRef([]);

    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

    // const tempArray = [...Array(100)];
    // console.log('🚀 ~ tempArray', tempArray);
    // tempArray.map(() => {});

    useEffect(() => {
        // update matcap texture
        matcapTexture.encoding = THREE.sRGBEncoding;
        matcapTexture.needsUpdate = true;

        // update material
        material.matcap = matcapTexture;
        material.needsUpdate = true;
    }, []);

    useFrame((state, delta) => {
        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.2;
        }
    });

    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
            <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

            <Center>
                <Text3D
                    material={material}
                    font={'./fonts/helvetiker_regular.typeface.json'}
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    Hello R3F
                </Text3D>
            </Center>

            {/* <group ref={donutsGroup}> */}

            {[...Array(100)].map((value, index) => (
                <mesh
                    key={index}
                    // ☝ React will call the function and send the actual component as parameter
                    ref={(el) => {
                        donuts.current[index] = el;
                    }}
                    geometry={torusGeometry}
                    material={material}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    ]}
                    scale={0.2 + Math.random() * 0.2}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                />
            ))}

            {/* </group> */}
        </>
    );
}
