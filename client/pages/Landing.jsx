import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { Canvas } from '@react-three/fiber';
import {
  Stage,
  Float,
  OrbitControls,
  Instances,
  Instance,
  Billboard,
  Text,
  Text3D,
  Center,
} from '@react-three/drei';
import interFont from '../assets/Inter_Regular.json';

const Landing = () => {
  return (
    <main className="m-4 flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Logo />
        <Link to="/signup" className="ml-auto">
          <div className="bg-zinc-900 shadow-900 rounded-[10px] p-3 hover:text-emerald-500">
            Sign Up
          </div>
        </Link>
        <Link to="/login">
          <div className="bg-zinc-900 shadow-900 rounded-[10px] p-3 hover:text-emerald-500">
            Login
          </div>
        </Link>
      </div>

      <div className="relative">
        <div id="canvas-container" className=" aspect-1.91/1 w-full">
          <Canvas camera={{ position: [0, 4, 10], fov: 50 }}>
            <Stage adjustCamera={false} intensity={0.5} shadows="contact" environment="city">
              <directionalLight position={[2.5, 8, 5]} intensity={1.5} />

              <Billboard position={[0, 3.5, 0]}>
                <Center>
                  <Text3D
                    rotation={[-0.3, 0, 0]}
                    font={interFont}
                    lineHeight={0.7}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.01}
                    bevelSize={0.01}
                    bevelOffset={0}
                    bevelSegments={5}
                  >
                    make a scene
                    <meshPhongMaterial color="#10b981" />
                  </Text3D>
                </Center>
              </Billboard>

              <Float speed={1} rotationIntensity={3} floatingRange={[1, 1.5]}>
                <mesh position={[2, 0, 2]} castShadow>
                  <boxGeometry args={[1.4, 1.4, 1.4]} />
                  <meshNormalMaterial />
                </mesh>
              </Float>

              <Float speed={1} rotationIntensity={3} floatingRange={[1, 1.5]}>
                <mesh position={[2, 0, -2]} castShadow>
                  <coneGeometry args={[1, 1.6, 6]} />
                  <meshNormalMaterial />
                </mesh>
              </Float>

              <Float speed={1} rotationIntensity={3} floatingRange={[1, 1.5]}>
                <mesh position={[-2, 0, -2]} castShadow>
                  <sphereGeometry args={[0.9, 32, 16]} />
                  <meshNormalMaterial />
                </mesh>
              </Float>

              <Float speed={1} rotationIntensity={3} floatingRange={[1, 1.5]}>
                <mesh position={[-2, 0, 2]} castShadow>
                  <icosahedronGeometry args={[1]} />
                  <meshNormalMaterial />
                </mesh>
              </Float>
            </Stage>
            <OrbitControls makeDefault autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>
        <div className="flex align-center justify-center">
          <Link to="/scene">
            <div className="rounded-[12px] p-[2px] bg-gradient-to-br from-blue-400 via-cyan-400 to-emerald-500">
              <div className="rounded-[10px] bg-zinc-900 shadow-900  p-3 hover:text-emerald-500">
                Start Creating
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing;
