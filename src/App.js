import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Section01 from './pages/Section01';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/section01" element={<Section01 />} />
      </Routes>
    </Router>
  );
}

export default App;
