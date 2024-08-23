import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGuardContext } from './GuardContext';
import * as THREE from 'three';

interface ProjectileProps {
  position: [number, number, number];
  velocity: [number, number, number];
  onHit: () => void;
}

export const Projectile = ({ position, velocity, onHit }: ProjectileProps) => {
  const rb = useRef(null);
  const [hasHit, setHasHit] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const { guardColliderRef } = useGuardContext();

  useEffect(() => {
    // Timeout for removal after 3 seconds
    const timeoutId = setTimeout(() => {
      setIsActive(false);
    }, 3000); 

    return () => clearTimeout(timeoutId);
  }, []);

  useFrame(() => {
    const collider = guardColliderRef.current;
    if (rb.current && collider && isActive && !hasHit) {
      const projectilePosition = rb.current.translation();
      const colliderPosition = collider.translation();

      const distance = new THREE.Vector3(
        projectilePosition.x - colliderPosition.x,
        projectilePosition.y - colliderPosition.y,
        projectilePosition.z - colliderPosition.z
      ).length();

      if (distance < 0.8) {
        setHasHit(true);
        setIsActive(false); // Safely deactivate the projectile
        onHit(); 
      }
    }
  });

  return (
    isActive && (
      <RigidBody
        ref={rb}
        position={position}
        linearVelocity={velocity}
        colliders="cuboid"
        gravityScale={0}
        name="Projectile"
      />
    )
  );
};
