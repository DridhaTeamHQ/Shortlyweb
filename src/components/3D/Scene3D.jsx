import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const FloatingShape = ({ position, color, scale = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

const Scene3D = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      
      {/* Floating Shapes */}
      <FloatingShape position={[-4, 2, -2]} color="#6366f1" scale={0.8} />
      <FloatingShape position={[4, -2, -3]} color="#8b5cf6" scale={1.2} />
      <FloatingShape position={[-2, -3, -1]} color="#f59e0b" scale={0.6} />
      <FloatingShape position={[3, 3, -4]} color="#6366f1" scale={1} />
      <FloatingShape position={[0, 0, -5]} color="#8b5cf6" scale={1.5} />
      
      {/* Background particles */}
      <mesh>
        <sphereGeometry args={[50, 32, 32]} />
        <meshBasicMaterial color="#0f172a" side={THREE.BackSide} />
      </mesh>
    </>
  )
}

export default Scene3D
