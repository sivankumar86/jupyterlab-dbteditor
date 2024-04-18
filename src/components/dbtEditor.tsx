import { ReactWidget } from '@jupyterlab/ui-components';

import React from 'react';


import { DocumentRegistry } from '@jupyterlab/docregistry';

import { DbtDocModel } from './model';

import SqlEditor from './sqlEditor'

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { dbtbutton,flexbuttonpan }  from '../style/dbtwidgetCSS'
/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */
export class DbtEditorWidget extends ReactWidget {

    private _model: DbtDocModel;

      /**
   * Constructs a new CounterWidget.
   */
  constructor(context: DocumentRegistry.IContext<DbtDocModel>) {
    super();
    this.addClass('jp-react-widget');
    this._model = context.model;
    context.ready.then(value => {
      this.update();
    });
}



render(): JSX.Element {

  const ResizeHandle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };
    function setVal(data:string,cw:DbtEditorWidget) {
      cw._model.content=data
      
    }
    
    return <PanelGroup autoSaveId="example" direction="vertical">
    <Panel maxSize={75}>
      <div className={flexbuttonpan}>
      <button className= {dbtbutton} > Compile All</button>
      </div>
    <SqlEditor value={this._model.content} setValue={(e:string) => setVal(e,this)}  />
    </Panel>
    <PanelResizeHandle style={ResizeHandle}/>
    <Panel maxSize={75}>
    <div className={flexbuttonpan}>
    <button className= {dbtbutton} > Compile </button>
    <button className= {dbtbutton} > Preview </button>
    <button className= {dbtbutton} > Lineage </button> 
   </div>
      
  </Panel>
  </PanelGroup>
    
    
  }

}