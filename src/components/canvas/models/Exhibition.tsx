import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { RigidBody } from '@react-three/rapier'

type GLTFResult = GLTF & {
  nodes: {
    Witch_01_Linum_low: THREE.Mesh
    ['art_2_Material_#32288_0']: THREE.Mesh
    ['art1_Material_#32285_0']: THREE.Mesh
    ['art3_Material_#32286_0']: THREE.Mesh
    ['base_Material_#32290_0']: THREE.Mesh
    ['base_bottom_Material_#32289_0']: THREE.Mesh
    ['beamlights_Material_#32274_0']: THREE.Mesh
    ['ceiling_props_Material_#32277_0']: THREE.Mesh
    ['concrete_Material_#32275_0']: THREE.Mesh
    ['doors_Material_#32272_0']: THREE.Mesh
    ['floor_Material_#32287_0']: THREE.Mesh
    ['roof_Material_#32278_0']: THREE.Mesh
    ['roofrack_A_Material_#32269_0']: THREE.Mesh
    ['roofrack_B_Material_#32282_0']: THREE.Mesh
    ['structural_Material_#32273_0']: THREE.Mesh
    ['table001_Material_#32407_0']: THREE.Mesh
    ['table004_Material_#32284_0']: THREE.Mesh
    ['wall_props_Material_#32268_0']: THREE.Mesh
    ['walls_A_Material_#32281_0']: THREE.Mesh
    ['walls_B_Material_#32280_0']: THREE.Mesh
    ['walls_C_Material_#32270_0']: THREE.Mesh
    ['windowframes_Material_#32279_0']: THREE.Mesh
  }
  materials: {
    ['Material.004']: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    Material_32290: THREE.MeshBasicMaterial
    Material_32289: THREE.MeshBasicMaterial
    Material_32274: THREE.MeshBasicMaterial
    Material_32277: THREE.MeshBasicMaterial
    Material_32275: THREE.MeshBasicMaterial
    Material_32272: THREE.MeshBasicMaterial
    Material_32287: THREE.MeshBasicMaterial
    Material_32278: THREE.MeshBasicMaterial
    Material_32269: THREE.MeshBasicMaterial
    Material_32282: THREE.MeshBasicMaterial
    Material_32273: THREE.MeshBasicMaterial
    Material_32407: THREE.MeshBasicMaterial
    Material_32284: THREE.MeshBasicMaterial
    Material_32268: THREE.MeshBasicMaterial
    Material_32281: THREE.MeshBasicMaterial
    Material_32280: THREE.MeshBasicMaterial
    Material_32270: THREE.MeshBasicMaterial
    Material_32279: THREE.MeshBasicMaterial
  }
}

export function Exhibition(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Exhibition-transformed.glb') as GLTFResult
  return (
    <RigidBody type = "fixed" colliders = "trimesh">
      <group {...props} dispose={null}>
        <mesh geometry={nodes.Witch_01_Linum_low.geometry} material={materials['Material.004']} position={[9.187, 1.694, 7.09]} rotation={[Math.PI / 2, 0, 0]} scale={[2.708, 0.5, 2.708]} />
        <mesh geometry={nodes['art_2_Material_#32288_0'].geometry} material={materials['Material.001']} position={[-12.408, 2.981, 2.212]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.01} />
        <mesh geometry={nodes['art1_Material_#32285_0'].geometry} material={materials['Material.002']} position={[-12.408, 2.981, 2.212]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.01} />
        <mesh geometry={nodes['art3_Material_#32286_0'].geometry} material={materials['Material.003']} position={[-12.408, 2.981, 2.212]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.01} />
        <mesh geometry={nodes['base_Material_#32290_0'].geometry} material={materials.Material_32290} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['base_bottom_Material_#32289_0'].geometry} material={materials.Material_32289} position={[0.29, -2.796, 0.152]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['beamlights_Material_#32274_0'].geometry} material={materials.Material_32274} position={[4.987, 5.525, -3.449]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['ceiling_props_Material_#32277_0'].geometry} material={materials.Material_32277} position={[7.045, 2.069, -0.389]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['concrete_Material_#32275_0'].geometry} material={materials.Material_32275} position={[10.867, -11.391, 1.407]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['doors_Material_#32272_0'].geometry} material={materials.Material_32272} position={[-7.965, 0.038, 2.346]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['floor_Material_#32287_0'].geometry} material={materials.Material_32287} position={[10.867, -11.239, 1.407]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['roof_Material_#32278_0'].geometry} material={materials.Material_32278} position={[10.881, -11.239, 1.407]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['roofrack_A_Material_#32269_0'].geometry} material={materials.Material_32269} position={[1.6, -0.038, 3.409]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['roofrack_B_Material_#32282_0'].geometry} material={materials.Material_32282} position={[-0.804, 3.262, 7.256]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['structural_Material_#32273_0'].geometry} material={materials.Material_32273} position={[-0.804, 3.262, 7.256]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['table001_Material_#32407_0'].geometry} material={materials.Material_32407} position={[8.516, 1.096, -0.466]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['table004_Material_#32284_0'].geometry} material={materials.Material_32284} position={[-8.158, 1.096, -3.222]} rotation={[-Math.PI / 2, 0, -2.241]} scale={0.01} />
        <mesh geometry={nodes['wall_props_Material_#32268_0'].geometry} material={materials.Material_32268} position={[-4.352, -0.012, 3.753]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['walls_A_Material_#32281_0'].geometry} material={materials.Material_32281} position={[10.867, -11.239, 1.407]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['walls_B_Material_#32280_0'].geometry} material={materials.Material_32280} position={[10.867, -11.239, 1.407]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['walls_C_Material_#32270_0'].geometry} material={materials.Material_32270} position={[10.867, -11.239, 1.407]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes['windowframes_Material_#32279_0'].geometry} material={materials.Material_32279} position={[-0.804, 3.262, 7.256]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </RigidBody>
  )
}
