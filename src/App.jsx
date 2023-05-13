import * as THREE from 'three';
import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Center,
  OrbitControls,
  Text,
  Text3D,
  Stats,
  PivotControls,
} from '@react-three/drei';

import ObjectControlTable from './components/ObjectControlTable';

const initialObjects = {
  0: {
    iden: 0,
    geometry: 'Text3D',
    text: 'sup',
    material: 'normal',
    color: '#00ff00',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
  },
  1: {
    iden: 1,
    geometry: 'Text3D',
    text: 'hello',
    material: 'basic',
    color: '#ff0000',
    position: [1, 1, 1],
    rotation: [-10, 10, 5],
    scale: 2,
  },
};

function App() {
  const [objects, setObjects] = useState(initialObjects);
  const [nextId, setNextId] = useState(2); // needs to be changed

  const deleteObject = (id) => {
    const newObjects = structuredClone(objects);
    delete newObjects[id];
    setObjects(newObjects);
  };

  const duplicateObject = (id) => {
    const newObjects = structuredClone(objects);
    const duplicate = structuredClone(newObjects[id]);
    duplicate.iden = nextId;
    newObjects[nextId] = duplicate;
    console.log('created a new object with id', nextId);
    setObjects(newObjects);
    setNextId(nextId + 1);
  };

  const changeMaterial = (id, material) => {
    const newObjects = structuredClone(objects);
    newObjects[id].material = material;
    setObjects(newObjects);
  };

  const changeColor = (id, color) => {
    const newObjects = structuredClone(objects);
    newObjects[id].color = color;
    setObjects(newObjects);
  };

  const changeText = (id, text) => {
    const newObjects = structuredClone(objects);
    newObjects[id].text = text;
    setObjects(newObjects);
  };

  const changePosition = (id, axis, value) => {
    const newObjects = structuredClone(objects);
    if (axis === 'x') newObjects[id].position[0] = value;
    else if (axis === 'y') newObjects[id].position[1] = value;
    else if (axis === 'z') newObjects[id].position[2] = value;
    setObjects(newObjects);
  };

  const changeRotation = (id, axis, degrees) => {
    const newObjects = structuredClone(objects);
    if (axis === 'x') newObjects[id].rotation[0] = degrees % 360;
    else if (axis === 'y') newObjects[id].rotation[1] = degrees % 360;
    else if (axis === 'z') newObjects[id].rotation[2] = degrees % 360;
    setObjects(newObjects);
  };

  const changeScale = (id, value) => {
    const newObjects = structuredClone(objects);
    newObjects[id].scale = value;
    setObjects(newObjects);
  };

  return (
    <>
      <h1 className="text-2xl font-bold select-none font-medium uppercase text-gray-200 mt-4 ml-4">
        React Three Sandbox
      </h1>
      <div id="canvas-container" className="aspect-[1.91/1] m-4 shadow-lg">
        <Canvas
          className="bg-white"
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
        >
          <Lights />

          {Object.values(objects).map((state) => {
            if (state.geometry === 'Text3D') {
              return <Centered3DText key={state.iden} {...state} />;
            }
            return null;
          })}

          <gridHelper />
          <OrbitControls makeDefault enableDamping={false} />
        </Canvas>
      </div>
      <ObjectControlTable
        objects={objects}
        changeText={changeText}
        changeMaterial={changeMaterial}
        changeColor={changeColor}
        changeScale={changeScale}
        changePosition={changePosition}
        changeRotation={changeRotation}
        deleteObject={deleteObject}
        duplicateObject={duplicateObject}
      />
    </>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
    </>
  );
}

function Centered3DText(props) {
  const { iden, rotation, material, color, text } = props;

  let threeMaterial;
  switch (material) {
    case 'normal':
      threeMaterial = new THREE.MeshNormalMaterial();
      break;
    case 'basic':
      threeMaterial = new THREE.MeshBasicMaterial({ color });
      break;
    case 'phong':
      threeMaterial = new THREE.MeshPhongMaterial({ color });
      break;
    default:
      console.log('bruh');
  }

  return (
    <Text3D
      font="./src/assets/Inter_Regular.json"
      {...props}
      rotation={rotation.map((degrees) => THREE.MathUtils.degToRad(degrees))}
      lineHeight={0.7}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.01}
      bevelSize={0.01}
      bevelOffset={0}
      bevelSegments={5}
      material={threeMaterial}
    >
      {text}
    </Text3D>
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
