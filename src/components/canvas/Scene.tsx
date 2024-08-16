'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'
import { KeyboardControls } from '@react-three/drei'


const keyboardMap = [
  {name: "forward", keys: ["ArrowUp", "KeyW"]},
  {name: "backward", keys: ["ArrowDown", "KeyS"]},
  {name: "left", keys: ["ArrowLeft", "KeyA"]},
  {name: "right", keys: ["ArrowRight", "KeyD"]},
  {name: "run", keys: ["Shift"]},
]

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas {...props}
        onCreated={(state) => (state.gl.toneMapping = THREE.ACESFilmicToneMapping)}
      >
        {/* @ts-ignore */}
        <r3f.Out />
        <Preload all />
      </Canvas>
    </KeyboardControls>
  )
}
