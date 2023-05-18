import * as THREE from 'three';
import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport, useHelper } from '@react-three/drei';

import GridModel from './components/models/GridModel';
import Text3DModel from './components/models/Text3DModel';
import TextModel from './components/models/TextModel';
import BoxModel from './components/models/BoxModel';
import SphereModel from './components/models/SphereModel';

import initialModels from '../utils/initialModels';
import ControlPanelContainer from './components/ControlPanelContainer';

import { AXIS, GEOMETRY, MATERIAL, ACTION, SCENE_ACTION } from '../utils/types';

function App() {
  const [scene, setScene] = useState({
    backgroundColor: '#082f49',
    showGizmo: true,
    showGrid: true,
    gridSize: 10,
    gridCellColor: '#aaaaaa',
    gridSectionColor: '#2080ff',
    gridInfinite: true,
    gridFadeDistance: 100,
    gridYLevel: -1,
  });
  const [models, setModels] = useState(initialModels);
  const [nextId, setNextId] = useState(3); // needs to be changed

  const handleSceneAction = (action, value) => {
    const newScene = structuredClone(scene);

    switch (action) {
      case SCENE_ACTION.BACKGROUND_COLOR:
        newScene.backgroundColor = value;
        break;
      case SCENE_ACTION.SHOW_GIZMO:
        newScene.showGizmo = !newScene.showGizmo;
        break;
      case SCENE_ACTION.SHOW_GRID:
        newScene.showGrid = !newScene.showGrid;
        break;
      case SCENE_ACTION.GRID_SIZE:
        newScene.gridArgs = [value, value];
        break;
      case SCENE_ACTION.GRID_INFINITE:
        newScene.gridInfinite = !newScene.gridInfinite;
        break;
      case SCENE_ACTION.GRID_CELL_COLOR:
        newScene.gridCellColor = value;
        break;
      case SCENE_ACTION.GRID_SECTION_COLOR:
        newScene.gridSectionColor = value;
        break;
      case SCENE_ACTION.GRID_FADE_DISTANCE:
        newScene.gridFadeDistance = value;
        break;
      case SCENE_ACTION.GRID_Y_LEVEL:
        newScene.gridYLevel = value;
        break;
      default:
        return;
    }
    setScene(newScene);
  };

  const handleAction = (action, uuid, value, argNo) => {
    if (!models[uuid]) throw new Error('uuid invalid');
    const newModels = structuredClone(models);

    switch (action) {
      case ACTION.ADD_OBJECT:
        console.log('ADD_OBJECT');
        break;
      case ACTION.DELETE_OBJECT:
        delete newModels[uuid];
        break;
      case ACTION.DUPLICATE_OBJECT:
        const duplicate = structuredClone(newModels[uuid]);
        duplicate.uuid = nextId;
        duplicate.position[AXIS.X] += 0.5;
        duplicate.position[AXIS.Z] += 0.5;
        newModels[nextId] = duplicate;
        setNextId(nextId + 1);
        break;
      case ACTION.CHANGE_NAME:
        newModels[uuid].name = value;
        break;
      case ACTION.CHANGE_GEOMETRY:
        if (!GEOMETRY[value]) throw new Error('geometry invalid');
        newModels[uuid].geometry = value;
        break;
      case ACTION.CHANGE_MATERIAL:
        if (!MATERIAL[value]) throw new Error('material invalid');
        newModels[uuid].material = value;
        break;
      case ACTION.CHANGE_COLOR:
        newModels[uuid].color = value;
        break;
      case ACTION.CHANGE_TEXT:
        newModels[uuid].text = value;
        break;
      case ACTION.CHANGE_ARGS:
        if (typeof argNo !== 'number') throw new Error('argNo invalid');
        newModels[uuid].args[argNo] = value;
        break;
      case ACTION.CHANGE_SCALE:
        newModels[uuid].scale = value;
        break;
      case ACTION.CHANGE_POSITION:
        newModels[uuid].position[argNo] = value;
        break;
      case ACTION.CHANGE_ROTATION:
        newModels[uuid].rotationDeg[argNo] = value;
        newModels[uuid].rotationRad[argNo] = THREE.MathUtils.degToRad(value);
        break;
      default:
        return;
    }
    setModels(newModels);
  };

  return (
    <>
      <div
        id="canvas-container"
        className="aspect-[1.91/1] m-4 rounded-[10px] overflow-hidden shadow-md"
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <color attach="background" args={[scene.backgroundColor]} />

          <Lights />

          {Object.values(models).map((obj) => {
            switch (obj.geometry) {
              case GEOMETRY.Text3D:
                return <Text3DModel key={obj.uuid} {...obj} />;
              case GEOMETRY.Text:
                return <TextModel key={obj.uuid} {...obj} />;
              case GEOMETRY.Box:
                return <BoxModel key={obj.uuid} {...obj} />;
              case GEOMETRY.Sphere:
                return <SphereModel key={obj.uuid} {...obj} />;
              default:
                return null;
            }
          })}

          <OrbitControls makeDefault enableDamping={false} regress />

          {scene.showGrid ? <GridModel {...scene} /> : null}

          {scene.showGizmo ? (
            <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
              <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
            </GizmoHelper>
          ) : null}
        </Canvas>
      </div>

      <ControlPanelContainer
        scene={scene}
        handleSceneAction={handleSceneAction}
        models={models}
        handleAction={handleAction}
      />
    </>
  );
}

function Lights() {
  const spotlight = useRef();
  const pointlight = useRef();
  const hemisphereLight = useRef();

  useHelper(spotlight, THREE.SpotLightHelper, 'cyan');

  useHelper(pointlight, THREE.PointLightHelper, 1, 'orange');

  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight ref={spotlight} position={[10, 10, 10]} angle={0.2} penumbra={1} />
      <pointLight ref={pointlight} position={[-4, -4, -4]} intensity={5} color={'#ff0000'} />
    </>
  );
}

export default App;
