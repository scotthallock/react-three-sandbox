import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { login } from '../actions/actions';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await login({ usernameOrEmail, password });
    console.log(data);
    if (data.err) {
      setErrorMessage(data.err.message);
    } else {
      navigate(`/user/${data.username}`);
    }
  };

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
        <h1 className="text-center mb-4 text-xl tracking-widest	[text-shadow:_2px_4px_3px_rgb(0_0_0_/_40%)]">
          LOG IN
        </h1>

        <div className="rounded-[12px] p-[2px] bg-gradient-to-br from-blue-400 via-cyan-400 to-emerald-500">
          <div className="flex flex-col gap-2 bg-zinc-900 p-10 rounded-[10px]">
            <label htmlFor="usernameOrEmail" className="text-gray-400">
              Username or email
            </label>
            <input
              name="usernameOrEmail"
              type="text"
              className="bg-gray-700 px-2 py-1 rounded-[3px] mb-4"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />

            <label htmlFor="password" className="text-gray-400">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="bg-gray-700 px-2 py-1 rounded-[3px] mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errorMessage && <span className="text-red-400 mb-4">{errorMessage}</span>}

            <div className="flex justify-center">
              <button className="hover:text-emerald-500" onClick={handleLogin}>
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
