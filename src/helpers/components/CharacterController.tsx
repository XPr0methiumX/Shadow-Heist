import { Nick } from "@/components/canvas/models/Nick"
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
    const [animation, setAnimation] = useState("idle")
    const [isRightClick, setIsRightClick] = useState(false)
    const [mousePosition, setMousePosition] = useState(new THREE.Vector2())

    // Mouse event handlers
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (isRightClick) {
                setMousePosition(new THREE.Vector2(
                    (event.clientX / window.innerWidth) * 2 - 1,
                    -(event.clientY / window.innerHeight) * 2 + 1
                ));
            }
        }

        const handleMouseDown = (event) => {
            if (event.button === 2) { // Right click
                setIsRightClick(true);
            }
        }

        const handleMouseUp = (event) => {
            if (event.button === 2) { // Right click
                setIsRightClick(false);
            }
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isRightClick]);

    useFrame(({ camera }) => {
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
                const characterRotationTarget = Math.atan2(-movement.x, -movement.z)
                nick.current.rotation.y = lerpAngle(nick.current.rotation.y, characterRotationTarget, ROTATION_SPEED)
                capsuleColliderRef.current.setRotation({ x: 0, y: nick.current.rotation.y, z: 0 })
            }

            const nickWorldPosition = new THREE.Vector3()
            nick.current.getWorldPosition(nickWorldPosition)
            capsuleColliderRef.current.setTranslation(nickWorldPosition)

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
            const defaultCameraOffset = new THREE.Vector3(0, 1.5, 5); // Normal camera offset
            const zoomedCameraOffset = new THREE.Vector3(0, 0.5, 5); // Lower zoomed-in camera offset

            if (isRightClick) {
                // Zoom in towards the character
                camera.position.lerp(characterPosition.clone().add(zoomedCameraOffset), 0.1);
                
                // Aim based on mouse movement
                const direction = new THREE.Vector3(mousePosition.x, 0, mousePosition.y);
                direction.unproject(camera);
                const aimTarget = direction.clone().sub(camera.position).normalize();
                camera.position.add(aimTarget.multiplyScalar(0.1)); // Adjust this scalar for sensitivity
            } else {
                // Return to normal camera position
                camera.position.lerp(characterPosition.clone().add(defaultCameraOffset), 0.1);
            }
            camera.lookAt(characterPosition);
        }
    })

    return (
        <RigidBody gravityScale={0} colliders={false} lockRotations ref={rb}>
            <group ref={container}>
                <group ref={nick}>
                    <Nick position={[0, -0.975, 0]} scale={1} animation={animation} />
                </group>
            </group>
            <CapsuleCollider ref={capsuleColliderRef} position={[0,-0.1,0]} args={[0.45, 0.42]} />
        </RigidBody>
    )
}