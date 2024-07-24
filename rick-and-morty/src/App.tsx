import React from 'react';

//rotas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Characters from './pages/Characters/Characters';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';
import Episodes from './pages/Episodes/Episodes';
import EpisodeDetail from './pages/EpisodeDetail/EpisodeDetail';
import Locations from './pages/Locations/Locations';
import LocationDetail from './pages/LocationDetail/LocationDetail';

//
import './App.css'

const App: React.FC = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<EpisodeDetail />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:id" element={<LocationDetail />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
