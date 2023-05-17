import * as THREE from 'three';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Text3DModel from './components/models/Text3DModel';
import TextModel from './components/models/TextModel';
import BoxModel from './components/models/BoxModel';
import initialModels from '../utils/initialModels';
import ControlPanelContainer from './components/ControlPanelContainer';

import { AXIS, GEOMETRY, MATERIAL, ACTION } from '../utils/types';

function App() {
  const [objects, setObjects] = useState(initialModels);
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
                return <BoxModel key={obj.uuid} {...obj} />;
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

export default App;
