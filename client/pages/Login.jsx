import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Login = () => {
  return (
    <main className="m-4 flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/signup" className="ml-auto">
          <div className="bg-zinc-900 shadow-900 rounded-[10px] p-3 hover:text-emerald-500">
            Sign Up
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center">
        <div className="rounded-[12px] p-[2px] bg-gradient-to-br from-blue-400 via-cyan-400 to-emerald-500">
          <div className="flex flex-col gap-2 bg-zinc-900 p-10 rounded-[10px]">
            <span className="text-center mb-4">Log In</span>
            <label htmlFor="username" className="text-gray-400">
              Username or email
            </label>
            <input
              name="username"
              type="text"
              className="bg-gray-700 px-2 py-1 rounded-[3px] mb-4"
            />

            <label htmlFor="password" className="text-gray-400">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="bg-gray-700 px-2 py-1 rounded-[3px] mb-4"
            />

            <div className="flex justify-center">
              <button
                className="hover:text-emerald-500"
                onClick={() => console.log('clicked submti')}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
