import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './page/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRoutes } from './infrastructure/router';
import { PrivateRoute } from './infrastructure/router/private-router';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
