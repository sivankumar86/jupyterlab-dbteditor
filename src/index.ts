import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab-dbteditor extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-dbteditor:plugin',
  description: 'A Jupyterlab extension for DBT jobs',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-dbteditor is activated!');
  }
};

export default plugin;
