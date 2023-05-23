import { LIGHT } from '../../../utils/types';
import AmbientLight from './AmbientLight';
import DirectionalLight from './DirectionalLight';
import SpotLight from './SpotLight';
import PointLight from './PointLight';

const LightCollection = ({ lights }) =>
  Object.values(lights).map((light) => {
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
  });

export default LightCollection;
