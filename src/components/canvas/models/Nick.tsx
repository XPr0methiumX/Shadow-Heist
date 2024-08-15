import * as THREE from 'three'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useGraph, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'


type ActionName = 'idle' | '180 turn' | 'dying' | 'hit reaction' | 'jump' | 'leftturn' | 'rightturn' | 'run' | 'walking' | 'gun shoot'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Object_0: THREE.Mesh
    Object_0_1: THREE.Mesh
    Object_0_2: THREE.Mesh
    Object_0_3: THREE.Mesh
    Object_0_4: THREE.Mesh
    Object_0_5: THREE.Mesh
    Object_0_6: THREE.Mesh
    Object_0_7: THREE.Mesh
    Object_0_8: THREE.Mesh
    Object_0_9: THREE.Mesh
    ['0001']: THREE.SkinnedMesh
    ['1001']: THREE.SkinnedMesh
    ['10001']: THREE.SkinnedMesh
    ['11001']: THREE.SkinnedMesh
    ['12001']: THREE.SkinnedMesh
    ['2001']: THREE.SkinnedMesh
    ['3001']: THREE.SkinnedMesh
    ['4001']: THREE.SkinnedMesh
    ['5001']: THREE.SkinnedMesh
    ['6001']: THREE.SkinnedMesh
    ['7001']: THREE.SkinnedMesh
    ['8001']: THREE.SkinnedMesh
    ['9001']: THREE.SkinnedMesh
    Biker_Jeans_0_Biker_Jeans_0: THREE.SkinnedMesh
    CUELLO__031_0: THREE.SkinnedMesh
    CUELLO__032_0: THREE.SkinnedMesh
    G8MLincolnHair_Shape_0_ThickerStrands_Transparency_0: THREE.SkinnedMesh
    G8MLincolnHair_Shape_0_ThinnerStrands_Transparency_0: THREE.SkinnedMesh
    G8MSkullCap_Shape_0_HairCap_Transparency_0: THREE.SkinnedMesh
    PANEL_1__001_0: THREE.SkinnedMesh
    PANEL_1__002_0: THREE.SkinnedMesh
    PANEL_2__011_0: THREE.SkinnedMesh
    PANEL_2__012_0: THREE.SkinnedMesh
    PARTE_BODY_0__041_0: THREE.SkinnedMesh
    PARTE_BODY_0__042_0: THREE.SkinnedMesh
    PARTE_CARA_0__021_0: THREE.SkinnedMesh
    PARTE_CARA_0__022_0: THREE.SkinnedMesh
    Punk_Strap_Boots_0_Punk_Strap_Boots_0: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    gun_bottom: THREE.MeshStandardMaterial
    grip_and_front: THREE.MeshStandardMaterial
    material: THREE.MeshStandardMaterial
    darker_material: THREE.MeshStandardMaterial
    lambert2SG: THREE.MeshStandardMaterial
    new_lazer_and_signt_material: THREE.MeshStandardMaterial
    trigger_and_switcch: THREE.MeshStandardMaterial
    gun_top_and_bottons: THREE.MeshStandardMaterial
    tapes: THREE.MeshStandardMaterial
    nozzle: THREE.MeshStandardMaterial
    ['Material.015']: THREE.MeshStandardMaterial
    ['Material.016']: THREE.MeshStandardMaterial
    ['Material.023']: THREE.MeshStandardMaterial
    ['Material.024']: THREE.MeshStandardMaterial
    ['Material.025']: THREE.MeshStandardMaterial
    ['Material.026']: THREE.MeshStandardMaterial
    ['Material.018']: THREE.MeshStandardMaterial
    ['Material.017']: THREE.MeshStandardMaterial
    ['Material.019']: THREE.MeshStandardMaterial
    ['Material.020']: THREE.MeshStandardMaterial
    ['Material.021']: THREE.MeshStandardMaterial
    ['Material.022']: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
    ['Material.005']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.007']: THREE.MeshStandardMaterial
    ['Material.008']: THREE.MeshStandardMaterial
    ['Material.009']: THREE.MeshStandardMaterial
    ['Material.010']: THREE.MeshStandardMaterial
    ['Material.011']: THREE.MeshStandardMaterial
    ['Material.012']: THREE.MeshStandardMaterial
    ['Material.013']: THREE.MeshStandardMaterial
    ['Material.014']: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}


export function Nick(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { scene, animations } = useGLTF('/models/Main-transformed.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const [movementState, setMovementState] = useState<'idle' | 'walking' | 'run' | 'rightturn' | 'leftturn'>('idle');

  // Flag to track if a turn animation is currently playing
  const [isTurning, setIsTurning] = useState(false);

  // Get the camera from the Three.js scene
  const { camera } = useThree();

  // Create a ref for the camera target
  const cameraTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    group.current.rotation.y = Math.PI;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'w') {
        setMovementState(event.shiftKey ? 'run' : 'walking');
      }

      if (event.key.toLowerCase() === 'd' && !isTurning) {
        setMovementState('rightturn');
        setIsTurning(true);
      }

      if (event.key.toLowerCase() === 'a' && !isTurning) {
        setMovementState('leftturn');
        setIsTurning(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'w') {
        setMovementState('idle');
      }

      // Do not reset the movement state on key up for 'a' or 'd'
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isTurning]);

  useEffect(() => {
    // Stop all actions
    Object.values(actions).forEach(action => action.stop());

    // Play the current action
    const currentAction = actions[movementState === 'run' ? 'run' : movementState];
    if (currentAction) {
      currentAction.reset().fadeIn(0.2).play();

      // If the action is a turn, set the duration
      if (movementState === 'rightturn' || movementState === 'leftturn') {
        currentAction.setLoop(THREE.LoopOnce, 1); // Play once
        currentAction.clampWhenFinished = true; // Clamp to the last frame
      }
    }

    return () => {
      if (currentAction) {
        currentAction.fadeOut(0.2);
      }
    };
  }, [actions, movementState]);

  useFrame(() => {
    if (group.current) {
      switch (movementState) {
        case 'walking':
          group.current.position.z -= 0.01;
          break;
        case 'run':
          group.current.position.z -= 0.03;
          break;
      }

      // Update camera target to follow the character
      cameraTarget.current.copy(group.current.position);
      cameraTarget.current.y += 1.5; // Adjust this value for camera height

      // Smoothly move the camera to follow the target
      camera.position.lerp(cameraTarget.current, 0.1);
      camera.position.z = group.current.position.z + 2.8; // Keep the camera behind the character
      camera.position.x = group.current.position.x; // Align camera with character's x position

      // Make the camera look at the character
      camera.lookAt(cameraTarget.current);
    }

    // Check if the current action is a turn animation and reset state if finished
    const currentAction = actions[movementState];
    if (isTurning && currentAction && currentAction.isRunning() === false) {
      setIsTurning(false); // Reset the turning flag
      setMovementState('idle'); // Set to idle after the turn
    }
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <skinnedMesh name="0001" geometry={nodes['0001'].geometry} material={materials['Material.015']} skeleton={nodes['0001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="1001" geometry={nodes['1001'].geometry} material={materials['Material.016']} skeleton={nodes['1001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="10001" geometry={nodes['10001'].geometry} material={materials['Material.023']} skeleton={nodes['10001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="11001" geometry={nodes['11001'].geometry} material={materials['Material.024']} skeleton={nodes['11001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="12001" geometry={nodes['12001'].geometry} material={materials['Material.025']} skeleton={nodes['12001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="2001" geometry={nodes['2001'].geometry} material={materials['Material.026']} skeleton={nodes['2001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="3001" geometry={nodes['3001'].geometry} material={materials['Material.018']} skeleton={nodes['3001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="4001" geometry={nodes['4001'].geometry} material={materials['Material.017']} skeleton={nodes['4001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="5001" geometry={nodes['5001'].geometry} material={materials['Material.018']} skeleton={nodes['5001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="6001" geometry={nodes['6001'].geometry} material={materials['Material.019']} skeleton={nodes['6001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="7001" geometry={nodes['7001'].geometry} material={materials['Material.020']} skeleton={nodes['7001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="8001" geometry={nodes['8001'].geometry} material={materials['Material.021']} skeleton={nodes['8001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="9001" geometry={nodes['9001'].geometry} material={materials['Material.022']} skeleton={nodes['9001'].skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="Biker_Jeans_0_Biker_Jeans_0" geometry={nodes.Biker_Jeans_0_Biker_Jeans_0.geometry} material={materials.Material} skeleton={nodes.Biker_Jeans_0_Biker_Jeans_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="CUELLO__031_0" geometry={nodes.CUELLO__031_0.geometry} material={materials['Material.004']} skeleton={nodes.CUELLO__031_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="CUELLO__032_0" geometry={nodes.CUELLO__032_0.geometry} material={materials['Material.005']} skeleton={nodes.CUELLO__032_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="G8MLincolnHair_Shape_0_ThickerStrands_Transparency_0" geometry={nodes.G8MLincolnHair_Shape_0_ThickerStrands_Transparency_0.geometry} material={materials['Material.002']} skeleton={nodes.G8MLincolnHair_Shape_0_ThickerStrands_Transparency_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="G8MLincolnHair_Shape_0_ThinnerStrands_Transparency_0" geometry={nodes.G8MLincolnHair_Shape_0_ThinnerStrands_Transparency_0.geometry} material={materials['Material.003']} skeleton={nodes.G8MLincolnHair_Shape_0_ThinnerStrands_Transparency_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="G8MSkullCap_Shape_0_HairCap_Transparency_0" geometry={nodes.G8MSkullCap_Shape_0_HairCap_Transparency_0.geometry} material={materials['Material.023']} skeleton={nodes.G8MSkullCap_Shape_0_HairCap_Transparency_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="PANEL_1__001_0" geometry={nodes.PANEL_1__001_0.geometry} material={materials['Material.007']} skeleton={nodes.PANEL_1__001_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="PANEL_1__002_0" geometry={nodes.PANEL_1__002_0.geometry} material={materials['Material.008']} skeleton={nodes.PANEL_1__002_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="PANEL_2__011_0" geometry={nodes.PANEL_2__011_0.geometry} material={materials['Material.009']} skeleton={nodes.PANEL_2__011_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="PANEL_2__012_0" geometry={nodes.PANEL_2__012_0.geometry} material={materials['Material.010']} skeleton={nodes.PANEL_2__012_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="PARTE_BODY_0__041_0" geometry={nodes.PARTE_BODY_0__041_0.geometry} material={materials['Material.011']} skeleton={nodes.PARTE_BODY_0__041_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="PARTE_BODY_0__042_0" geometry={nodes.PARTE_BODY_0__042_0.geometry} material={materials['Material.012']} skeleton={nodes.PARTE_BODY_0__042_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="PARTE_CARA_0__021_0" geometry={nodes.PARTE_CARA_0__021_0.geometry} material={materials['Material.013']} skeleton={nodes.PARTE_CARA_0__021_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="PARTE_CARA_0__022_0" geometry={nodes.PARTE_CARA_0__022_0.geometry} material={materials['Material.014']} skeleton={nodes.PARTE_CARA_0__022_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
        <skinnedMesh name="Punk_Strap_Boots_0_Punk_Strap_Boots_0" geometry={nodes.Punk_Strap_Boots_0_Punk_Strap_Boots_0.geometry} material={materials['Material.001']} skeleton={nodes.Punk_Strap_Boots_0_Punk_Strap_Boots_0.skeleton} position={[0.006, 0.007, -0.006]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
    </group>
  )
}