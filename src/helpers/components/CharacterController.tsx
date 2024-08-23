import { Nick } from "@/components/canvas/models/Nick";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useKeyboardControls, OrbitControls } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";
import { Projectile } from "@/helpers/components/Projectile";
import { useGuardContext } from "./GuardContext";
import { useCharacterContext } from "./CharacterContext";

const normalizeAngle = (angle) => {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
};

const lerpAngle = (start, end, t) => {
    start = normalizeAngle(start);
    end = normalizeAngle(end);

    if (Math.abs(end - start) > Math.PI) {
        if (end > start) {
            start += 2 * Math.PI;
        } else {
            end += 2 * Math.PI;
        }
    }

    return normalizeAngle(start + (end - start) * t);
};

export const CharacterController = () => {
    const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls(
        "Character Control",
        {
          WALK_SPEED: { value: 1.2, min: 0.1, max: 4, step: 0.1 },
          RUN_SPEED: { value: 2.5, min: 0.2, max: 8, step: 0.1 },
          ROTATION_SPEED: {
            value: degToRad(9),
            min: degToRad(0.1),
            max: degToRad(5),
            step: degToRad(0.1),
          },
        },
        { collapsed: true } // Collapse the control group to hide it initially
    );
    const [, get] = useKeyboardControls();
    const orbitControlsRef = useRef<any>(null);
    const cameraOffset = useRef(new THREE.Vector3(0, 0.5, 3));
    const [isOrbiting, setIsOrbiting] = useState(false);
    const [isShooting, setIsShooting] = useState(false);
    const [projectiles, setProjectiles] = useState<any[]>([]);
    const [shootCooldown, setShootCooldown] = useState(0);
    const { guardRef, guardColliderRef, setAnimation: setGuardAnimation, punches } = useGuardContext();
    const [guardState, setGuardState] = useState("ACTIVE");
    const [hits, setHits] = useState(0);
    const { characterRef, characterColliderRef, characterAnimation: animation, setCharacterAnimation: setAnimation, container, nick } = useCharacterContext();

    const previousGuardPosition = useRef({ x: 0, y: -0.975, z: -5 });
    const previousGuardColliderPosition = useRef({ x: 0, y: -0.1, z: -5 });
    
    const cleanUpGuardPhysics = () => {
        // Save the current positions before cleaning up
        if (guardRef.current) {
            const guardPosition = guardRef.current.translation();
            previousGuardPosition.current = {
                x: guardPosition.x,
                y: guardPosition.y,
                z: guardPosition.z,
            };
        }
        if (guardColliderRef.current) {
            const guardColliderPosition = guardColliderRef.current.translation();
            previousGuardColliderPosition.current = {
                x: guardColliderPosition.x,
                y: guardColliderPosition.y,
                z: guardColliderPosition.z,
            };
        }
    
        // Move the guard and collider out of view
        if (guardColliderRef.current) {
            guardColliderRef.current.setTranslation({ x: 0, y: 1000, z: 0 }, true);
        }
        if (guardRef.current) {
            guardRef.current.setTranslation({ x: 0, y: 1000, z: 0 }, true);
        }
    };
    
    const recoverGuardPhysics = () => {
        // Restore the previous positions
        if (guardColliderRef.current) {
            guardColliderRef.current.setTranslation(previousGuardColliderPosition.current, true);
            console.log('recovered guard collider');
        }
        if (guardRef.current) {
            guardRef.current.setTranslation(previousGuardPosition.current, true);
            console.log('recovered guard ref');
        }
    };

    useEffect(() => {
        if (guardState === "ACTIVE" && hits >= 15) {
            setGuardState("DEFEATED");
            console.log('setting guard state to DEFEATED');
        }
    
        if (guardState === "DEFEATED") {
            cleanUpGuardPhysics();
            const timeout = setTimeout(() => {
                recoverGuardPhysics();
                setGuardState("ACTIVE");
                setHits(0);
                console.log('resetting guard state to ACTIVE');
            }, 3000);
    
            return () => clearTimeout(timeout);
        }
    }, [guardState, hits]);

    useFrame(({ camera, mouse, clock }) => {
        if (characterRef.current) {
            const vel = new THREE.Vector3();
            const movement = new THREE.Vector3(0, 0, 0);
            if (get().forward) movement.z -= 1;
            if (get().backward) movement.z += 1;
            if (get().left) {
                if (movement.z > 0) {
                    movement.x += 1;
                } else {
                    movement.x -= 1;
                }
            }
            if (get().right) {
                if (movement.z > 0) {
                    movement.x -= 1;
                } else {
                    movement.x += 1;
                }
            }

            if (movement.length() > 1 || movement.length() < 1) movement.normalize();

            const speed = get().run ? RUN_SPEED : WALK_SPEED;
            vel.x = movement.x * speed;
            vel.z = movement.z * speed;

            characterRef.current.setLinvel(vel, true);

            if (movement.length() > 0) {
                const characterRotationTarget = Math.atan2(-movement.x, -movement.z);
                nick.current.rotation.y = lerpAngle(nick.current.rotation.y, characterRotationTarget, ROTATION_SPEED);
                characterColliderRef.current.setRotation({ x: 0, y: nick.current.rotation.y, z: 0 });
            }

            const nickWorldPosition = new THREE.Vector3();
            nick.current.getWorldPosition(nickWorldPosition);
            characterColliderRef.current.setTranslation(nickWorldPosition);
            characterColliderRef.current.position = [0, -0.1, 0];

            if (!isShooting && punches<10) {
                if (vel.length() === 0 && !get().jump) {
                    setAnimation("idle");
                } else if (get().run) {
                    setAnimation("run");
                } else if (get().jump) {
                    setAnimation("jump");
                } else {
                    setAnimation("walking");
                }
            }

            const characterPosition = new THREE.Vector3();
            container.current.getWorldPosition(characterPosition);

            if (!isOrbiting) {
                const rotatedOffset = cameraOffset.current.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), nick.current.rotation.y);
                camera.position.copy(characterPosition).add(rotatedOffset);
                camera.lookAt(characterPosition);
            }
            orbitControlsRef.current.target.copy(characterPosition);

            const crosshair = document.getElementById("crosshair");
            if (crosshair) {
                crosshair.style.transform = `translate(${mouse.x * window.innerWidth / 2}px, ${-mouse.y * window.innerHeight / 2}px)`;
            }

            if (isShooting && shootCooldown <= 0) {
                const projectileStartPosition = nick.current.position.clone().add(new THREE.Vector3(0, 0, -1));
                const projectileVelocity = new THREE.Vector3(0, 0, -5).applyQuaternion(nick.current.quaternion);
                setProjectiles([...projectiles, { position: projectileStartPosition.toArray(), velocity: projectileVelocity.toArray() }]);
                setShootCooldown(0.6);
            }

            setShootCooldown((prev) => Math.max(0, prev - 1 / 60));
        }
    });

    useEffect(() => {
        const handleMouseDown = (e) => {
            if (e.button === 0) {
                setIsShooting(true);
                setAnimation("gun shoot");
            }
        };

        const handleMouseUp = () => {
            setIsShooting(false);
        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <>
            <RigidBody gravityScale={0} colliders={false} ref={characterRef} lockRotations>
                <OrbitControls
                    ref={orbitControlsRef}
                    onStart={() => setIsOrbiting(true)}
                    onEnd={() => setIsOrbiting(false)}
                    enableZoom={false}
                />
                <group ref={container}>
                    <group ref={nick}>
                        <Nick position={[0, -0.975, 0]} scale={1} animation={animation} />
                    </group>
                    <CapsuleCollider ref={characterColliderRef} position={[0, -0.1, 0]} args={[0.45, 0.42]} name="CharacterCollider" />
                </group>
            </RigidBody>
            {projectiles.map((proj, index) => (
                <Projectile
                    key={index}
                    position={proj.position}
                    velocity={proj.velocity}
                    onHit={() => {
                        setGuardAnimation("hit reaction");
                        setHits(prevHits => prevHits + 1);
                        setTimeout(() => {
                            setGuardAnimation("idle");
                        }, 600);
                    }}
                />
            ))}
        </>
    );
};
