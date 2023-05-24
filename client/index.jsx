import React from 'react';
import { createRoot } from 'react-dom/client';
import SceneCreator from './SceneCreator';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SceneCreator />
    </BrowserRouter>
  </React.StrictMode>
);
