import { useEffect, useState } from "react";
import { Guard } from "@/components/canvas/models/Guard";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useGuardContext } from "./GuardContext";
import { useCharacterContext } from "./CharacterContext";
import { degToRad } from "three/src/math/MathUtils";

const normalizeAngle = (angle: number) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start: number, end: number, t: number) => {
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

export const GuardController = () => {
  const { WALK_SPEED, ROTATION_SPEED, PUNCH_DISTANCE } = useControls(
    "Guard Control",
    {
      WALK_SPEED: { value: 1, min: 0.1, max: 4, step: 0.1 },
      ROTATION_SPEED: {
        value: degToRad(9),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1),
      },
      PUNCH_DISTANCE: { value: 0.1, min: 0.1, max: 10, step: 0.1 },
    },
    { collapsed: true } // Collapse the control group to hide it initially
  );

  const { guardRef, guardColliderRef, animation, setAnimation, guard, punches, setPunches } = useGuardContext();
  const { nick, setCharacterAnimation, characterAnimation } = useCharacterContext();

  const [punchInterval, setPunchInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (punchInterval) {
        clearInterval(punchInterval);
        console.log("Interval cleared");
      }
    };
  }, [punchInterval]);

  useFrame(() => {
    if (guardRef.current && nick.current) {
      const initialYPosition = guardRef.current.translation().y;

      const guardPosition = guardRef.current.translation();
      const characterPosition = new THREE.Vector3();
      nick.current.getWorldPosition(characterPosition);

      const guardVector = new THREE.Vector3(guardPosition.x, guardPosition.y, guardPosition.z - 3.5);
      const characterVector = new THREE.Vector3(characterPosition.x, characterPosition.y, characterPosition.z);

      const direction = new THREE.Vector3().subVectors(characterVector, guardVector);
      direction.y = 0;
      direction.normalize();

      const velocity = direction.clone().multiplyScalar(WALK_SPEED);
      const distanceToCharacter = guardVector.distanceTo(characterVector);

      guardRef.current.setLinvel(distanceToCharacter > PUNCH_DISTANCE ? velocity : new THREE.Vector3(0, 0, 0), true);

      const guardRotationTarget = Math.atan2(direction.x, direction.z);
      guardRef.current.setRotation({ x: 0, y: lerpAngle(guardRef.current.rotation().y, guardRotationTarget, ROTATION_SPEED), z: 0 });

      guardRef.current.setTranslation({ x: guardPosition.x, y: initialYPosition, z: guardPosition.z }, true);

      if (guardColliderRef.current) {
        guardColliderRef.current.setTranslation({ x: guardPosition.x, y: initialYPosition - 2, z: guardPosition.z }, true);
      }

      if (distanceToCharacter < PUNCH_DISTANCE) {

        if (!punchInterval) {
          const intervalId = setInterval(() => {
            if(animation !== "idle") {
              setPunches((prevPunches) => {
                const newPunches = prevPunches + 1;
                console.log("Punches updated: ${newPunches}");
                
                if (newPunches >= 10) {
                  // Stop the interval and clear state
                  clearInterval(intervalId);
                  setPunchInterval(null);
                  
                  // Set dying animation and reload page after 5.8 seconds
                  setAnimation("idle");
                  setCharacterAnimation('dying');
                  setTimeout(() => {
                    window.location.reload();
                  }, 5300);

                  return newPunches;
                }

                // Trigger hit reaction animation if punches are less than 10
                if (newPunches < 10) {
                  setAnimation("punch");
                  setCharacterAnimation("hit reaction");
                  setTimeout(() => {
                    setCharacterAnimation("idle");
                  }, 500);
                }

                return newPunches;
              });
            }  
          }, 1000);
          setPunchInterval(intervalId);
          console.log("Punch interval started");
        }
      } else if(characterAnimation !== "dying") {
        setAnimation("walk");
        if (punchInterval) {
          clearInterval(punchInterval);
          setPunchInterval(null);
          console.log("Punch interval cleared");
        }
      }
    }
  });

  return (
    <RigidBody gravityScale={0} lockRotations ref={guardRef}>
      <group ref={guard}>
        <Guard position={[0, -0.975, -5]} scale={1.2} animation={animation} />
      </group>
      <CapsuleCollider ref={guardColliderRef} position={[0, -0.1, -5]} args={[0.45, 0.42]} name="GuardCollider" />
    </RigidBody>
  );
};