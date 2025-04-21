import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRoutes } from './infrastructure/router';
import { PrivateRoute } from './infrastructure/router/private-router';
import Authenticate from './page/Auth/Authenticate';
import { ROUTE_PATH } from './core/common/appRouter';
import LoginScreen from './page/Auth/LoginScreen';
import RegisterScreen from './page/Auth/RegisterScreen';
import { PublicRoute } from './infrastructure/router/public-router';

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
          <Route path={ROUTE_PATH.LOGIN} element={<PublicRoute component={<LoginScreen />} />} />
          <Route path={ROUTE_PATH.REGISTER} element={<PublicRoute component={<RegisterScreen />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
