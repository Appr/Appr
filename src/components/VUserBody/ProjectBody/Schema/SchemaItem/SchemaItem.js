import React, { Component } from 'react';
import './schemaitem.scss';
import AceEditor from 'react-ace';
import 'brace/mode/sql';


class SchemaItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }



  render() {
    const {index, schemaName, schemaData, removeSchemaItemHandler, handleSchemaNameChange, handleSchemaDataChange, handleSaveChange} = this.props;

    let schemaDataText = schemaData.toString();

  return (
      <div className="new-schema-item">
          <div className="project-item-header">
           <button onClick={() => removeSchemaItemHandler(index)}> </button>
          </div>
              <div className="schemaItem-inner">
              <input className="schemaItem-name"  placeholder={schemaName} onChange={(e) => { handleSchemaNameChange(e.target.value, index) }} onBlur={ e => handleSaveChange(e, index) }/>
              <div className="sqlCon">
                  <label>SQL</label>
                      <AceEditor
                          width={'100%'}
                          border={'1px solid #CCC'}
                          height={'120px'}
                          mode="sql"
                          theme="tomorrow"
                          name={'schema'}
                          onLoad={this.onLoad}
                          onChange={(e) => {handleSchemaDataChange(e, index)}}
                          onBlur={ e => handleSaveChange(e, index) }
                          fontSize={14}
                          showPrintMargin={true}
                          showGutter={true}
                          highlightActiveLine={true}
                          value={schemaDataText}
                          setOptions={{
                          enableBasicAutocompletion: true,
                          enableLiveAutocompletion: true,
                          enableSnippets: false,
                          showLineNumbers: true,
                          tabSize: 2,
                      }}/>
              </div>

          </div>

      </div>
  );
}
}

export default SchemaItem;