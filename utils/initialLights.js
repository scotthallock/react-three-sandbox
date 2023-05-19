import { LIGHT } from './types';

const initialLights = {
  0: {
    uuid: 0,
    name: 'ambient light',
    type: LIGHT.Ambient,
    position: null,
    color: '#ffffff',
    angle: 0,
    intensity: 0.5,
    helper: false,
  },
  1: {
    uuid: 1,
    name: 'spot light',
    type: LIGHT.SpotLight,
    position: [10, 10, 10],
    color: '#00ffff',
    angle: 0.14,
    intensity: 1,
    helper: true,
  },
  2: {
    uuid: 2,
    name: 'point light',
    type: LIGHT.PointLight,
    position: [2, 2, 2],
    color: '#ff0000',
    angle: 0.14,
    intensity: 10,
    helper: true,
  },
  3: {
    uuid: 3,
    name: 'directional light',
    type: LIGHT.DirectionalLight,
    position: [4, -4, 4],
    color: '#ffff00',
    angle: 0.14,
    intensity: 10,
    helper: true,
  },
};

export default initialLights;
