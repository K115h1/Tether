import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, ContactShadows, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// ── Screen content ──────────────────────────────────────────────────────────
function ScreenUI() {
  return (
    <div className="w-85 rotate-180 h-55 bg-[#0D0D0D] rounded-md overflow-hidden p-4 box-border">

      {/* Top bar */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[#7C5CBF] font-bold text-[13px] tracking-widest">TETHER</span>
        <div className="flex gap-1">
          {['Explore', 'Teach', 'Learn'].map(l => (
            <span key={l} className="text-[9px] text-[#555] bg-[#1a1a1a] px-2 py-0.5 rounded-full">{l}</span>
          ))}
        </div>
      </div>

      {/* Featured teacher card */}
      <div className="bg-[#1A1A2E] rounded-lg p-3 mb-3 border border-[#2D1B69]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#2D1B69] to-lime-500 flex items-center justify-center text-[11px] text-[#7C5CBF] font-bold shrink-0">
            AO
          </div>
          <div>
            <div className="text-[11px] text-[#e0e0e0] font-semibold">Adeola Okonkwo</div>
            <div className="text-[9px] text-[#666]">React · Three.js · UI Design</div>
          </div>
          <div className="ml-auto bg-[#2D1B69] text-[#9B7FE8] text-[9px] px-2 py-0.5 rounded-full shrink-0">
            ⭐ 4.9
          </div>
        </div>
      </div>

      {/* Skill tags */}
      <div className="mb-3">
        <div className="text-[9px] text-[#444] mb-1">TRENDING SKILLS</div>
        <div className="flex gap-1 flex-wrap">
          {['3D Web Dev', 'Calisthenics', 'Guitar', 'SQL', 'Illustration', 'Yoruba'].map(s => (
            <span key={s} className="text-[8px] text-[#050011] bg-lime-300 border border-lime-500 px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-2">
        <div className="flex-1 bg-[#ae00ff] rounded-md py-1.5 text-center text-[9px] text-[#050011] font-semibold">
          Start Learning
        </div>
        <div className="flex-1 border border-lime-500 rounded-md py-1.5 text-center text-[9px] text-[#4CAF82] font-semibold">
          Offer a Skill
        </div>
      </div>
    </div>
  )
}


// ── Laptop RoundedBox ──────────────────────────────────────────────────────────────
function Laptop() {
  const lidRef = useRef<THREE.Group>(null)
  const groupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (!lidRef.current) return
    lidRef.current.rotation.x = Math.PI / 1
    gsap.to(lidRef.current.rotation, {
      x: 0.8,
      duration: 1.8,
      ease: 'power3.out',
      delay: 0.4,
    })
  }, [])

  useFrame((state) => {
    if (screenRef.current) {
      screenRef.current.style.display = (lidRef.current?.rotation.x ?? 0) > 1.5 ? 'none' : 'block'
      // console.log(lidRef.current?.rotation.x)

    }
    if (!groupRef.current) return
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12
  })


  const bodyMat = new THREE.MeshStandardMaterial({
    color: '#C0C0C0',
    roughness: 0.05,
    metalness: 1,
    
  })
  const screenMat = new THREE.MeshStandardMaterial({ color: '#0a0a0a', roughness: 0.1, metalness: 0.5 })
  const keyboardMat = new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.6, metalness: 0.3 })
  const accentMat = new THREE.MeshStandardMaterial({ color: '#2D1B69', roughness: 0.2, metalness: 0.9 })

  return (
    <group ref={groupRef}>
      {/* Base */}
      <RoundedBox args={[3, 0.12, 2]} position={[0, 0 - 0.5, 0]} material={bodyMat} castShadow>
      </RoundedBox>

      {/* Keyboard area */}
      <RoundedBox args={[2.6, 0.01, 1.6]} position={[0, 0.065 - 0.5, 0.1]} material={keyboardMat}>
      </RoundedBox>

      {/* Trackpad */}
      <RoundedBox args={[0.7, 0.005, 0.45]} position={[0, 0.066 - 0.5, 0.65]} material={screenMat}>

      </RoundedBox>

      {/* Lid group */}
      <group ref={lidRef} position={[0, 0.06 - 0.5, -1]}>
        {/* Lid shell */}
        <RoundedBox args={[3, 0.08, 2]} position={[0, 0, -0.96]} material={bodyMat} castShadow>

        </RoundedBox>

        {/* Screen bezel */}
        <RoundedBox args={[2.75, 0.02, 1.78]} position={[0, 0.04, -0.96]} material={screenMat}>

        </RoundedBox>

        {/* Embedded HTML screen */}
        <Html
          position={[0.05, 0.4, -1.375]}
          rotation={[Math.PI / 2, Math.PI, 0]}
          transform
          scale={0.31258}
          style={{ pointerEvents: 'none' }}
        >
          <div ref={screenRef}>
            <ScreenUI />
          </div>
        </Html>

        {/* Logo on back */}
        <RoundedBox position={[0, -0.045 - 0.5, -0.96]} material={accentMat}>
          <circleGeometry args={[0.18, 32]} />
        </RoundedBox>
      </group>

      
    </group>
  )


}

// ── Scene ────────────────────────────────────────────────────────────────────
export default function Laptop3D() {
  return (
    <div className="w-full h-screen ">
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 6, 4]} intensity={2} color="#7C5CBF" castShadow />
        <pointLight position={[-4, 2, 3]} intensity={1.5} color="#1A3A2A" />
        <pointLight position={[0, -2, 4]} intensity={0.8} color="#ffffff" />

        <Environment preset="night" />
        <Laptop />

        <ContactShadows
          position={[0, 0.8, 0]}
          opacity={0.5}
          scale={8}
          blur={2}
          far={2}
          color="#2D1B69"
        />
      </Canvas>
    </div>
  )
}



