"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function IridescentShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.5}>
                <icosahedronGeometry args={[1, 1]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    thickness={0.5}
                    chromaticAberration={0.8}
                    anisotropy={0.3}
                    distortion={0.3}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                    iridescence={1}
                    iridescenceIOR={1.5}
                    iridescenceThicknessRange={[100, 800]}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    envMapIntensity={1.5}
                    color="#a855f7"
                    transmission={0.95}
                />
            </mesh>
        </Float>
    );
}

function Fallback() {
    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#a855f7" wireframe />
        </mesh>
    );
}

export default function Model3D() {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={<Fallback />}>
                    <ambientLight intensity={0.3} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} color="#ffffff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
                    <pointLight position={[10, -10, 10]} intensity={0.3} color="#06b6d4" />

                    <IridescentShape />

                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
