import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import { PreferencesProvider } from '../hooks/preferences';
import StampsList from '../pages/StampsList';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/stamps" exact component={StampsList} />
      <PreferencesProvider>
        <Route path="/home" component={Home} isPrivate />
        <Route path="/dashboard" component={Dashboard} isPrivate />
      </PreferencesProvider>
    </Switch>
  );
};

export default Routes;
