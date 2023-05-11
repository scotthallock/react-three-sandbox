import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, Text, Text3D } from '@react-three/drei';

function App() {
  return (
    <>
      <h1 className="text-2xl text-center font-bold select-none">
        React Three Sandbox
      </h1>
      <div
        id="canvas-container"
        className="border border-red-500 aspect-[1.91/1]"
      >
        <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <Box position={[1.6, 1, 0]} />

          <Word position={[0, 1, 0]}>hello.</Word>

          <Center>
            <Text3D
              font="./src/assets/Inter_Regular.json"
              size={0.75}
              height={0.2}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              Hello
              <meshNormalMaterial />
            </Text3D>
          </Center>

          <OrbitControls />
        </Canvas>
      </div>
      <button className="bg-slate-700" onClick={() => console.log('clicked')}>
        Click me
      </button>
      <input type="color" />
    </>
  );
}

function Box(props) {
  const ref = useRef();

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function Word({ children, ...props }) {
  const fontProps = {
    font: './src/assets/Inter_Regular.json',
    fontSize: 2.5,
  };

  const ref = useRef();

  return (
    <Text
      color="darkslategray"
      children={children}
      {...props}
      {...fontProps}
      ref={ref}
      onClick={() => console.log('clicked')}
    ></Text>
  );
}

export default App;
