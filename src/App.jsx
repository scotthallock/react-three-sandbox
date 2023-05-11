import React from 'react';
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <>
      <h1 class="text-3xl font-bold">React Three Sandbox</h1>
      <div id="canvas-container">
        <Canvas>
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>
    </>
  );
}

export default App;
