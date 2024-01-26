import { useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'
import { useMemo, useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience()
{
    const [ hitSound ] = useState(() => new Audio('./hit.mp3'))
    const twister = useRef()
    const cube = useRef()

    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime()
        
        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)

        const angle = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        twister.current.setNextKinematicTranslation({ x: x, y: - 0.8, z: z })
    })

    const cubeJump = () =>
    {
        const mass = cube.current.mass()
        
        cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
        cube.current.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 })
    }

    const collisionEnter = () =>
    {
        console.log('collision!')
        // hitSound.currentTime = 0
        // hitSound.volume = Math.random()
        // hitSound.play()
    }

    const hamburger = useGLTF('./hamburger.glb')

    const cubesCount = 100
    const instances = useMemo(() =>
    {
        const instances = [];

        for(let i = 0; i < cubesCount; i++)
        {
            instances.push({
                key: 'instance_' + i,
                position:
                [
                    (Math.random() - 0.5) * 8,
                    6 + i * 0.2,
                    (Math.random() - 0.5) * 8,
                ],
                rotation: [ Math.random(), Math.random(), Math.random() ],
            })
        }

        return instances;
    }, [])

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <Physics debug={ true } gravity={ [ 0, - 9.08, 0 ] }>

            <RigidBody colliders="ball" position={ [ - 1.5, 2, 0 ] }>
                <mesh castShadow>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody
                ref={ cube }
                position={ [ 1.5, 2, 0 ] }
                gravityScale={ 1 }
                restitution={ 0 }
                friction={ 0.7 }
                colliders={ false }
                // onCollisionEnter={ collisionEnter }
                // onCollisionExit={ () => { console.log('exit') } }
                // onSleep={ () => { console.log('sleep') } }
                // onWake={ () => { console.log('wake') } }
            >
                <mesh castShadow onClick={ cubeJump }>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
                <CuboidCollider mass={ 2 } args={ [ 0.5, 0.5, 0.5 ] } />
            </RigidBody>

            <RigidBody
                type="fixed"
                restitution={ 0 }
                friction={ 0.7 }
            >
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 10, 0.5, 10 ] } />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

            <RigidBody
                ref={ twister }
                position={ [ 0, - 0.8, 0 ] }
                friction={ 0 }
                type="kinematicPosition"
            >
                <mesh castShadow scale={ [ 0.4, 0.4, 3 ] }>
                    <boxGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>
            </RigidBody>

            <RigidBody colliders={ false } position={ [ 0, 4, 0 ] }>
                <primitive object={ hamburger.scene } scale={ 0.25 } />
                <CylinderCollider args={ [ 0.5, 1.25 ] } />
            </RigidBody>

            <RigidBody type="fixed">
                <CuboidCollider args={ [ 5, 2, 0.5 ] } position={ [ 0, 1, 5.5 ] } />
                <CuboidCollider args={ [ 5, 2, 0.5 ] } position={ [ 0, 1, - 5.5 ] } />
                <CuboidCollider args={ [ 0.5, 2, 5 ] } position={ [ 5.5, 1, 0 ] } />
                <CuboidCollider args={ [ 0.5, 2, 5 ] } position={ [ - 5.5, 1, 0 ] } />
            </RigidBody>

            <InstancedRigidBodies instances={ instances }>
                <instancedMesh castShadow receiveShadow args={ [ null, null, cubesCount ] }>
                    <boxGeometry />
                    <meshStandardMaterial color="tomato" />
                </instancedMesh>
            </InstancedRigidBodies>

        </Physics>

    </>
}