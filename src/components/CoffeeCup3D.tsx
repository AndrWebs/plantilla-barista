"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const CoffeeCup = () => {
  const cupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useFrame(() => {
    const mx = (window as any).__mouseX || 0
    const my = (window as any).__mouseY || 0
    mouse.current.x = mx
    mouse.current.y = my

    if (cupRef.current) {
      cupRef.current.rotation.y = THREE.MathUtils.lerp(cupRef.current.rotation.y, mouse.current.x * 0.5, 0.05)
      cupRef.current.rotation.x = THREE.MathUtils.lerp(cupRef.current.rotation.x, -mouse.current.y * 0.3, 0.05)
    }
  })

  const coffeeTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext("2d")!
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    gradient.addColorStop(0, "#6b3a2a")
    gradient.addColorStop(0.6, "#3e1f14")
    gradient.addColorStop(1, "#1a0c08")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <group ref={cupRef} position={[0, -0.5, 0]}>
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[1.1, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.7, 0.6, 1.0, 32]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.2} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.62, 0.64, 0.1, 32]} />
        <meshStandardMaterial map={coffeeTexture} roughness={0.1} />
      </mesh>
      <mesh position={[0.75, -0.2, 0]}>
        <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.2} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.63, 0.64, 0.03, 32]} />
        <meshStandardMaterial color="#e8d5b7" roughness={0.3} />
      </mesh>
    </group>
  )
}

const SteamParticles = () => {
  const particlesRef = useRef<THREE.Group>(null)
  const particleCount = 20

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 0.4,
      y: Math.random() * 1.5 + 0.3,
      z: (Math.random() - 0.5) * 0.4,
      speed: Math.random() * 0.003 + 0.001,
      size: Math.random() * 0.05 + 0.02,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  }, [])

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        child.position.y += particles[i].speed
        child.position.x += Math.sin(Date.now() * 0.001 + i) * 0.0005
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
        material.opacity = 0.3 - (child.position.y - 0.3) * 0.2
        if (child.position.y > 1.5) {
          child.position.y = 0.3
          child.position.x = (Math.random() - 0.5) * 0.4
        }
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={p.opacity} />
        </mesh>
      ))}
    </group>
  )
}

const CoffeeBeans = () => {
  const beansRef = useRef<THREE.Group>(null)
  const beanCount = 8

  const beans = useMemo(() => {
    return Array.from({ length: beanCount }, (_, i) => ({
      angle: (i / beanCount) * Math.PI * 2,
      radius: 1.8 + Math.random() * 0.8,
      y: (Math.random() - 0.5) * 2,
      speed: Math.random() * 0.2 + 0.1,
      rotationSpeed: Math.random() * 0.02,
    }))
  }, [])

  useFrame(() => {
    if (beansRef.current) {
      beansRef.current.children.forEach((child, i) => {
        beans[i].angle += beans[i].speed * 0.005
        child.position.x = Math.cos(beans[i].angle) * beans[i].radius
        child.position.z = Math.sin(beans[i].angle) * beans[i].radius
        child.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002
        child.rotation.x += beans[i].rotationSpeed
        child.rotation.y += beans[i].rotationSpeed
      })
    }
  })

  const beanShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.absellipse(0, 0, 0.12, 0.08, 0, Math.PI * 2, false, 0)
    const extrudeSettings = {
      steps: 1,
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  return (
    <group ref={beansRef}>
      {beans.map((_, i) => (
        <mesh key={i} geometry={beanShape}>
          <meshStandardMaterial color="#3e1f14" roughness={0.6} metalness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

const CoffeeCup3D = () => {
  const handlePointerMove = (e: any) => {
    (window as any).__mouseX = (e.clientX / window.innerWidth) * 2 - 1
    ;(window as any).__mouseY = -(e.clientY / window.innerHeight) * 2 + 1
  }

  return (
    <Canvas
      camera={{ position: [0, 0.2, 4.5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      onPointerMove={handlePointerMove}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff5e6" />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#d4a574" />
      <pointLight position={[2, -1, -2]} intensity={0.3} color="#8b6914" />
      <CoffeeCup />
      <SteamParticles />
      <CoffeeBeans />
    </Canvas>
  )
}

export default CoffeeCup3D
