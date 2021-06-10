import { useState, useRef, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Editor from './pages/Editor';

const App = () => {
  return (
    <div className="relative flex w-full  bg-gray-400">
      <Switch>
        <Route
          exact
          path="/"
          component={Editor}
        />
      </Switch>
    </div>
  );
};

export default App;
