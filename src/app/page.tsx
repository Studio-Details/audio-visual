'use client'
import type { NextPage } from 'next'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import useAudioMaster from '@/hook/useAudioMaster'
import KeySound from '@/function/KeySound'
import { Environment } from '@react-three/drei'
import { useWindowSize } from 'react-use'

const KEY_LIST = [
  {keyType: 'q', freq: 261},
  {keyType: 'w', freq: 294},
  {keyType: 'e', freq: 330},
  {keyType: 'r', freq: 349},
  {keyType: 't', freq: 392},
  {keyType: 'y', freq: 440},
  {keyType: 'u', freq: 494},
  {keyType: 'i', freq: 523},
  {keyType: 'o', freq: 587},
  {keyType: 'p', freq: 659},
]


const Page: NextPage = () => {
  const {
    ctx,
    analyser,
    FreqArray,
    startTick,
    stopTick
  } = useAudioMaster()
    
  const windowSize = useWindowSize()

  const Group = (props: JSX.IntrinsicElements["group"]) => {
    const groupRef = useRef<THREE.Group>(null!)
    useFrame((state, delta) => {
      groupRef.current.rotation.x += 0.01
    });
    return <group ref={groupRef}>
      {props.children}
    </group>
  }

  const Box = (props: JSX.IntrinsicElements["mesh"]) => {
    const ref = useRef<THREE.Mesh>(null!);
    return (
      <mesh
        {...props}
        ref={ref}
      >
        <boxGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
    );
  };

  return (
    <>
    {ctx && analyser &&
      KEY_LIST.map((item, index) => <KeySound ctx={ctx} analyser={analyser} startTick={startTick} stopTick={stopTick} keyType={item.keyType} freq={item.freq} gain={0.1} key={index} />)
    }
    <div>
      <Canvas
        style={{
          width: 100 + "vw",
          height: 100 + "vh",
          position: "fixed",
          top: 0,
          left: 0,
        }}
        camera={{
          position: [0, 0, 15],
          fov: 50,
          aspect: windowSize.width / windowSize.height,
          near: 0.1,
          far: 2000
        }}
      >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {FreqArray && Array.from(FreqArray).map((value, index) => {
        const _value = value * 10
        const row = 16
        const col = Math.floor(index / row)
        const y = col - 3.5 + _value
        const x = (index - row / 2) + (col * -row) + _value
        const z = _value / 2
        return <Box position={[x, y, z]} key={index} />
      })}
      <Environment preset="sunset" blur={0.7} background />
    </Canvas>
    </div>
    
    </>
  )
}

export default Page
