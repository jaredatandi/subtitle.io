import './App.css';
import AppRoutes from 'routes/AppRoutes';
import Spinner from 'components/shared/Spinner/Spinner';
import useEffectsHelper from 'helpers/effects/EffectsHelper';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import useThemeHelper from 'helpers/theme/ThemeHelper';

function App() {
  const { isLoading } = useEffectsHelper();
  const { handleThemeToggle } = useThemeHelper();
  console.log(handleThemeToggle);
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
        {isLoading && (
          <div className="flex items-center justify-center fixed top-0 right-0 w-screen h-screen z-50 bg-opacity-50 bg-gray-200">
            <Spinner />
          </div>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
