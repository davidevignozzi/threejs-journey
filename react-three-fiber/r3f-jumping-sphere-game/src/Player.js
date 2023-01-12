import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { useRapier, RigidBody } from '@react-three/rapier';

const Player = () => {
    const body = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls();

    const { rapier, world } = useRapier();

    const [smoothCameraPosition] = useState(() => new THREE.Vector3());
    const [smoothCameraTarget] = useState(() => new THREE.Vector3());

    /**
     * Jump
     */
    const jump = () => {
        // * prevent the multiple jump
        // cast a ray from the ball to the floor to check the distance
        const origin = body.current.translation();
        origin.y -= 0.31;
        const direction = { x: 0, y: -1, z: 0 };
        const ray = new rapier.Ray(origin, direction);
        const rapierWorld = world.raw();
        const hit = rapierWorld.castRay(
            ray,
            10,
            true // tomake the floor solid
        );

        if (hit.toi < 0.15) {
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
        }
    };

    useEffect(() => {
        // user press the spacebar
        const unSubscribeJump = subscribeKeys(
            // selector
            (state) => state.jump,

            (value) => {
                if (value) {
                    jump();
                }
            }
        );

        return () => {
            unSubscribeJump();
        };
    }, []);

    useFrame((state, delta) => {
        /**
         *  KeyboardControls
         */
        // const keys = getKeys();
        const { forward, backward, leftward, rightward } = getKeys();

        const impulse = { x: 0, y: 0, z: 0 };
        const torque = { x: 0, y: 0, z: 0 };

        const impulseStrength = 0.6 * delta;
        const torqueStrength = 0.2 * delta;

        if (forward) {
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;
        }

        if (rightward) {
            impulse.x += impulseStrength;
            torque.z -= torqueStrength;
        }

        if (backward) {
            impulse.z += impulseStrength;
            torque.x += torqueStrength;
        }

        if (leftward) {
            impulse.x -= impulseStrength;
            torque.z += torqueStrength;
        }

        body.current.applyImpulse(impulse);
        body.current.applyTorqueImpulse(torque);

        /**
         * Camera
         */
        const bodyPosition = body.current.translation();
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(bodyPosition);
        cameraPosition.z += 2.25;
        cameraPosition.y += 0.65;

        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(bodyPosition);
        cameraTarget.y += 0.25;

        // smoother camera
        smoothCameraPosition.lerp(cameraPosition, 0.1);
        smoothCameraTarget.lerp(cameraTarget, 0.1);

        state.camera.position.copy(smoothCameraPosition);
        state.camera.lookAt(smoothCameraTarget);
    });

    return (
        <RigidBody
            ref={body}
            colliders="ball"
            restitution={0.2}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
            position={(0, 1, 0)}
        >
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial flatShading color="mediumpurple" />
            </mesh>
        </RigidBody>
    );
};

export default Player;
