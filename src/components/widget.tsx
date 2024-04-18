
import { DocumentWidget } from '@jupyterlab/docregistry';

import { DbtDocModel } from './model'

import {DbtEditorWidget} from './dbtEditor'

export class DbtDocWidget extends DocumentWidget<
DbtEditorWidget,
  DbtDocModel
> {
  constructor(options: DocumentWidget.IOptions<DbtEditorWidget, DbtDocModel>) {
    super(options);
}

/**
   * Dispose of the resources held by the widget.
   */
dispose(): void {
  this.content.dispose();
  super.dispose();
}
}

