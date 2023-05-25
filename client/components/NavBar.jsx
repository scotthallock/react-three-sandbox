import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const NavBar = () => {
  const {
    auth: [user, setUser],
  } = useAuth();

  return (
    <div className="flex gap-4 items-center">
      <Logo />
      {user?.username ? (
        <>
          <div className="ml-auto">{user.username}</div>
          <button
            onClick={() => setUser(null)}
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
    </div>
  );
};

export default NavBar;
