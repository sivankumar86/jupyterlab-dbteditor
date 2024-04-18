import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-min-noconflict/ext-language_tools";


type SQLProps = {
  value: string
  setValue: Function
}


function SqlEditor({ setValue, value }:SQLProps) {
  return (
    <div>
      <AceEditor
        aria-label="editor"
        mode="mysql"
        theme="sqlserver"
        name="editor"
        width="100%"
        fontSize={18}
        minLines={15}
        showPrintMargin={false}
        showGutter
        placeholder="test"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
}

export default SqlEditor;