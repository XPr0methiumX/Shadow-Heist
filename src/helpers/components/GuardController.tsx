// src/helpers/components/GuardController.tsx
import { Guard } from "@/components/canvas/models/Guard";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useGuardContext } from "./GuardContext";
import { degToRad } from "three/src/math/MathUtils";
import { useKeyboardControls } from "@react-three/drei";

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
  const { WALK_SPEED, ROTATION_SPEED } = useControls("Guard Control", {
    WALK_SPEED: { value: 1, min: 0.1, max: 4, step: 0.1 },
    ROTATION_SPEED: {
      value: degToRad(9),
      min: degToRad(0.1),
      max: degToRad(5),
      step: degToRad(0.1),
    },
  });

  const { guardRef, guardColliderRef, isActive } = useGuardContext();
  const [, get] = useKeyboardControls();
  const [animation, setAnimation] = useState("idle");

  useFrame(({ camera }) => {
    if (guardRef.current) {
      const vel = new THREE.Vector3();
      const movement = new THREE.Vector3(0, 0, 0);

      // Movement logic (commented out for simplicity)
      // ...

      if (vel.length() === 0) {
        setAnimation("idle");
      } else {
        setAnimation("walk");
      }

      // CAMERA
      // ...
    }
  });

  return (
    isActive && (
    <RigidBody gravityScale={0} lockRotations ref={guardRef}>
      <group>
          <Guard position={[0, -0.975, -5]} scale={1.2} animation={animation} />
      </group>
      <CapsuleCollider ref={guardColliderRef} position={[0, -0.1, -5]} args={[0.45, 0.42]} name="GuardCollider" />
    </RigidBody>
    )
  );
};
