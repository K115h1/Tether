import { Canvas } from '@react-three/fiber'
import { Text3D, Center, OrbitControls, Environment } from '@react-three/drei'

interface textProps {
    text: String
}

export default function TextIn3d({ text }: textProps) {
    return (
        <Canvas camera={{ position: [0, 0, 8] }}>
            <ambientLight intensity={0.8} />
            <spotLight
                position={[0, 5, 2]}
                angle={0.3}
                penumbra={0.8}
                intensity={3}
                color="#7C5CBF"
                castShadow
            />
            <pointLight position={[0, 0, 0]} intensity={9} color="#808080" />
            <Environment preset="studio" />
            <Center>
                <Text3D size={1} font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json">
                    {text}
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={0.9}
                        // roughness={0}
                        shadowSide={2}
                    />
                </Text3D>
            </Center>
            <OrbitControls enableZoom={false} enableRotate />
        </Canvas>
    )
}