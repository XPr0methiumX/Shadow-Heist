import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'

type ActionName = '2341837530064_TempMotion'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
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
    CC_Base_BoneRoot_01: THREE.Bone
  }
  materials: {
    Std_Tongue: THREE.MeshStandardMaterial
    Std_Skin_Head: THREE.MeshStandardMaterial
    Std_Cornea_R: THREE.MeshStandardMaterial
    Std_Eye_L: THREE.MeshStandardMaterial
    Std_Cornea_L: THREE.MeshStandardMaterial
    Std_Skin_Body: THREE.MeshStandardMaterial
    Std_Skin_Arm: THREE.MeshStandardMaterial
    Std_Skin_Leg: THREE.MeshStandardMaterial
    Std_Nails: THREE.MeshStandardMaterial
    Std_Eyelash: THREE.MeshStandardMaterial
    Std_Upper_Teeth: THREE.MeshStandardMaterial
    Std_Lower_Teeth: THREE.MeshStandardMaterial
    Std_Eye_R: THREE.MeshStandardMaterial
    Biker_Jeans: THREE.MeshStandardMaterial
    _031: THREE.MeshStandardMaterial
    _032: THREE.MeshStandardMaterial
    ThickerStrands_Transparency: THREE.MeshStandardMaterial
    ThinnerStrands_Transparency: THREE.MeshStandardMaterial
    HairCap_Transparency: THREE.MeshStandardMaterial
    _001: THREE.MeshStandardMaterial
    _002: THREE.MeshStandardMaterial
    _011: THREE.MeshStandardMaterial
    _012: THREE.MeshStandardMaterial
    _041: THREE.MeshStandardMaterial
    _042: THREE.MeshStandardMaterial
    _021: THREE.MeshStandardMaterial
    _022: THREE.MeshStandardMaterial
    Punk_Strap_Boots: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Nick(props: JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>()
  const { scene, animations } = useGLTF('/models/Main.glb')
  animations[0].name = 'idle'
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    actions["idle"].reset().play()
  }, [actions])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="0" />
        <group name="1" />
        <group name="2" />
        <group name="3" />
        <group name="4" />
        <group name="5" />
        <group name="6" />
        <group name="7" />
        <group name="8" />
        <group name="9" />
        <group name="10" />
        <group name="11" />
        <group name="12" />
        <group name="MEN_CYBERPUNK_WARRIOR_VX-6534" scale={0.01}>
          <group name="RootNode">
            <group name="Skeleton">
              <primitive object={nodes.CC_Base_BoneRoot_01} />
              <skinnedMesh name="0001" geometry={nodes['0001'].geometry} material={materials.Std_Tongue} skeleton={nodes['0001'].skeleton} morphTargetDictionary={nodes['0001'].morphTargetDictionary} morphTargetInfluences={nodes['0001'].morphTargetInfluences} />
              <skinnedMesh name="1001" geometry={nodes['1001'].geometry} material={materials.Std_Skin_Head} skeleton={nodes['1001'].skeleton} morphTargetDictionary={nodes['1001'].morphTargetDictionary} morphTargetInfluences={nodes['1001'].morphTargetInfluences} />
              <skinnedMesh name="10001" geometry={nodes['10001'].geometry} material={materials.Std_Cornea_R} skeleton={nodes['10001'].skeleton} morphTargetDictionary={nodes['10001'].morphTargetDictionary} morphTargetInfluences={nodes['10001'].morphTargetInfluences} />
              <skinnedMesh name="11001" geometry={nodes['11001'].geometry} material={materials.Std_Eye_L} skeleton={nodes['11001'].skeleton} morphTargetDictionary={nodes['11001'].morphTargetDictionary} morphTargetInfluences={nodes['11001'].morphTargetInfluences} />
              <skinnedMesh name="12001" geometry={nodes['12001'].geometry} material={materials.Std_Cornea_L} skeleton={nodes['12001'].skeleton} morphTargetDictionary={nodes['12001'].morphTargetDictionary} morphTargetInfluences={nodes['12001'].morphTargetInfluences} />
              <skinnedMesh name="2001" geometry={nodes['2001'].geometry} material={materials.Std_Skin_Body} skeleton={nodes['2001'].skeleton} morphTargetDictionary={nodes['2001'].morphTargetDictionary} morphTargetInfluences={nodes['2001'].morphTargetInfluences} />
              <skinnedMesh name="3001" geometry={nodes['3001'].geometry} material={materials.Std_Skin_Arm} skeleton={nodes['3001'].skeleton} morphTargetDictionary={nodes['3001'].morphTargetDictionary} morphTargetInfluences={nodes['3001'].morphTargetInfluences} />
              <skinnedMesh name="4001" geometry={nodes['4001'].geometry} material={materials.Std_Skin_Leg} skeleton={nodes['4001'].skeleton} morphTargetDictionary={nodes['4001'].morphTargetDictionary} morphTargetInfluences={nodes['4001'].morphTargetInfluences} />
              <skinnedMesh name="5001" geometry={nodes['5001'].geometry} material={materials.Std_Nails} skeleton={nodes['5001'].skeleton} morphTargetDictionary={nodes['5001'].morphTargetDictionary} morphTargetInfluences={nodes['5001'].morphTargetInfluences} />
              <skinnedMesh name="6001" geometry={nodes['6001'].geometry} material={materials.Std_Eyelash} skeleton={nodes['6001'].skeleton} morphTargetDictionary={nodes['6001'].morphTargetDictionary} morphTargetInfluences={nodes['6001'].morphTargetInfluences} />
              <skinnedMesh name="7001" geometry={nodes['7001'].geometry} material={materials.Std_Upper_Teeth} skeleton={nodes['7001'].skeleton} morphTargetDictionary={nodes['7001'].morphTargetDictionary} morphTargetInfluences={nodes['7001'].morphTargetInfluences} />
              <skinnedMesh name="8001" geometry={nodes['8001'].geometry} material={materials.Std_Lower_Teeth} skeleton={nodes['8001'].skeleton} morphTargetDictionary={nodes['8001'].morphTargetDictionary} morphTargetInfluences={nodes['8001'].morphTargetInfluences} />
              <skinnedMesh name="9001" geometry={nodes['9001'].geometry} material={materials.Std_Eye_R} skeleton={nodes['9001'].skeleton} morphTargetDictionary={nodes['9001'].morphTargetDictionary} morphTargetInfluences={nodes['9001'].morphTargetInfluences} />
              <skinnedMesh name="Biker_Jeans_0_Biker_Jeans_0" geometry={nodes.Biker_Jeans_0_Biker_Jeans_0.geometry} material={materials.Biker_Jeans} skeleton={nodes.Biker_Jeans_0_Biker_Jeans_0.skeleton} />
              <skinnedMesh name="CUELLO__031_0" geometry={nodes.CUELLO__031_0.geometry} material={materials._031} skeleton={nodes.CUELLO__031_0.skeleton} />
              <skinnedMesh name="CUELLO__032_0" geometry={nodes.CUELLO__032_0.geometry} material={materials._032} skeleton={nodes.CUELLO__032_0.skeleton} />
              <skinnedMesh name="G8MLincolnHair_Shape_0_ThickerStrands_Transparency_0" geometry={nodes.G8MLincolnHair_Shape_0_ThickerStrands_Transparency_0.geometry} material={materials.ThickerStrands_Transparency} skeleton={nodes.G8MLincolnHair_Shape_0_ThickerStrands_Transparency_0.skeleton} />
              <skinnedMesh name="G8MLincolnHair_Shape_0_ThinnerStrands_Transparency_0" geometry={nodes.G8MLincolnHair_Shape_0_ThinnerStrands_Transparency_0.geometry} material={materials.ThinnerStrands_Transparency} skeleton={nodes.G8MLincolnHair_Shape_0_ThinnerStrands_Transparency_0.skeleton} />
              <skinnedMesh name="G8MSkullCap_Shape_0_HairCap_Transparency_0" geometry={nodes.G8MSkullCap_Shape_0_HairCap_Transparency_0.geometry} material={materials.HairCap_Transparency} skeleton={nodes.G8MSkullCap_Shape_0_HairCap_Transparency_0.skeleton} />
              <skinnedMesh name="PANEL_1__001_0" geometry={nodes.PANEL_1__001_0.geometry} material={materials._001} skeleton={nodes.PANEL_1__001_0.skeleton} />
              <skinnedMesh name="PANEL_1__002_0" geometry={nodes.PANEL_1__002_0.geometry} material={materials._002} skeleton={nodes.PANEL_1__002_0.skeleton} />
              <skinnedMesh name="PANEL_2__011_0" geometry={nodes.PANEL_2__011_0.geometry} material={materials._011} skeleton={nodes.PANEL_2__011_0.skeleton} />
              <skinnedMesh name="PANEL_2__012_0" geometry={nodes.PANEL_2__012_0.geometry} material={materials._012} skeleton={nodes.PANEL_2__012_0.skeleton} />
              <skinnedMesh name="PARTE_BODY_0__041_0" geometry={nodes.PARTE_BODY_0__041_0.geometry} material={materials._041} skeleton={nodes.PARTE_BODY_0__041_0.skeleton} />
              <skinnedMesh name="PARTE_BODY_0__042_0" geometry={nodes.PARTE_BODY_0__042_0.geometry} material={materials._042} skeleton={nodes.PARTE_BODY_0__042_0.skeleton} />
              <skinnedMesh name="PARTE_CARA_0__021_0" geometry={nodes.PARTE_CARA_0__021_0.geometry} material={materials._021} skeleton={nodes.PARTE_CARA_0__021_0.skeleton} />
              <skinnedMesh name="PARTE_CARA_0__022_0" geometry={nodes.PARTE_CARA_0__022_0.geometry} material={materials._022} skeleton={nodes.PARTE_CARA_0__022_0.skeleton} />
              <skinnedMesh name="Punk_Strap_Boots_0_Punk_Strap_Boots_0" geometry={nodes.Punk_Strap_Boots_0_Punk_Strap_Boots_0.geometry} material={materials.Punk_Strap_Boots} skeleton={nodes.Punk_Strap_Boots_0_Punk_Strap_Boots_0.skeleton} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}