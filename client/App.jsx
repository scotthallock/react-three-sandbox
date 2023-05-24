import { Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing';
import SceneCreator from './pages/SceneCreator';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/scene" element={<SceneCreator />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:username" element={<Profile />} />
    </Routes>
  );
};

export default App;
