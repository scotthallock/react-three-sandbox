import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport, useHelper } from '@react-three/drei';

import GridModel from './components/models/GridModel';
import LightCollection from './components/lights/LightCollection';
import ModelCollection from './components/models/ModelCollection';

import NavBar from './components/NavBar';
import ControlPanelContainer from './components/controls/ControlPanelContainer';

import initialScene from '../utils/initialScene';
import initialLights from '../utils/initialLights';
import initialModels from '../utils/initialModels';
import defaultModels from '../utils/defaultModels';

import { getAllScenes, getSceneById } from './actions/actions';

import { AXIS, GEOMETRY, MATERIAL, ACTION, SCENE_ACTION, LIGHT_ACTION } from '../utils/types';

function App() {
  const [sceneId] = useState(uuidv4());
  const [scene, setScene] = useState(initialScene);
  const [lights, setLights] = useState(initialLights);
  const [models, setModels] = useState(initialModels);

  const handleSceneAction = (action, value, argNo) => {
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
        newScene.gridSize[argNo] = value;
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

  const handleLightAction = (action, uuid, value, argNo) => {
    if (!lights[uuid]) throw new Error('uuid invalid');
    const newLights = structuredClone(lights);

    switch (action) {
      case LIGHT_ACTION.ADD_LIGHT:
        console.log('ADD_LIGHT');
        break;
      case LIGHT_ACTION.DELETE_LIGHT:
        delete newLights[uuid];
        break;
      case LIGHT_ACTION.DUPLICATE_LIGHT:
        const duplicate = structuredClone(newLights[uuid]);
        const newUuid = uuidv4();
        duplicate.uuid = newUuid;
        duplicate.position[AXIS.X] += 0.5;
        duplicate.position[AXIS.Z] += 0.5;
        newLights[newUuid] = duplicate;
        break;
      case LIGHT_ACTION.CHANGE_TYPE:
        newLights[uuid].type = value;
        break;
      case LIGHT_ACTION.CHANGE_POSITION:
        newLights[uuid].position[argNo] = value;
        break;
      case LIGHT_ACTION.CHANGE_COLOR:
        newLights[uuid].color = value;
        break;
      case LIGHT_ACTION.CHANGE_ANGLE:
        newLights[uuid].angle = value;
        break;
      case LIGHT_ACTION.CHANGE_INTENSITY:
        newLights[uuid].intensity = value;
        break;
      case LIGHT_ACTION.TOGGLE_HELPER:
        newLights[uuid].helper = !newLights[uuid].helper;
        break;
      case LIGHT_ACTION.CHANGE_HELPER_COLOR:
        newLights[uuid].helperColor = value;
        break;
      default:
        return;
    }

    setLights(newLights);
  };

  const addNewModel = (geometry) => {
    const newObject = defaultModels[geometry];
    if (!newObject) throw new Error(`No defaults are configured for ${geometry}`);
    const newUuid = uuidv4();
    newObject.uuid = newUuid;
    setModels({ ...models, [newUuid]: newObject });
  };

  const handleAction = (action, uuid, value, argNo) => {
    if (!models[uuid]) throw new Error('uuid invalid');
    const newModels = structuredClone(models);

    switch (action) {
      case ACTION.DELETE_OBJECT:
        delete newModels[uuid];
        break;
      case ACTION.DUPLICATE_OBJECT: {
        const duplicate = structuredClone(newModels[uuid]);
        const newUuid = uuidv4();
        duplicate.uuid = newUuid;
        duplicate.position[AXIS.X] += 0.5;
        duplicate.position[AXIS.Z] += 0.5;
        newModels[newUuid] = duplicate;
        break;
      }
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
    <main>
      <NavBar
        addNewModel={addNewModel}
        sceneId={sceneId}
        scene={scene}
        lights={lights}
        models={models}
      />
      <div
        id="canvas-container"
        className="aspect-[1.91/1] m-4 rounded-[10px] overflow-hidden shadow-md"
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <color attach="background" args={[scene.backgroundColor]} />

          {scene.showGrid ? <GridModel {...scene} /> : null}

          {scene.showGizmo ? (
            <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
              <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
            </GizmoHelper>
          ) : null}

          <LightCollection lights={lights} />

          <ModelCollection models={models} />

          <OrbitControls makeDefault enableDamping={false} regress />
        </Canvas>
      </div>

      <ControlPanelContainer
        scene={scene}
        handleSceneAction={handleSceneAction}
        lights={lights}
        handleLightAction={handleLightAction}
        models={models}
        handleAction={handleAction}
      />

      <div className="m-4 bg-zinc-500">
        <button onClick={getAllScenes}>GET ALL SCENES</button>
      </div>
    </main>
  );
}

export default App;
