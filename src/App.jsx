import * as THREE from 'three';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, Text, Text3D } from '@react-three/drei';

import ControlPanelContainer from './components/ControlPanelContainer';

import Text3DModel from './components/models/Text3DModel';
import TextModel from './components/models/TextModel';

import { AXIS, GEOMETRY, MATERIAL, ACTION } from '../utils/types';

console.log(MATERIAL);

const initialObjects = {
  0: {
    uuid: 0,
    name: 'sup',
    geometry: GEOMETRY.Text3D,
    material: MATERIAL.Normal,
    color: '#00ff00',
    text: 'sup',
    args: [1, 1, 1],
    scale: 1,
    position: [0, 0, 0],
    rotationDeg: [0, 0, 0],
    rotationRad: [0, 0, 0],
  },
  1: {
    uuid: 1,
    name: 'hello',
    geometry: GEOMETRY.Text3D,
    material: MATERIAL.Phong,
    color: '#00ffff',
    text: 'hello',
    args: [1, 1, 1],
    scale: 1,
    position: [1, 2, 1],
    rotationDeg: [0, 0, 0],
    rotationRad: [0, 0, 0],
  },
  2: {
    uuid: 2,
    name: 'box',
    geometry: GEOMETRY.Box,
    material: MATERIAL.Phong,
    color: '#ff00ff',
    text: 'world',
    args: [1, 2, 1],
    scale: 2,
    position: [0, 0, 0],
    rotationDeg: [0, 0, 0],
    rotationRad: [0, 0, 0],
  },
};

function App() {
  const [objects, setObjects] = useState(initialObjects);
  const [nextId, setNextId] = useState(3); // needs to be changed
  const [backgroundColor, setBackgroundColor] = useState('#082f49');
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
        const duplicate = structuredClone(newObjects[uuid]);
        duplicate.uuid = nextId;
        duplicate.position[AXIS.X] += 0.5;
        duplicate.position[AXIS.Z] += 0.5;
        newObjects[nextId] = duplicate;
        setNextId(nextId + 1);
        break;

      case ACTION.CHANGE_NAME:
        newObjects[uuid].name = value;
        break;

      case ACTION.CHANGE_GEOMETRY:
        if (!GEOMETRY[value]) throw new Error('geometry invalid');
        newObjects[uuid].geometry = value;
        break;

      case ACTION.CHANGE_MATERIAL:
        console.log('here');
        console.log(MATERIAL[value]);
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
        newObjects[uuid].rotationDeg[argNo] = value;
        newObjects[uuid].rotationRad[argNo] = THREE.MathUtils.degToRad(value);
        break;
    }
    setObjects(newObjects);
  };

  return (
    <>
      <div
        id="canvas-container"
        className="aspect-[1.91/1] m-4 rounded-[10px] overflow-hidden shadow-md"
      >
        <Canvas>
          <color attach="background" args={[backgroundColor]} />
          <Lights />

          {Object.values(objects).map((obj) => {
            switch (obj.geometry) {
              case GEOMETRY.Text3D:
                return <Text3DModel key={obj.uuid} {...obj} />;
              case GEOMETRY.Text:
                return <TextModel key={obj.uuid} {...obj} />;
              case GEOMETRY.Box:
                return <BoxObject key={obj.uuid} {...obj} />;
              case GEOMETRY.Sphere:
                return <SphereObject key={obj.uuid} {...obj} />;
              default:
                return null;
            }
          })}

          {showGridHelper ? <gridHelper /> : null}
          <OrbitControls makeDefault enableDamping={false} />
        </Canvas>
      </div>

      <ControlPanelContainer models={objects} handleAction={handleAction} />
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
  const { material, color, args, position, rotationRad } = props;

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
    <Center onCentered={() => {}} position={position} rotation={rotationRad}>
      <mesh ref={ref} material={memoMaterial}>
        <boxGeometry args={args} />
      </mesh>
    </Center>
  );
}

function SphereObject(props) {
  const { material, color, args, position, rotationRad } = props;

  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  return (
    <mesh material={memoMaterial} position={position} rotation={rotationRad}>
      <sphereGeometry args={args} />
    </mesh>
  );
}

function createThreeMaterial(material, color) {
  if (material === MATERIAL.Normal) {
    return new THREE.MeshNormalMaterial();
  } else if (material === MATERIAL.Phong) {
    return new THREE.MeshPhongMaterial({ color });
  } else if (material === MATERIAL.Basic) {
    return new THREE.MeshBasicMaterial({ color });
  } else if (material === MATERIAL.Toon) {
    return new THREE.MeshToonMaterial({ color });
  } else if ((material = MATERIAL.Standard)) {
    return new THREE.MeshStandardMaterial({ color });
  }
}

export default App;
