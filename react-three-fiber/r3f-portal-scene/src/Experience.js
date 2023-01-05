import { useRef } from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import {
    Center,
    OrbitControls,
    useGLTF,
    useTexture,
    Sparkles,
    shaderMaterial
} from '@react-three/drei';
import portalVertexShader from './shaders/portal/vertex.js';
import portalFragmentShader from './shaders/portal/fragment.js';

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
);

// extend({ PortalMaterial: PortalMaterial });
extend({ PortalMaterial });

export default function Experience() {
    const portalMaterial = useRef();

    /**
     * Portal model
     */
    // const model = useGLTF('./model/portal.glb');
    // console.log('🚀 ~ Experience ~ model', model);

    const { nodes } = useGLTF('./model/portal.glb');
    // console.log('🚀 ~ Experience ~ nodes', nodes);

    const bakedTexture = useTexture('./model/baked.jpg');
    bakedTexture.flipY = false;
    // console.log('🚀 ~ Experience ~ bakedTexture', bakedTexture);

    return (
        <>
            <color args={['#201919']} attach="background" />

            <OrbitControls makeDefault />

            <Center>
                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                {/* poleLightA */}
                <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
                    <meshBasicMaterial color="fffe5" />
                </mesh>

                {/* poleLightB */}
                <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
                    <meshBasicMaterial color="fffe5" />
                </mesh>

                {/* portalLight */}
                <mesh
                    geometry={nodes.portalLight.geometry}
                    position={nodes.portalLight.position}
                    rotation={nodes.portalLight.rotation}
                >
                    {/*
                        <shaderMaterial
                            vertexShader={portalVertexShader}
                            fragmentShader={portalFragmentShader}
                            uniforms={{
                                uTime: { value: 0 },
                                uColorStart: { value: new THREE.Color('#ffffff') },
                                uColorEnd: { value: new THREE.Color('#000000') }
                            }}
                        />
                    */}
                    <portalMaterial ref={portalMaterial} />
                </mesh>

                {/* Sparkles */}
                <Sparkles size={6} scale={[4, 2, 4]} position-y={1} count={40} />
            </Center>
        </>
    );
}
