import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users/>} />
          <Route path="/places/new" element={<NewPlace/>} />
          <Route path="/:userId/places" element={<UserPlaces/>}></Route>
          {/* the /* path will pick up any urls for which there is no matching path */}
          <Route path="/*" element={<Users/>} />
          {/* A different option: <Route path="/*" element={<Navigate to="/" replace />} /> */}
          {/* 404 page is probably a good idea here */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
