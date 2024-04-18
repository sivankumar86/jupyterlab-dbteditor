import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';

import { Contents } from '@jupyterlab/services';

import { DbtDocWidget } from './widget';

import { DbtDoc, DbtDocModel } from './model';

import { DbtEditorWidget } from './dbtEditor';



/**
 * A widget factory to create new instances of ExampleDocWidget.
 */
export class DbtWidgetFactory extends ABCWidgetFactory<
  DbtDocWidget,
  DbtDocModel
> {

    /**
   * Constructor of ExampleWidgetFactory.
   *
   * @param options Constructor options
   */
  constructor(options: DocumentRegistry.IWidgetFactoryOptions) {
    super(options);
  }

    /**
   * Create a new widget given a context.
   *
   * @param context Contains the information of the file
   * @returns The widget
   */
    protected createNewWidget(
        context: DocumentRegistry.IContext<DbtDocModel>
      ): DbtDocWidget {
        return new DbtDocWidget({
          context,
          content: new DbtEditorWidget(context)
        });
      }
    }


    /**
 * A Model factory to create new instances of ExampleDocModel.
 */
export class DbtDocModelFactory
implements DocumentRegistry.IModelFactory<DbtDocModel>
{
  /**
   * The name of the model.
   *
   * @returns The name
   */
  get name(): string {
    return 'dbtsql-model';
  }

  /**
   * The content type of the file.
   *
   * @returns The content type
   */
  get contentType(): Contents.ContentType {
    return 'dbtsqldoc' as any;
  }

  /**
   * The format of the file.
   *
   * @returns the file format
   */
  get fileFormat(): Contents.FileFormat {
    return 'text';
  }

  readonly collaborative: boolean = true;

  /**
   * Get whether the model factory has been disposed.
   *
   * @returns disposed status
   */
  get isDisposed(): boolean {
    return this._disposed;
  }

  /**
   * Dispose the model factory.
   */
  dispose(): void {
    this._disposed = true;
  }

  /**
   * Get the preferred language given the path on the file.
   *
   * @param path path of the file represented by this document model
   * @returns The preferred language
   */
  preferredLanguage(path: string): string {
    return '';
  }

  /**
   * Create a new instance of ExampleDocModel.
   *
   * @param languagePreference Language
   * @param modelDB Model database
   * @param isInitialized - Whether the model is initialized or not.
   * @param collaborationEnabled - Whether collaboration is enabled at the application level or not (default `false`).
   * @returns The model
   */
  createNew(
    options: DocumentRegistry.IModelOptions<DbtDoc>
  ): DbtDocModel {
    return new DbtDocModel(options);
  }

  private _disposed = false;
}
