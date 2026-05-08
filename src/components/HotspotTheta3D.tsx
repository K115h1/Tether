import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// ── Theta Shape Geometry ────────────────────────────────────────────────────
function ThetaShape() {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const thetaGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    const outerRadius = 0.18
    const innerRadius = 0.11

    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false)

    const hole = new THREE.Path()
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true)
    shape.holes.push(hole)

    const extrudeSettings = {
      depth: 0.03,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 4,
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  const barGeometry = useMemo(() => {
    return new THREE.BoxGeometry(0.3, 0.035, 0.04)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (glowRef.current) {
        gsap.to(glowRef.current.scale, {
          x: 1.4, y: 1.4, z: 1.4,
          duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut'
        })
      }
      if (groupRef.current) {
        gsap.to(groupRef.current.position, {
          y: 0.03,
          duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut'
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <group ref={groupRef}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#84CC16" transparent opacity={0.15} />
      </mesh>

      <mesh geometry={thetaGeometry}>
        <meshStandardMaterial
          color="#84CC16"
          emissive="#84CC16"
          emissiveIntensity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh geometry={barGeometry}>
        <meshStandardMaterial
          color="#84CC16"
          emissive="#84CC16"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh>
        <torusGeometry args={[0.25, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#84CC16"
          emissive="#84CC16"
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

// ── Animated Ring ────────────────────────────────────────────────────────────
interface AnimatedRingProps {
  radius: number
  tube?: number
  color?: string
  opacity?: number
  speed?: number
  direction?: number
}

function AnimatedRing({ 
  radius, 
  tube = 0.015, 
  color = '#7C5CBF', 
  opacity = 0.4,
  speed = 0.3,
  direction = 1 
}: AnimatedRingProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * direction * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        emissive={color}
        emissiveIntensity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ── Signal Dots ──────────────────────────────────────────────────────────────
function SignalDots() {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!groupRef.current) return
      const dots = groupRef.current.children
      dots.forEach((dot, i) => {
        gsap.to(dot.scale, {
          x: 1.6, y: 1.6, z: 1.6,
          duration: 1.2 + i * 0.2,
          yoyo: true, repeat: -1, ease: 'sine.inOut',
          delay: i * 0.3
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const positions: [number, number, number][] = [
    [0, 0.9, 0], [0, -0.9, 0], [0.9, 0, 0], [-0.9, 0, 0],
    [0.64, 0.64, 0], [-0.64, 0.64, 0], [0.64, -0.64, 0], [-0.64, -0.64, 0]
  ]

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial
            color={i < 4 ? '#7C5CBF' : '#F59E0B'}
            emissive={i < 4 ? '#7C5CBF' : '#F59E0B'}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// ── Crosshair Lines ───────────────────────────────────────────────────────────
function Crosshairs() {
  const linesRef = useRef<THREE.Group>(null)

  const lineObjects = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: '#7C5CBF',
      transparent: true,
      opacity: 0.15
    })

    const points = [
      [new THREE.Vector3(0, 0.52, 0), new THREE.Vector3(0, 0.88, 0)],
      [new THREE.Vector3(0, -0.52, 0), new THREE.Vector3(0, -0.88, 0)],
      [new THREE.Vector3(0.52, 0, 0), new THREE.Vector3(0.88, 0, 0)],
      [new THREE.Vector3(-0.52, 0, 0), new THREE.Vector3(-0.88, 0, 0)],
    ]

    return points.map(([start, end]) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([start, end])
      return new THREE.Line(geometry, material)
    })
  }, [])

  return (
    <group ref={linesRef}>
      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  )
}

// ── Main Scene ────────────────────────────────────────────────────────────────
function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!groupRef.current) return

      gsap.from(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2.2,
        ease: 'power3.out'
      })
      gsap.from(groupRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 1.8,
        ease: 'back.out(1.7)'
      })
    })

    return () => ctx.revert()
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <AnimatedRing radius={0.92} tube={0.006} color="#7C5CBF" opacity={0.12} speed={0.1} />
      <AnimatedRing radius={0.76} tube={0.01} color="#7C5CBF" opacity={0.2} speed={0.2} direction={-1} />
      <AnimatedRing radius={0.6} tube={0.008} color="#84CC16" opacity={0.18} speed={0.3} />
      <AnimatedRing radius={0.46} tube={0.006} color="#F59E0B" opacity={0.25} speed={0.4} direction={-1} />
      <AnimatedRing radius={0.33} tube={0.012} color="#7C5CBF" opacity={0.35} speed={0.5} />

      <ThetaShape />
      <SignalDots />
      <Crosshairs />
    </group>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function HotspotTheta3D() {
  return (
    <div className="w-full h-125 rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color  args={['#0E0B14']} />

        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#7C5CBF" />
        <pointLight position={[-3, -3, 3]} intensity={0.6} color="#84CC16" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#F59E0B" />

        <Environment preset="night" />

        <Scene />

        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}