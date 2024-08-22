import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ProjectileProps {
  position: [number, number, number];
  velocity: [number, number, number];
  onHit: () => void;
}

export const Projectile = ({ position, velocity, onHit }: ProjectileProps) => {
  const rb = useRef<any>(null);
  const [hasHit, setHasHit] = useState(false);

  useEffect(() => {
    if (rb.current) {
      // Update collision checking every frame
      const checkCollision = () => {
        if (hasHit) return; // Avoid redundant checks after hit
        
        const world = rb.current?.world;
        console.log(world)
        if (world) {
          const colliders = world.queryColliders(rb.current); // Custom function to query collisions
          console.log(colliders)
          colliders.forEach((collider: any) => {
            if (collider.name === "GuardCollider") {
              onHit();
              setHasHit(true);
            }
          });
        }
      };

      // Subscribe to frame updates
      const interval = setInterval(checkCollision, 100); // Check every 100 ms

      return () => clearInterval(interval);
    }
  }, [onHit, hasHit]);

  return (
    <RigidBody
      gravityScale={0}
      ref={rb}
      position={position}
      linearVelocity={velocity}
      colliders="cuboid"
      name="Projectile"
    >
      <mesh>
        <capsuleGeometry args={[0.1, 0.5, 8]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};
