import { Nick } from "@/components/canvas/models/Nick"
import { RigidBody, CapsuleCollider } from "@react-three/rapier"
import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useKeyboardControls } from "@react-three/drei"
import { degToRad } from "three/src/math/MathUtils"

const normalizeAngle = (angle) => {
    while (angle > Math.PI) angle -= 2 * Math.PI
    while (angle < -Math.PI) angle += 2 * Math.PI
    return angle
}

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
        WALK_SPEED: { value: 0.9, min: 0.1, max: 4, step: 0.1 },
        RUN_SPEED: { value: 1.8, min: 0.2, max: 8, step: 0.1 },
        ROTATION_SPEED: {
            value: degToRad(1), // Increased rotation speed for faster turning
            min: degToRad(0.1),
            max: degToRad(5),
            step: degToRad(0.1),
        },
    })

    const [, get] = useKeyboardControls()
    const rb = useRef(null)
    const container = useRef(null)
    const nick = useRef(null)
    const [animation, setAnimation] = useState("idle")

    useFrame(({camera}) => {
        if (rb.current) {
            const vel = new THREE.Vector3()
            const movement = new THREE.Vector3(0, 0, 0)

            // Determine movement direction
            if (get().forward) movement.z -= 1 // Move forward
            if (get().backward) movement.z += 1 // Move backward
            if (get().left) movement.x -= 1 // Move left
            if (get().right) movement.x += 1 // Move right

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
                // Calculate target rotation
                const characterRotationTarget = Math.atan2(-movement.x, -movement.z)

                // Set rotation instantly but allow for smooth transition
                nick.current.rotation.y = lerpAngle(nick.current.rotation.y, characterRotationTarget, ROTATION_SPEED);
            }

            // Set animation based on speed and movement
            if (vel.length() === 0) {
                setAnimation("idle")
            } else if (get().run) {
                setAnimation("run")
            } else if (Math.abs(movement.x) > Math.abs(movement.z)) {
                setAnimation(movement.x < 0 ? "leftturn" : "rightturn")
            } else {
                setAnimation("walking")
            }
            
            // CAMERA
            const characterPosition = new THREE.Vector3()
            container.current.getWorldPosition(characterPosition)
            const cameraOffset = new THREE.Vector3(0, 1.5, 5)
            camera.position.lerp(characterPosition.clone().add(cameraOffset), 0.1)
            camera.lookAt(characterPosition)
        }
    })

    return (
        <RigidBody gravityScale={0} colliders={false} lockRotations ref={rb}>
            <group ref={container}>
                <group ref={nick}>
                    <Nick position={[0, -0.975, -1]} scale={1} animation={animation} />
                </group>
            </group>
            <CapsuleCollider position={[0, 0, -1]} args={[0.45, 0.52]} /> {/* Capsule collider as a child */}
        </RigidBody>
    )
}