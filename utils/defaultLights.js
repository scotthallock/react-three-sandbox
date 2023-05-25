import { LIGHT } from './types';

const defaultLights = {
  [LIGHT.SpotLight]: {
    uuid: null,
    name: 'spot light',
    type: LIGHT.SpotLight,
    position: [10, 10, 10],
    color: '#ffffff',
    angle: 0.14,
    intensity: 1,
    helper: true,
  },
  [LIGHT.PointLight]: {
    uuid: null,
    name: 'point light',
    type: LIGHT.PointLight,
    position: [2, 2, 2],
    color: '#ff0000',
    angle: 0.14,
    intensity: 1,
    helper: true,
  },
  [LIGHT.DirectionalLight]: {
    uuid: null,
    name: 'directional light',
    type: LIGHT.DirectionalLight,
    position: [0, 4, 4],
    color: '#ffffff',
    angle: 0.14,
    intensity: 1,
    helper: true,
  },
};

export default defaultLights;
