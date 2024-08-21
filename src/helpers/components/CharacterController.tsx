import { Nick } from "@/components/canvas/models/Nick"
import { RigidBody, CapsuleCollider } from "@react-three/rapier"
import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useKeyboardControls, OrbitControls } from "@react-three/drei"
import { degToRad } from "three/src/math/MathUtils"

// Normalize angle to be within the range of -PI to PI
const normalizeAngle = (angle) => {
    while (angle > Math.PI) angle -= 2 * Math.PI
    while (angle < -Math.PI) angle += 2 * Math.PI
    return angle
}

// Lerp for angles to smoothly transition between them
const lerpAngle = (start, end, t) => {
    start = normalizeAngle(start)
    end = normalizeAngle(end)

    if (Math.abs(end - start) > Math.PI) {
        if (end > start) {
            start += 2 * Math.PI
        } else {
            end += 2 * Math.PI
        }
    }

    return normalizeAngle(start + (end - start) * t)
}

export const CharacterController = () => {
    const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls("Character Control", {
        WALK_SPEED: { value: 1.2, min: 0.1, max: 4, step: 0.1 },
        RUN_SPEED: { value: 2.5, min: 0.2, max: 8, step: 0.1 },
        ROTATION_SPEED: {
            value: degToRad(9),
            min: degToRad(0.1),
            max: degToRad(5),
            step: degToRad(0.1),
        },
    })
    const [, get] = useKeyboardControls()
    const rb = useRef(null)
    const container = useRef(null)
    const nick = useRef(null)
    const capsuleColliderRef = useRef(null)
    const orbitControlsRef = useRef<any>(null) // Ref to store the OrbitControls instance
    const [animation, setAnimation] = useState("idle")
    const cameraOffset = useRef(new THREE.Vector3(0, 0.5, 2)) // Updated camera offset
    const [isOrbiting, setIsOrbiting] = useState(false) // State for orbit controls

    useFrame(({camera}) => {
        if (rb.current) {
            const vel = new THREE.Vector3()
            const movement = new THREE.Vector3(0, 0, 0)
            // Determine movement direction
            if (get().forward) movement.z -= 1; // Move forward
            if (get().backward) movement.z += 1; // Move backward
            if (get().left) {
                if (movement.z > 0) {
                    movement.x += 1; // Invert left when moving backward
                } else {
                    movement.x -= 1; // Move left when moving forward
                }
            }
            if (get().right) {
                if (movement.z > 0) {
                    movement.x -= 1; // Invert right when moving backward
                } else {
                    movement.x += 1; // Move right when moving forward
                }
            }

            // Normalize movement vector
            if (movement.length() > 1) movement.normalize()

            // Calculate speed
            const speed = get().run ? RUN_SPEED : WALK_SPEED

            // Update velocity based on movement direction
            vel.x = movement.x * speed
            vel.z = movement.z * speed

            // Set the linear velocity of the rigid body
            rb.current.setLinvel(vel, true)

            // Rotate character based on movement direction
            if (movement.length() > 0) {
                const characterRotationTarget = Math.atan2(-movement.x, -movement.z)
                nick.current.rotation.y = lerpAngle(nick.current.rotation.y, characterRotationTarget, ROTATION_SPEED)
                capsuleColliderRef.current.setRotation({ x: 0, y: nick.current.rotation.y, z: 0 })
            }

            const nickWorldPosition = new THREE.Vector3()
            nick.current.getWorldPosition(nickWorldPosition)
            capsuleColliderRef.current.setTranslation(nickWorldPosition)
            capsuleColliderRef.current.position = [0,-0.1,0]

            // Set animation based on speed and movement
            if (vel.length() === 0 && !get().jump) {
                setAnimation("idle")
            } else if (get().run) {
                setAnimation("run")
            } else if (get().jump) {
                setAnimation("jump") 
            } else {
                setAnimation("walking")
            }

            // CAMERA
            const characterPosition = new THREE.Vector3()
            container.current.getWorldPosition(characterPosition)

            // Check if orbit controls are active
            if (!isOrbiting) {
                // Calculate rotated camera offset based on character's rotation
                const rotatedOffset = cameraOffset.current.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), nick.current.rotation.y)
                camera.position.copy(characterPosition).add(rotatedOffset)
                camera.lookAt(characterPosition)
            } 
            orbitControlsRef.current.target.copy(characterPosition) // Set the target to the character's position
        }
    })

    return (
        <>
            <RigidBody gravityScale={0} colliders={false} lockRotations ref={rb}>
                <OrbitControls
                    ref={orbitControlsRef} // Attach the ref to OrbitControls
                    onStart={() => setIsOrbiting(true)} 
                    onEnd={() => setIsOrbiting(false)} 
                    enableZoom={false}
                />
                <group ref={container}>
                    <group ref={nick}>
                        <Nick position={[0, -0.975, 0]} scale={1} animation={animation} />
                    </group>
                </group>
                <CapsuleCollider ref={capsuleColliderRef} position={[0, -0.1, 0]} args={[0.45, 0.42]} />
            </RigidBody>
        </>
    )
}