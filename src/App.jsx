import * as THREE from 'three';
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

function App() {
  const ref = useRef();

  return (
    <>
      <h1 className="text-3xl font-bold">React Three Sandbox</h1>
      <div id="canvas-container" className="border">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <Box position={[1, 1, 1]} />

          <Word position={[0, 1, 2]}>hello.</Word>

          <OrbitControls />
        </Canvas>
      </div>
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
      <boxGeometry args={[1, 1, 1]} />

      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function Word({ children, ...props }) {
  const fontProps = {
    // font: '../public/Inter_Medium_Regular.json',
    fontSize: 2.5,
  };

  const ref = useRef();

  return (
    <Text
      color={'black'}
      children={children}
      {...props}
      {...fontProps}
      ref={ref}
      onClick={() => console.log('clicked')}
    ></Text>
  );
}

export default App;
