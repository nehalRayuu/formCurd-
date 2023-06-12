import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Tables from './components/Tables';

const App = () => {
 

  return (
    <Router>
   <Routes>
        <Route
          path="/"
          element={<Form  />}
        />
        <Route
          path="/table"
          element={
            <Tables
             
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
