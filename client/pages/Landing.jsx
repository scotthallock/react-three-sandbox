import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Canvas } from '@react-three/fiber';
import { Stage, Float, OrbitControls, Billboard, Text3D, Center } from '@react-three/drei';
import interFont from '../assets/Inter_Regular.json';

const Landing = () => {
  const {
    auth: [user, setUser],
  } = useAuth();

  return (
    <main className="m-4 flex flex-col gap-4">
      <NavBar />

      <div
        id="canvas-container"
        className="fixed [z-index:_-1] top-0 left-0 w-full h-full outline outline-1 outline-green-300"
      >
        <Canvas camera={{ position: [0, 9, 3], fov: 50 }}>
          <Stage adjustCamera={false} intensity={0.5} shadows="contact" environment="city">
            <directionalLight position={[2.5, 8, 5]} intensity={1.5} castShadow />

            <Float speed={1} rotationIntensity={1} floatingRange={[1, 1.5]}>
              <mesh position={[2, 0, 2]} castShadow>
                <boxGeometry args={[1.4, 1.4, 1.4]} />
                <meshNormalMaterial />
              </mesh>
            </Float>
            <Float speed={1} rotationIntensity={1} floatingRange={[1, 1.5]}>
              <mesh position={[2, 0, -2]} castShadow>
                <coneGeometry args={[1, 1.6, 6]} />
                <meshNormalMaterial />
              </mesh>
            </Float>
            <Float speed={1} rotationIntensity={1} floatingRange={[1, 1.5]}>
              <mesh position={[-2, 0, -2]} castShadow>
                <sphereGeometry args={[0.9, 32, 16]} />
                <meshNormalMaterial />
              </mesh>
            </Float>
            <Float speed={1} rotationIntensity={1} floatingRange={[1, 1.5]}>
              <mesh position={[-2, 0, 2]} castShadow>
                <icosahedronGeometry args={[1]} />
                <meshNormalMaterial />
              </mesh>
            </Float>

            <Float speed={1} rotationIntensity={1} floatingRange={[1, 1.5]}>
              <Center position={[-2, 0, 0]}>
                <Text3D
                  rotation={[1.57, 0, 0]}
                  font={interFont}
                  height={0.5}
                  lineHeight={0.7}
                  curveSegments={12}
                  bevelEnabled
                  bevelThickness={0.05}
                  bevelSize={0.05}
                  bevelOffset={0}
                  bevelSegments={5}
                  size={1}
                >
                  E
                  <meshNormalMaterial />
                </Text3D>
              </Center>
            </Float>
            <Float speed={1} rotationIntensity={1} floatingRange={[1, 1.5]}>
              <Center position={[-0.65, 0, -0.75]}>
                <Text3D
                  rotation={[1.57, 0, 0]}
                  font={interFont}
                  height={0.5}
                  lineHeight={0.7}
                  curveSegments={12}
                  bevelEnabled
                  bevelThickness={0.05}
                  bevelSize={0.05}
                  bevelOffset={0}
                  bevelSegments={5}
                  size={1}
                >
                  Z
                  <meshNormalMaterial />
                </Text3D>
              </Center>
            </Float>
            <Float speed={1} rotationIntensity={1} floatingRange={[1, 1.5]}>
              <Center position={[0.65, 0, 0.75]}>
                <Text3D
                  rotation={[1.57, 0, 0]}
                  font={interFont}
                  height={0.5}
                  lineHeight={0.7}
                  curveSegments={12}
                  bevelEnabled
                  bevelThickness={0.05}
                  bevelSize={0.05}
                  bevelOffset={0}
                  bevelSegments={5}
                  size={1}
                >
                  3
                  <meshNormalMaterial />
                </Text3D>
              </Center>
            </Float>
            <Float speed={1} rotationIntensity={1} floatingRange={[1, 1.5]}>
              <Center position={[2, 0, 0]}>
                <Text3D
                  rotation={[1.57, 0, 0]}
                  font={interFont}
                  height={0.5}
                  lineHeight={0.7}
                  curveSegments={12}
                  bevelEnabled
                  bevelThickness={0.05}
                  bevelSize={0.05}
                  bevelOffset={0}
                  bevelSegments={5}
                  size={1}
                >
                  D
                  <meshNormalMaterial />
                </Text3D>
              </Center>
            </Float>
          </Stage>
          <OrbitControls
            makeDefault
            autoRotate
            autoRotateSpeed={1}
            enablePan={false}
            enableZoom={false}
          />
        </Canvas>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link to="/scene">
          <div className="rounded-[12px] p-[2px] bg-gradient-to-br from-blue-400 via-cyan-400 to-emerald-500">
            <div className="rounded-[10px] bg-zinc-900 shadow-900  p-3 hover:text-emerald-500">
              Start Creating
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Landing;
