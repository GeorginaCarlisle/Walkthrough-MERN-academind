import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users/>} />
        <Route path="/places/new" element={<NewPlace/>} />
        {/* the /* path will pick up any urls for which there is no matching path */}
        <Route path="/*" element={<Users/>} />
        {/* A different option: <Route path="/*" element={<Navigate to="/" replace />} /> */}
        {/* 404 page is probably a good idea here */}

      </Routes>
    </Router>
  );
};

export default App;
