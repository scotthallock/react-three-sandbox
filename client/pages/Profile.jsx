import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';

const Profile = () => {
  const { username } = useParams();
  const [scenes, setScenes] = useState(null);

  useEffect(() => {
    // fetches the scenes that this user authored
  });

  return (
    <main className="m-4 flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Link to="/">
          <Logo />
        </Link>
        <span className="ml-auto">{username}</span>
        <Link to="/">
          <div className="bg-zinc-900 shadow-900 rounded-[10px] p-3 hover:text-emerald-500">
            Log Out
          </div>
        </Link>
      </div>

      <div className="flex">
        <Link to="/scene">
          <div className="rounded-[12px] p-[2px] bg-gradient-to-br from-blue-400 via-cyan-400 to-emerald-500">
            <div className="rounded-[10px] bg-zinc-900 shadow-900  p-3 hover:text-emerald-500">
              New Scene
            </div>
          </div>
        </Link>
      </div>

      <h1 className="mb-4 text-xl tracking-widest	[text-shadow:_2px_4px_3px_rgb(0_0_0_/_40%)]">
        YOUR SCENES
      </h1>

      <div>scene 1</div>
      <div>scene 2</div>
      <div>scene 3</div>
      <div>scene 4</div>
    </main>
  );
};

export default Profile;
