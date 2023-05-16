import * as THREE from 'three';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, Text, Text3D } from '@react-three/drei';
import ObjectControlTable from './components/ObjectControlTable';

import { AXIS, GEOMETRY, MATERIAL, ACTION } from './types';

import ObjectControl from './components/ObjectControl';

const initialObjects = {
  0: {
    iden: 0,
    geometry: GEOMETRY.TEXT3D,
    material: MATERIAL.NORMAL,
    color: '#00ff00',
    text: 'sup',
    args: [1, 1, 1],
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  1: {
    iden: 1,
    geometry: GEOMETRY.TEXT3D,
    material: MATERIAL.PHONG,
    color: '#00ffff',
    text: 'hello',
    args: [1, 1, 1],
    scale: 1,
    position: [1, 2, 1],
    rotation: [0, 0, 0],
  },
  2: {
    iden: 2,
    geometry: GEOMETRY.BOX,
    material: MATERIAL.PHONG,
    color: '#ff00ff',
    text: 'world',
    args: [1, 2, 1],
    scale: 2,
    position: [1.4, 1.4, 0],
    rotation: [0, 10, 5],
  },
};

function App() {
  const [objects, setObjects] = useState(initialObjects);
  const [nextId, setNextId] = useState(3); // needs to be changed
  const [backgroundColor, setBackgroundColor] = useState('#fed200');
  const [showGridHelper, setShowGridHelper] = useState(true);

  const handleAction = (action, uuid, value, argNo) => {
    if (!objects[uuid]) throw new Error('uuid invalid');
    const newObjects = structuredClone(objects);
    switch (action) {
      case ACTION.ADD_OBJECT:
        console.log('ADD_OBJECT');
        break;

      case ACTION.DELETE_OBJECT:
        delete newObjects[uuid];
        break;

      case ACTION.DUPLICATE_OBJECT:
        const duplicate = structuredClone(newObjects[id]);
        duplicate.iden = nextId;
        // Offset the new duplicate object so you see it
        duplicate.position[AXIS.X] += 0.5;
        duplicate.position[AXIS.Z] += 0.5;
        newObjects[nextId] = duplicate;
        setNextId(nextId + 1);
        break;

      case ACTION.CHANGE_GEOMETRY:
        if (!GEOMETRY[value]) throw new Error('geometry invalid');
        newObjects[uuid].geometry = value;
        break;

      case ACTION.CHANGE_MATERIAL:
        if (!MATERIAL[value]) throw new Error('material invalid');
        newObjects[uuid].material = value;
        break;

      case ACTION.CHANGE_COLOR:
        newObjects[uuid].color = value;
        break;

      case ACTION.CHANGE_TEXT:
        newObjects[uuid].text = value;
        break;

      case ACTION.CHANGE_ARGS:
        if (typeof argNo !== 'number') throw new Error('argNo invalid');
        newObjects[uuid].args[argNo] = value;
        break;

      case ACTION.CHANGE_SCALE:
        newObjects[uuid].scale = value;
        break;

      case ACTION.CHANGE_POSITION:
        newObjects[uuid].position[argNo] = value;
        break;

      case ACTION.CHANGE_ROTATION:
        // should there be a `rotationDeg` and a `rotationRad` ?
        newObjects[uuid].rotation[argNo] = value;
        break;
    }
    setObjects(newObjects);
  };

  return (
    <>
      {/* <h1 className="text-xl select-none font-medium uppercase text-gray-200 mt-4 ml-4">
        React Three Sandbox
      </h1> */}
      <div id="canvas-container" className="aspect-[1.91/1] m-4 shadow-lg">
        <Canvas>
          <color attach="background" args={[backgroundColor]} />
          <Lights />

          {Object.values(objects).map((obj) => {
            switch (obj.geometry) {
              case GEOMETRY.TEXT3D:
                return <Text3DModel key={obj.iden} {...obj} />;
              case GEOMETRY.TEXT2D:
                return <Text2DModel key={obj.iden} {...obj} />;
              case GEOMETRY.BOX:
                return <BoxObject key={obj.iden} {...obj} />;
              case GEOMETRY.SPHERE:
                return <SphereObject key={obj.iden} {...obj} />;
              default:
                return null;
            }
          })}

          {showGridHelper ? <gridHelper /> : null}
          <OrbitControls makeDefault enableDamping={false} />
        </Canvas>
      </div>

      <ObjectControl />

      {/* <div className="bg-gray-800 m-4 flex gap-4">
        <input
          type="color"
          className="bg-none outline-none border-none"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
        <input
          type="checkbox"
          checked={showGridHelper}
          onChange={() => setShowGridHelper(!showGridHelper)}
        />
      </div> */}

      <ObjectControlTable
        objects={objects}
        handleAction={handleAction} // yea
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

// Very helpful resource:
// https://sbcode.net/react-three-fiber/use-memo/
// Only create a new material if the `material` or `color` props have changed.
// Without useMemo, we would be unnecessarily creating a new instance of
// THREE.Material every time we change the position (but not the material).

function BoxObject(props) {
  const { material, color, args, position, rotation } = props;

  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  // This code can show us if we are creating a new instance of geometry or
  // material when this component re-renders. If the uuid is unchanged, we
  // are re-using the current instance. If the uuid is changed, we are creating
  // a new instance.
  const ref = useRef();
  // useEffect(() => {
  //   console.log('geometry:', ref.current.geometry.uuid);
  //   console.log('material:', ref.current.material.uuid);
  // });

  return (
    <Center onCentered={() => {}} position={position} rotation={rotation}>
      <mesh ref={ref} material={memoMaterial}>
        <boxGeometry args={args} />
      </mesh>
    </Center>
  );
}

function SphereObject(props) {
  const { material, color, args, position, rotation } = props;

  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  return (
    <Center onCentered={() => {}} position={position} rotation={rotation}>
      <mesh material={memoMaterial}>
        <sphereGeometry args={args} />
      </mesh>
    </Center>
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
  if (material === MATERIAL.NORMAL) {
    return new THREE.MeshNormalMaterial();
  } else if (material === MATERIAL.PHONG) {
    return new THREE.MeshPhongMaterial({ color });
  } else if (material === MATERIAL.BASIC) {
    return new THREE.MeshBasicMaterial({ color });
  } else if (material === MATERIAL.TOON) {
    return new THREE.MeshToonMaterial({ color });
  } else if ((material = MATERIAL.STANDARD)) {
    return new THREE.MeshStandardMaterial({ color });
  }
}

export default App;
