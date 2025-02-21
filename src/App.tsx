import React from 'react';
import './App.css';
import HomePage from './page/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRoutes } from './infrastructure/router';
import { PrivateRoute } from './infrastructure/router/private-router';
import Authenticate from './page/Auth/Authenticate';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {privateRoutes.map((page, index) => {
            if (page.private) {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <PrivateRoute component={<page.component />} />
                  } />
              )
            }
            else {              
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <page.component />
                  } />
              )
            }
          })}
          <Route path="/authenticate" element={<Authenticate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
