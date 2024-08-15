import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['walls_C_Material_#32270_0']: THREE.Mesh
    ['doors_Material_#32272_0']: THREE.Mesh
    ['structural_Material_#32273_0']: THREE.Mesh
    ['roofrack_A_Material_#32269_0']: THREE.Mesh
    ['roofrack_A_Material_#32269_0_1']: THREE.Mesh
    ['beamlights_Material_#32274_0']: THREE.Mesh
    ['wall_props_Material_#32268_0']: THREE.Mesh
    ['concrete_Material_#32275_0']: THREE.Mesh
    ['ceiling_props_Material_#32277_0']: THREE.Mesh
    ['ceiling_props_Material_#32277_0_1']: THREE.Mesh
    ['roof_Material_#32278_0']: THREE.Mesh
    ['windowframes_Material_#32279_0']: THREE.Mesh
    ['walls_B_Material_#32280_0']: THREE.Mesh
    ['walls_A_Material_#32281_0']: THREE.Mesh
    ['roofrack_B_Material_#32282_0']: THREE.Mesh
    ['table001_Material_#32407_0']: THREE.Mesh
    ['table004_Material_#32284_0']: THREE.Mesh
    ['base_bottom_Material_#32289_0']: THREE.Mesh
    ['base_Material_#32290_0']: THREE.Mesh
    ['floor_Material_#32287_0']: THREE.Mesh
    ['art3_Material_#32286_0']: THREE.Mesh
    ['art1_Material_#32285_0']: THREE.Mesh
    ['art_2_Material_#32288_0']: THREE.Mesh
  }
  materials: {
    Material_32270: THREE.MeshBasicMaterial
    Material_32272: THREE.MeshBasicMaterial
    Material_32273: THREE.MeshBasicMaterial
    Material_32269: THREE.MeshBasicMaterial
    Material_32274: THREE.MeshBasicMaterial
    Material_32268: THREE.MeshBasicMaterial
    Material_32275: THREE.MeshBasicMaterial
    Material_32277: THREE.MeshBasicMaterial
    Material_32278: THREE.MeshBasicMaterial
    Material_32279: THREE.MeshBasicMaterial
    Material_32280: THREE.MeshBasicMaterial
    Material_32281: THREE.MeshBasicMaterial
    Material_32282: THREE.MeshBasicMaterial
    Material_32407: THREE.MeshBasicMaterial
    Material_32284: THREE.MeshBasicMaterial
    Material_32289: THREE.MeshBasicMaterial
    Material_32290: THREE.MeshBasicMaterial
    Material_32287: THREE.MeshBasicMaterial
    Material_32286: THREE.MeshBasicMaterial
    Material_32285: THREE.MeshBasicMaterial
    Material_32288: THREE.MeshBasicMaterial
  }
}

export function Exhibition(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Exhibition.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[159.987, -3.786, 340.865]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes['roofrack_A_Material_#32269_0'].geometry} material={materials.Material_32269} />
          <mesh geometry={nodes['roofrack_A_Material_#32269_0_1'].geometry} material={materials.Material_32269} />
        </group>
        <group position={[0, -15.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes['concrete_Material_#32275_0'].geometry} material={materials.Material_32275} position={[1086.705, -140.729, -1123.926]} />
        </group>
        <group position={[704.5, 206.888, -38.865]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes['ceiling_props_Material_#32277_0'].geometry} material={materials.Material_32277} />
          <mesh geometry={nodes['ceiling_props_Material_#32277_0_1'].geometry} material={materials.Material_32277} />
        </group>
        <group position={[28.964, -30.5, 15.203]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes['base_bottom_Material_#32289_0'].geometry} material={materials.Material_32289} position={[0, 0, -249.065]} />
        </group>
        <mesh geometry={nodes['walls_C_Material_#32270_0'].geometry} material={materials.Material_32270} position={[1086.705, -1123.926, 140.729]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['doors_Material_#32272_0'].geometry} material={materials.Material_32272} position={[-796.547, 3.834, 234.561]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['structural_Material_#32273_0'].geometry} material={materials.Material_32273} position={[-80.36, 326.16, 725.639]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['beamlights_Material_#32274_0'].geometry} material={materials.Material_32274} position={[498.671, 552.474, -344.939]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['wall_props_Material_#32268_0'].geometry} material={materials.Material_32268} position={[-435.206, -1.246, 375.314]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['roof_Material_#32278_0'].geometry} material={materials.Material_32278} position={[1088.083, -1123.926, 140.729]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['windowframes_Material_#32279_0'].geometry} material={materials.Material_32279} position={[-80.36, 326.16, 725.639]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['walls_B_Material_#32280_0'].geometry} material={materials.Material_32280} position={[1086.705, -1123.926, 140.729]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['walls_A_Material_#32281_0'].geometry} material={materials.Material_32281} position={[1086.705, -1123.926, 140.729]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['roofrack_B_Material_#32282_0'].geometry} material={materials.Material_32282} position={[-80.36, 326.16, 725.639]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['table001_Material_#32407_0'].geometry} material={materials.Material_32407} position={[851.556, 109.596, -46.605]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['table004_Material_#32284_0'].geometry} material={materials.Material_32284} position={[-815.847, 109.596, -322.193]} rotation={[-Math.PI / 2, 0, -2.241]} />
        <mesh geometry={nodes['base_Material_#32290_0'].geometry} material={materials.Material_32290} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['floor_Material_#32287_0'].geometry} material={materials.Material_32287} position={[1086.705, -1123.926, 140.729]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes['art3_Material_#32286_0'].geometry} material={materials.Material_32286} position={[-1240.757, 298.143, 221.167]} rotation={[Math.PI, 0, -Math.PI]} />
        <mesh geometry={nodes['art1_Material_#32285_0'].geometry} material={materials.Material_32285} position={[-1240.757, 298.143, 221.167]} rotation={[Math.PI, 0, -Math.PI]} />
        <mesh geometry={nodes['art_2_Material_#32288_0'].geometry} material={materials.Material_32288} position={[-1240.757, 298.143, 221.167]} rotation={[Math.PI, 0, -Math.PI]} />
      </group>
    </group>
  )
}
