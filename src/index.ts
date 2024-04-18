
import { ICollaborativeDrive } from '@jupyter/docprovider';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer
} from '@jupyterlab/application';

import { WidgetTracker, IWidgetTracker } from '@jupyterlab/apputils';

import { Token } from '@lumino/coreutils';

import { DbtDocWidget } from './components/widget'
import { DbtDoc } from './components/model';

import {DbtDocModelFactory,DbtWidgetFactory} from './components/factory'

import { requestAPI } from './handler';


/**
 * The name of the factory that creates editor widgets.
 */
const FACTORY = 'Dbtsql editor';

// Export a token so other extensions can require it
export const IExampleDocTracker = new Token<IWidgetTracker<DbtDocWidget>>(
  'dbtsqlDocTracker'
);

/**
 * Initialization data for the documents extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: '@dbteditor:plugin',
  description:
    'Minimal JupyterLab extension for a collaborative document widget.',
  autoStart: true,
  requires: [ILayoutRestorer],
  optional: [ICollaborativeDrive],
  provides: IExampleDocTracker,
  activate: (
    app: JupyterFrontEnd,
    restorer: ILayoutRestorer,
    drive: ICollaborativeDrive | null
  ) => {
    console.log('DBT editor registered!!!')
    // Namespace for the tracker
    const namespace = 'documents-dbtsql';
    // Creating the tracker for the document
    const tracker = new WidgetTracker<DbtDocWidget>({ namespace });

    // Handle state restoration.
    if (restorer) {
      // When restoring the app, if the document was open, reopen it
      restorer.restore(tracker, {
        command: 'docmanager:open',
        args: widget => ({ path: widget.context.path, factory: FACTORY }),
        name: widget => widget.context.path
      });
    }

     // Try avoiding awaiting in the activate function because
    // it will delay the application start up time.
    requestAPI<any>('get-example')
    .then(data => {
      console.log(data);
    })
    .catch(reason => {
      console.error(
        `The jupyterlab_examples_server server extension appears to be missing.\n${reason}`
      );
    });
 
     // register the filetype
     app.docRegistry.addFileType({
      name: 'dbtsql',
      displayName: 'Dbtsql',
      mimeTypes: ['text/json', 'application/json'],
      extensions: ['.dbtsql','.sql'],
      fileFormat: 'text',
      contentType: 'dbtsqldoc' as any
    });

    // Creating and registering the shared model factory
    // As the third-party jupyter-collaboration package is not part of JupyterLab core,
    // we should support collaboration feature absence.
    if (drive) {
      const sharedExampleFactory = () => {
        return DbtDoc.create();
      };
      drive.sharedModelFactory.registerDocumentFactory(
        'file',
        sharedExampleFactory
      );
    }

    // Creating and registering the model factory for our custom DocumentModel
    const modelFactory = new DbtDocModelFactory();
    app.docRegistry.addModelFactory(modelFactory);

    // Creating the widget factory to register it so the document manager knows about
    // our new DocumentWidget
    const widgetFactory = new DbtWidgetFactory({
      name: FACTORY,
      modelName: 'dbtsql-model',
      fileTypes: ['dbtsql'],
      defaultFor: ['dbtsql']
    });


    // Add the widget to the tracker when it's created
    widgetFactory.widgetCreated.connect((sender, widget) => {
      // Notify the instance tracker if restore data needs to update.
      widget.context.pathChanged.connect(() => {
        tracker.save(widget);
      });
      tracker.add(widget);
    });

    // Registering the widget factory
    app.docRegistry.addWidgetFactory(widgetFactory);
  }
};

export default extension;

