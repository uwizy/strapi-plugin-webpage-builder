import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import pluginId from '../../pluginId';

const GeneralBlock = () => (
  <div>
    <h1>Setting Page 1</h1>
  </div>
);
const AboutBlock = () => (
  <div>
    <h1>Setting Page 2</h1>
  </div>
);

const Settings = ({ settingsBaseURL }) => {
  return (
    <Switch>
      <Route component={GeneralBlock} path={`${settingsBaseURL}/${pluginId}/general`} />
      <Route component={AboutBlock} path={`${settingsBaseURL}/${pluginId}/about`} />
    </Switch>
  );
};

Settings.propTypes = {
  settingsBaseURL: PropTypes.string.isRequired,
};

export default Settings;
