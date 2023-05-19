import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport, useHelper } from '@react-three/drei';

import GridModel from './components/models/GridModel';
import Text3DModel from './components/models/Text3DModel';
import TextModel from './components/models/TextModel';
import BoxModel from './components/models/BoxModel';
import SphereModel from './components/models/SphereModel';

import AmbientLight from './components/lights/AmbientLight';
import DirectionalLight from './components/lights/DirectionalLight';
import SpotLight from './components/lights/SpotLight';
import PointLight from './components/lights/PointLight';

import ControlPanelContainer from './components/controls/ControlPanelContainer';

import initialScene from '../utils/initialScene';
import initialLights from '../utils/initialLights';
import initialModels from '../utils/initialModels';

import {
  LIGHT,
  AXIS,
  GEOMETRY,
  MATERIAL,
  ACTION,
  SCENE_ACTION,
  LIGHT_ACTION,
} from '../utils/types';

function App() {
  const [scene, setScene] = useState(initialScene);
  const [lights, setLights] = useState(initialLights);
  const [models, setModels] = useState(initialModels);

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
        const newUuid = uuidv4();
        duplicate.uuid = newUuid;
        duplicate.position[AXIS.X] += 0.5;
        duplicate.position[AXIS.Z] += 0.5;
        newModels[newUuid] = duplicate;
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
    <main>
      <nav className="m-4 flex flex-row items-center gap-4 text-gray-400 font-mono font-medium">
        <div className="flex flex-row items-center select-none">
          <h1 className="text-3xl text-violet-400 -skew-y-12">EZ</h1>
          <h1 className="text-3xl text-emerald-500 -skew-y-12">3D</h1>
        </div>

        <div className="flex flex-col gap-1">
          <div>
            <div className="fill-gray-100 flex flex-row gap-4">
              <span className="text-sm text-gray-100">a really cool scene</span>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="18px"
                  width="18px"
                >
                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </svg>
              </button>
            </div>
          </div>
          <span className="text-[11px]">scotth</span>
        </div>

        <button className="ml-auto text-sm">save</button>
        <button className="text-sm">profile</button>
      </nav>
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

          {Object.values(lights).map((light) => {
            switch (light.type) {
              case LIGHT.Ambient:
                return <AmbientLight key={light.uuid} {...light} />;
              case LIGHT.DirectionalLight:
                return <DirectionalLight key={light.uuid} {...light} />;
              case LIGHT.SpotLight:
                return <SpotLight key={light.uuid} {...light} />;
              case LIGHT.PointLight:
                return <PointLight key={light.uuid} {...light} />;
              default:
                return null;
            }
          })}

          {Object.values(models).map((model) => {
            switch (model.geometry) {
              case GEOMETRY.Text3D:
                return <Text3DModel key={model.uuid} {...model} />;
              case GEOMETRY.Text:
                return <TextModel key={model.uuid} {...model} />;
              case GEOMETRY.Box:
                return <BoxModel key={model.uuid} {...model} />;
              case GEOMETRY.Sphere:
                return <SphereModel key={model.uuid} {...model} />;
              default:
                return null;
            }
          })}

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
    </main>
  );
}

export default App;
