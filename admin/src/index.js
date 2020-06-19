import pluginPkg from '../../package.json';
import Wysiwyg from './components/Wysiwyg';
import pluginId from './pluginId';
import Settings from './containers/Settings';

export default (strapi) => {
  const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
  const menuSection = {
    id: pluginId,
    title: {
      id: `${pluginId}.foo`,
      defaultMessage: 'Webpage Builder',
    },
    links: [
      {
        title: 'General',
        to: `${strapi.settingsBaseURL}/${pluginId}/general`,
        name: 'general',
      },
      {
        title: {
          id: `${pluginId}.bar`,
          defaultMessage: 'About',
        },
        to: `${strapi.settingsBaseURL}/${pluginId}/about`,
        name: 'about',
      },
    ],
  };

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon: pluginPkg.strapi.icon,
    id: pluginId,
    initializer: () => null,
    injectedComponents: [],
    isReady: true,
    isRequired: pluginPkg.strapi.required || false,
    leftMenuLinks: [],
    leftMenuSections: [],
    mainComponent: null,
    name: pluginPkg.strapi.name,
    preventComponentRendering: false,
    settings: {
      mainComponent: Settings,
      menuSection,
    },
    trads: {},
  };

  strapi.registerField({ type: 'json', Component: Wysiwyg });

  return strapi.registerPlugin(plugin);
};
