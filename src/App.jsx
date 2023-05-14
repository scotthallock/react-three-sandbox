import * as THREE from 'three';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, Text, Text3D } from '@react-three/drei';
import ObjectControlTable from './components/ObjectControlTable';

import { AXIS, GEOMETRY, MATERIAL } from './types';

const initialObjects = {
  0: {
    iden: 0,
    geometry: GEOMETRY.TEXT3D,
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
    geometry: GEOMETRY.TEXT3D,
    material: MATERIAL.NORMAL,
    color: '#00ffff',
    text: 'hello',
    args: [],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
  },
  2: {
    iden: 2,
    geometry: GEOMETRY.TEXT2D,
    material: MATERIAL.BASIC,
    color: '#ff00ff',
    text: 'world',
    args: [],
    position: [1.4, 1.4, 0],
    rotation: [0, 10, 5],
    scale: 2,
  },
};

const boxTemplate = {
  iden: null,
  geometry: GEOMETRY.BOX,
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
  const [nextId, setNextId] = useState(3); // needs to be changed

  // const addObject = (type, ...otherparams) => {
  //   if (type !== 'box') {
  //     console.log('Can only create a box rn');
  //     return;
  //   }
  //   console.log('Creating a new box');
  //   const newObjects = structuredClone(objects);
  //   const box = structuredClone(boxTemplate);
  //   box.iden = nextId;
  //   newObjects[nextId] = box;
  //   setObjects(newObjects);
  //   setNextId(nextId + 1);
  // };

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

  const changeGeometry = (id, geometry) => {
    const newObjects = structuredClone(objects);
    newObjects[id].geometry = geometry;
    setObjects(newObjects);
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
    newObjects[id].position[axis] = Number(value);
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
        <Canvas>
          <color attach="background" args={['#fed200']} />

          <Lights />

          {Object.values(objects).map((obj) => {
            switch (obj.geometry) {
              case GEOMETRY.TEXT3D:
                return <Text3DModel key={obj.iden} {...obj} />;
              case GEOMETRY.TEXT2D:
                return <Text2DModel key={obj.iden} {...obj} />;
              case GEOMETRY.BOX:
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
        changeGeometry={changeGeometry}
        changeMaterial={changeMaterial}
        changeColor={changeColor}
        changeScale={changeScale}
        changePosition={changePosition}
        changeRotation={changeRotation}
        // addObject={addObject}
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
  const { iden, material, color } = props;

  console.log(`### RENDER ${iden} ###`);

  // Very helpful resource:
  // https://sbcode.net/react-three-fiber/use-memo/
  // Only create a new material if the `material` or `color` props have changed.
  // Without useMemo, we would be unnecessarily creating a new instance of
  // THREE.Material every time we change the position (but not the material).

  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  // This code can show us if we are creating a new instance of geometry or
  // material when this component re-renders. If the uuid is unchanged, we
  // are re-using the current instance. If the uuid is changed, we are creating
  // a new instance.
  const ref = useRef();
  useEffect(() => {
    console.log('geometry:', ref.current.geometry.uuid);
    console.log('material:', ref.current.material.uuid);
  });

  return (
    <mesh ref={ref} {...props} material={memoMaterial}>
      <boxGeometry />
    </mesh>
  );
}

function Text3DModel(props) {
  const { iden, scale, rotation, material, color, text } = props;

  console.log(`### RENDER ${iden} ###`);

  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  return (
    <Center
      scale={scale}
      position={props.position}
      rotation={rotation.map((degrees) => THREE.MathUtils.degToRad(degrees))}
      onCentered={() => {
        /* Without this, the text would not dynamically re-center*/
      }}
    >
      <Text3D
        font="./src/assets/Inter_Regular.json"
        lineHeight={0.7}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
        material={memoMaterial}
      >
        {text}
      </Text3D>
    </Center>
  );
}

function Text2DModel({ children, ...props }) {
  const { iden, text, scale, position, rotation, color, material } = props;

  console.log(`### RENDER ${iden} ###`);

  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  return (
    <Text
      position={position}
      rotation={rotation.map((degrees) => THREE.MathUtils.degToRad(degrees))}
      material={memoMaterial}
      font="./src/assets/Inter_Regular.json"
      fontSize={1}
      scale={scale}
    >
      {text}
    </Text>
  );
}

function createThreeMaterial(material, color) {
  console.log('call: createThreeMaterial');
  if (material === MATERIAL.NORMAL) {
    return new THREE.MeshNormalMaterial();
  } else if (material === MATERIAL.PHONG) {
    return new THREE.MeshPhongMaterial({ color });
  } else if (material === MATERIAL.BASIC) {
    return new THREE.MeshBasicMaterial({ color });
  }
}

export default App;
