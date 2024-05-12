import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users/>} />
        <Route path="/places/new" element={<NewPlace/>} />
        <Route path="/:userId/places" element={<UserPlaces/>}></Route>
        <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
        {/* the /* path will pick up any urls for which there is no matching path */}
        <Route path="/*" element={<Users/>} />
        {/* A different option: <Route path="/*" element={<Navigate to="/" replace />} /> */}
        {/* 404 page is probably a good idea here */}
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users/>} />
        <Route path="/:userId/places" element={<UserPlaces/>}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/*" element={<Auth />} />
      </React.Fragment>
      
    );
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout
    }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            {routes}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
