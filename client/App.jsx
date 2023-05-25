import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Landing from './pages/Landing';
import SceneCreator from './pages/SceneCreator';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/scene/" element={<SceneCreator />} />
        <Route path="/scene/:sceneId" element={<SceneCreator />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
