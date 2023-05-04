import React, { createContext, useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import namer from 'color-namer';
import { Routes, Route } from 'react-router-dom';

// Import Components
import Layout from './components/layout/Layout';

// Import Pages
import Colors from './pages/Colors';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

// createContext
export const ThemeContext = createContext(null);
export const ColorsContext = createContext(null);
export const ModalsContext = createContext(null);

function App() {
  // INITIAL: Theme state
  const [theme, setTheme] = useState(null);

  // INITIAL: Colors state
  const [colors, setColors] = useState([
    { id: 1, color: '', isLocked: false, name: '' },
    { id: 2, color: '', isLocked: false, name: '' },
    { id: 3, color: '', isLocked: false, name: '' },
    { id: 4, color: '', isLocked: false, name: '' },
    { id: 5, color: '', isLocked: false, name: '' },
  ]);

  // INITIAL: Modals state
  const [modals, setModals] = useState({
    saveModal: false,
    exportModal: false,
  });

  // INITIAL: Saved colors state
  const [savedColors, setSavedColors] = useState(() => {
    const saved = localStorage.getItem('savedColors');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  // FUNCTION: Toggles theme between light/dark
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    saveUserSettings();
  };

  if (!theme) {
    loadUserSettings();
  }

  // FUNCTION: Load user settings if not it's not on default
  function loadUserSettings() {
    let userSettings = localStorage.getItem('userSettings');
    if (userSettings) {
      userSettings = JSON.parse(userSettings);
      setTheme(userSettings.theme);
    } else {
      defaultSettings();
    }
  }

  // FUNCTION: Default theme setting
  function defaultSettings() {
    setTheme('light');
  }

  // FUNCTION: Saves user settings
  function saveUserSettings() {
    let toggleTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(
      'userSettings',
      JSON.stringify({ theme: toggleTheme })
    );
  }

  const openModals = (modalName) => {
    return setModals({ ...modals, [modalName]: true });
  };

  const closeModals = (modalName) => {
    return setModals({ ...modals, [modalName]: false });
  };

  function colorName(color) {
    return namer(color, { pick: ['ntc'] }).ntc[0].name;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ColorsContext.Provider
          value={{ colors, setColors, savedColors, setSavedColors, colorName }}
        >
          <ModalsContext.Provider
            value={{ modals, setModals, closeModals, openModals }}
          >
            <div className="App" id={theme}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Colors />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </div>
          </ModalsContext.Provider>
        </ColorsContext.Provider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
