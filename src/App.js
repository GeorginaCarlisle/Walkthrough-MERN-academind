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
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
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
      isLoggedIn: !!token,
      token: token,
      userId: userId,
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
