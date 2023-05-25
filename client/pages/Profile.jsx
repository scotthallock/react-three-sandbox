import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import SceneCard from '../components/SceneCard';
import { getScenesByUser } from '../actions/actions';
import { useAuth } from '../components/AuthContext';

const Profile = () => {
  const { username } = useParams();
  const [scenes, setScenes] = useState(null);
  const {
    auth: [user, setUser],
    logout,
  } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await getScenesByUser(username);
      console.log('GOT SCENES FROM USER');
      console.log(data);
      setScenes(data);
    })();
  }, []);

  return (
    <main className="m-4 flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Link to="/">
          <Logo />
        </Link>
        <span className="ml-auto">{username}</span>
        <Link to="/scene">
          <div className="rounded-[12px] p-[2px] bg-gradient-to-br from-blue-400 via-cyan-400 to-emerald-500">
            <div className="rounded-[10px] bg-zinc-900 shadow-900 p-3 hover:text-emerald-500">
              New Scene
            </div>
          </div>
        </Link>
        <button
          onClick={logout}
          className="bg-zinc-900 shadow-900 rounded-[10px] p-3 hover:text-emerald-500"
        >
          Log Out
        </button>
      </div>

      <h1 className="text-xl text-center tracking-widest [text-shadow:_2px_4px_3px_rgb(0_0_0_/_40%)]">
        {scenes ? `SAVED SCENES (${scenes.length})` : 'SAVED SCENES'}
      </h1>

      {scenes && (
        <div className="flex flex-col-reverse items-center gap-4">
          {scenes.map((props, i) => (
            <SceneCard {...props} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Profile;
