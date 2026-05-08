import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, ContactShadows, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import logo from "../assets/hotspot_theta_v2.svg"

// ── Screen content ──────────────────────────────────────────────────────────
function PhoneScreenUI() {
  return (
    <div className="w-48 h-96 bg-[#0D0D0D] rounded-3xl overflow-hidden p-3 box-border flex flex-col">
      {/* Status bar */}
      <div className="flex justify-between items-center mb-3 px-1">
        <span className="text-white/60 text-[8px] font-medium">9:41</span>
        <div className="flex gap-0.5">
          <div className="w-3 h-2 bg-white/40 rounded-[1px]" />
          <div className="w-2 h-2 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* App header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img src={logo} alt="logo" />
                  </div>
        <span className="text-white/80 text-[10px] font-bold">Tether</span>
      </div>

      {/* Teacher card */}
      <div className="bg-[#1A1A2E] rounded-xl p-2.5 mb-2 border border-[#2D1B69]/50">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2D1B69] to-lime-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
            AO
          </div>
          <div>
            <div className="text-[10px] text-white/90 font-semibold">Adeola Okonkwo</div>
            <div className="text-[8px] text-white/40">React · Three.js</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-[8px]">★</span>
            <span className="text-white/60 text-[8px]">4.9</span>
          </div>
          <span className="text-lime-400 text-[8px] font-medium">Book now</span>
        </div>
      </div>

      {/* Skills section */}
      <div className="mb-2">
        <div className="text-[8px] text-white/30 mb-1.5 uppercase tracking-wider">Trending</div>
        <div className="flex gap-1 flex-wrap">
          {['3D Web', 'Guitar', 'SQL', 'Yoruba'].map(s => (
            <span key={s} className="text-[7px] text-[#0E0B14] bg-lime-400/80 px-1.5 py-0.5 rounded-full font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-2 mt-auto">
        <div className="flex-1 bg-white/[0.03] rounded-lg p-2 text-center">
          <div className="text-white/80 text-[10px] font-bold">2.4k</div>
          <div className="text-white/30 text-[7px]">Skills</div>
        </div>
        <div className="flex-1 bg-white/[0.03] rounded-lg p-2 text-center">
          <div className="text-white/80 text-[10px] font-bold">12</div>
          <div className="text-white/30 text-[7px]">Credits</div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around items-center mt-3 pt-2 border-t border-white/[0.06]">
        {['Explore', 'Teach', 'Profile'].map((item, i) => (
          <div key={item} className={`text-[7px] ${i === 0 ? 'text-lime-400' : 'text-white/30'}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Phone RoundedBox ──────────────────────────────────────────────────────────────
function Phone() {
  const groupRef = useRef<THREE.Group>(null)
  const lidRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!lidRef.current) return
    gsap.to(lidRef.current.rotation, {
      y: 0.3,
      duration: 2,
      ease: 'power3.out',
      delay: 0.5,
    })
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08
  })

  const bodyMat = new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.1,
    metalness: 0.9,
  })

  const screenMat = new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 0.05,
    metalness: 0.8,
  })

  const accentMat = new THREE.MeshStandardMaterial({
    color: '#2D1B69',
    roughness: 0.2,
    metalness: 0.9,
  })

  return (
    <group ref={groupRef}>
      {/* Phone body */}
      <group ref={lidRef}>
        <RoundedBox args={[1.6, 3.2, 0.15]} position={[0, 0, 0]} material={bodyMat} castShadow>
        </RoundedBox>

        {/* Screen bezel */}
        <RoundedBox args={[1.45, 3.0, 0.02]} position={[0, 0, 0.08]} material={screenMat}>
        </RoundedBox>

        {/* Embedded HTML screen */}
        <Html
          position={[-0.55, -0.1, 0.06]}
          transform
          scale={0.29}
          style={{ pointerEvents: 'none' }}
        >
          <PhoneScreenUI />
        </Html>

        {/* Camera notch */}
        <RoundedBox args={[0.3, 0.05, 0.02]} position={[0, 1.35, 0.09]} material={accentMat}>
        </RoundedBox>

        {/* Side buttons */}
        <RoundedBox args={[0.02, 0.3, 0.08]} position={[0.81, 0.5, 0]} material={bodyMat}>
        </RoundedBox>
        <RoundedBox args={[0.02, 0.2, 0.08]} position={[0.81, 0.9, 0]} material={bodyMat}>
        </RoundedBox>
      </group>

      {/* Contact shadow */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.4}
        scale={4}
        blur={2}
        far={2}
        color="#2D1B69"
      />
    </group>
  )
}

// ── Scene ────────────────────────────────────────────────────────────────────
export default function Phone3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 4, 3]} intensity={2} color="#7C5CBF" castShadow />
        <pointLight position={[-3, 2, 2]} intensity={1.5} color="#1A3A2A" />
        <pointLight position={[0, -2, 3]} intensity={0.8} color="#ffffff" />

        <Environment preset="night" />
        <Phone />
      </Canvas>
    </div>
  )
}
