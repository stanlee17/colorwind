import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Routes, Route } from 'react-router-dom';

// Import Components
import Sidebar from './components/layout/Sidebar';

// Import Pages
import GeneratePalette from './pages/GeneratePalette';
import Home from './pages/Home';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar />
      <div style={{ marginLeft: '20%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate-palette" element={<GeneratePalette />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
