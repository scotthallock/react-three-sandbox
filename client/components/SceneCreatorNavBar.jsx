import { Link } from 'react-router-dom';
import Logo from './Logo';
import ControlButton from './ControlButton';
import NavDropdown from './NavDropdown';
import { useAuth } from './AuthContext';
import { LIGHT, GEOMETRY } from '../../utils/types';
import { saveScene } from '../actions/actions';

const lightOptions = [LIGHT.DirectionalLight, LIGHT.SpotLight, LIGHT.PointLight];
const geometryOptions = [
  GEOMETRY.Text3D,
  GEOMETRY.Text,
  GEOMETRY.Box,
  GEOMETRY.Sphere,
  GEOMETRY.Cone,
];

const SceneCreatorNavBar = (props) => {
  const { addNewModel, addNewLight, sceneId, sceneName, changeSceneName, scene, lights, models } =
    props;

  const {
    auth: [user, setUser],
    logout,
  } = useAuth();

  const handleSaveScene = async () => {
    if (!user) return alert('You must be logged in to save a scene');
    const response = await saveScene({
      sceneId,
      sceneName,
      username: user.username,
      scene,
      lights,
      models,
    });
    const data = response.json();
    console.log(data);
  };

  return (
    <>
      <nav className="m-4 flex flex-row items-center gap-4 font-mono font-medium">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex flex-col">
          <div>
            <div className="flex flex-row gap-4">
              <span
                contentEditable
                suppressContentEditableWarning
                className="text-gray-200 bg-transparent outline-none "
                onChange={changeSceneName}
              >
                {sceneName}
              </span>
              <button className="fill-gray-200 hover:fill-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="18px"
                  height="18px"
                >
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                </svg>
              </button>
            </div>
          </div>
          <span className="text-gray-400 text-[11px]">{user?.username || 'anonymous user'}</span>
        </div>
        {user?.username ? (
          <>
            <Link to={`/user/${user.username}`} className="ml-auto">
              <div className="hover:text-emerald-500">{user.username}</div>
            </Link>
            <button
              onClick={logout}
              className="bg-zinc-900 shadow-900 rounded-[10px] p-3 hover:text-emerald-500"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="ml-auto">
              <div className="bg-zinc-900 shadow-900 rounded-[10px] p-3 hover:text-emerald-500">
                Sign Up
              </div>
            </Link>
            <Link to="/login">
              <div className="bg-zinc-900 shadow-900 rounded-[10px] p-3 hover:text-emerald-500">
                Login
              </div>
            </Link>
          </>
        )}
      </nav>
      <div className="m-4 flex-wrap text-[11px] flex flex-row gap-[10px]">
        <ControlButton text="save" handleClick={handleSaveScene} />
        <NavDropdown text="+ light">
          {lightOptions.map((light, i) => (
            <button
              key={`light-${i}`}
              className="hover:text-emerald-500 whitespace-nowrap text-left"
              onClick={() => addNewLight(light)}
            >
              {light}
            </button>
          ))}
        </NavDropdown>
        <NavDropdown text="+ geometry">
          {geometryOptions.map((geometry, i) => (
            <button
              key={`geometry-${i}`}
              className="hover:text-emerald-500 whitespace-nowrap text-left"
              onClick={() => addNewModel(geometry)}
            >
              {geometry}
            </button>
          ))}
        </NavDropdown>
      </div>
    </>
  );
};

export default SceneCreatorNavBar;
