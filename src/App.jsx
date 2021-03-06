import { useState, useRef, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Editor from './pages/Editor';
import GlobalHotkey from './components/GlobalHotkey';

function App() {
  return (
    <div className="relative flex w-full flex-col  bg-gray-300">
      <GlobalHotkey />
      <Switch>
        <Route
          exact
          path="/"
          component={Editor}
        />
      </Switch>
    </div>
  );
}

export default App;
