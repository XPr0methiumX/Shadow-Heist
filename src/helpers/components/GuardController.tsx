import { Guard } from "@/components/canvas/models/Guard"
import { RigidBody, CapsuleCollider } from "@react-three/rapier"
import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
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

export const GuardController = () => {
    const { WALK_SPEED, ROTATION_SPEED } = useControls("Guard Control", {
        WALK_SPEED: { value: 1, min: 0.1, max: 4, step: 0.1 },
        ROTATION_SPEED: {
            value: degToRad(9), // Increased rotation speed for faster turning
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
            const speed = WALK_SPEED

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
                nick.current.rotation.y = lerpAngle(nick.current.rotation.y, characterRotationTarget, ROTATION_SPEED)

                // Update capsule collider rotation
                capsuleColliderRef.current.setRotation({ x: 0, y: nick.current.rotation.y, z: 0 })
            }

            // Update capsule collider position
            const nickWorldPosition = new THREE.Vector3()
            nick.current.getWorldPosition(nickWorldPosition)
            capsuleColliderRef.current.setTranslation(nickWorldPosition)

            // Set animation based on speed and movement
            if (vel.length() === 0) {
                setAnimation("idle")
            } else {
                setAnimation("walk")
            }
            
            // CAMERA
            // const characterPosition = new THREE.Vector3()
            // container.current.getWorldPosition(characterPosition)
            // const cameraOffset = new THREE.Vector3(0, 1.5, 5)
            // camera.position.lerp(characterPosition.clone().add(cameraOffset), 0.1)
            // camera.lookAt(characterPosition)
        }
    })

    return (
        <RigidBody colliders={false} lockRotations ref={rb}>
            <group ref={container}>
                <group ref={nick}>
                    <Guard position={[0, -0.975, 0]} scale={1.2} animation={animation} />
                </group>
            </group>
            <CapsuleCollider ref={capsuleColliderRef} position={[0,-0.1,0]} args={[0.45, 0.42]} />
        </RigidBody>
    )
}
