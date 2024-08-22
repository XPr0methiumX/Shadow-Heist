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
  const { guardColliderRef: capsuleColliderRef } = useGuardContext();

  // Timeout for removal after 3 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsActive(false);
    }, 3000); 

    return () => clearTimeout(timeoutId);
  }, []);

  useFrame(() => {
    if (rb.current && capsuleColliderRef.current && isActive) {
      const projectilePosition = rb.current.translation();
      const colliderPosition = capsuleColliderRef.current.translation();

      const projectileVec = new THREE.Vector3(projectilePosition.x, projectilePosition.y, projectilePosition.z);
      const colliderVec = new THREE.Vector3(colliderPosition.x, colliderPosition.y, colliderPosition.z);

      const distance = projectileVec.distanceTo(colliderVec);

      if (distance < 0.8) {
        setHasHit(true)
        setIsActive(false); // Remove on hit
        onHit(); 
      }
    }
  });

  return (
    // Conditionally render based on isActive
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
