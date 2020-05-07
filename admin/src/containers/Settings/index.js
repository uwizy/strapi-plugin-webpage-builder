import React from 'react'; // eslint-disable-line import/no-unresolved
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'; // eslint-disable-line import/no-unresolved
import { Button } from '@buffetjs/core'; // eslint-disable-line import/no-unresolved
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // eslint-disable-line import/no-unresolved
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // eslint-disable-line import/no-unresolved
import pluginId from '../../pluginId';

const GeneralBlock = () => (
  <div>
    <h1>General</h1>
  </div>
);
const AboutBlock = () => (
  <div>
    <h1>About</h1>
    <p>
      This plugin has been developed by{' '}
      <a href="https://uwizy.com" target="_blank" rel="noopener noreferrer">
        Uwizy
      </a>
      <hr />
      <Button color="secondary" icon={<FontAwesomeIcon icon={faGithub} />}>
        Github
      </Button>
      <br />
    </p>
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
