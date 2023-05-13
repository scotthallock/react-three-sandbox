import * as THREE from 'three';
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, Text, Text3D } from '@react-three/drei';
import ObjectControlTable from './components/ObjectControlTable';

import { AXIS, OBJECT, MATERIAL } from './types';

const initialObjects = {
  0: {
    iden: 0,
    geometry: OBJECT.TEXT3D,
    material: MATERIAL.NORMAL,
    color: '#00ff00',
    text: 'sup',
    args: [],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
  },
  1: {
    iden: 1,
    geometry: OBJECT.TEXT3D,
    material: MATERIAL.PHONG,
    color: '#00ffff',
    text: 'hello',
    args: [],
    position: [-1.4, 1.4, 0],
    rotation: [-10, 10, 5],
    scale: 2,
  },
};

const boxTemplate = {
  iden: null,
  geometry: OBJECT.BOX,
  material: MATERIAL.NORMAL,
  color: '#00ffff',
  text: 'hello',
  args: [1, 1, 1],
  position: [-1.4, 1.4, 0],
  rotation: [-10, 10, 5],
  scale: 2,
};

function App() {
  const [objects, setObjects] = useState(initialObjects);
  const [nextId, setNextId] = useState(2); // needs to be changed

  const addObject = (type, ...otherparams) => {
    if (type !== 'box') {
      console.log('Can only create a box rn');
      return;
    }
    console.log('Creating a new box');
    const newObjects = structuredClone(objects);
    const box = structuredClone(boxTemplate);
    box.iden = nextId;
    newObjects[nextId] = box;
    setObjects(newObjects);
    setNextId(nextId + 1);
  };

  const deleteObject = (id) => {
    const newObjects = structuredClone(objects);
    delete newObjects[id];
    setObjects(newObjects);
  };

  const duplicateObject = (id) => {
    const newObjects = structuredClone(objects);
    const duplicate = structuredClone(newObjects[id]);
    duplicate.iden = nextId;
    // Offset the duplicated item so you can see it
    duplicate.position[AXIS.X] += 0.5;
    duplicate.position[AXIS.Z] += 0.5;
    newObjects[nextId] = duplicate;
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
    newObjects[id].position[axis] = value;
    setObjects(newObjects);
  };

  const changeRotation = (id, axis, degrees) => {
    const newObjects = structuredClone(objects);
    newObjects[id].rotation[axis] = degrees % 360;
    setObjects(newObjects);
  };

  const changeScale = (id, value) => {
    const newObjects = structuredClone(objects);
    newObjects[id].scale = value;
    setObjects(newObjects);
  };

  return (
    <>
      <h1 className="text-xl select-none font-medium uppercase text-gray-200 mt-4 ml-4">
        React Three Sandbox
      </h1>
      <div id="canvas-container" className="aspect-[1.91/1] m-4 shadow-lg">
        <Canvas
          className="bg-white"
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
        >
          <Lights />

          {Object.values(objects).map((obj) => {
            switch (obj.geometry) {
              case OBJECT.TEXT3D:
                return <Centered3DText key={obj.iden} {...obj} />;
              case OBJECT.BOX:
                return <BoxObject key={obj.iden} {...obj} />;
              default:
                return null;
            }
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
        addObject={addObject}
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

function BoxObject(props) {
  let { material, color } = props;
  let threeMaterial;
  switch (material) {
    case MATERIAL.BASIC:
      threeMaterial = new THREE.MeshBasicMaterial({ color });
      break;
    case MATERIAL.PHONG:
      threeMaterial = new THREE.MeshPhongMaterial({ color });
      break;
    default:
      threeMaterial = new THREE.MeshNormalMaterial();
  }
  console.log(threeMaterial);
  return (
    <mesh material={threeMaterial}>
      <boxGeometry {...props} />
    </mesh>
  );
}

function Centered3DText(props) {
  const { iden, rotation, material, color, text } = props;

  let threeMaterial;
  switch (material) {
    case MATERIAL.BASIC:
      threeMaterial = new THREE.MeshBasicMaterial({ color });
      break;
    case MATERIAL.PHONG:
      threeMaterial = new THREE.MeshPhongMaterial({ color });
      break;
    default:
      threeMaterial = new THREE.MeshNormalMaterial();
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
