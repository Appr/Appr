import React, { Component } from 'react';
import './endpoint-item.scss';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/json';
import 'brace/ext/spellcheck';
import classnames from 'classnames';

class EndpointItem extends Component {
  constructor(){
    super();
    this.state = {
        UI:{
            hideReqField: true
        }
    }
    this.toggleRequireCon = this.toggleRequireCon.bind(this);
  }

  componentDidMount(){
    this.toggleRequireCon(this.props.httpVerb, this.props.index)
  }

  toggleRequireCon(e, index){
    this.props.handleHttpVerbChange(e, index)
    const hide = () => {this.setState({UI:{hideReqField: true}})};
    const show = () => {this.setState({UI:{hideReqField: false}})};
    if(e === "GET" || e === "DELETE"){
         hide();
    } 
    else { 
        show();
    }
  }

  httpHideShow(){

  }



  render() {
    const {httpVerb, endpointName, requestData, responseData, urlData, index, handleRequestChange, handleResponseChange, handleEndpointNameChange, removeEndpointItemHandler, handleEndpointURLChange, handleSubmitEndpoint} = this.props;

    let responseText = responseData.toString();
    let requestText = requestData.toString();
    

    const requireConClass = classnames({
        "requireCon--hide" : this.state.UI.hideReqField,
        "requireCon": true
    })

  return (
      <div className="endpoint-item" id={index}>
          <div className="project-item-header">
           <button onClick={() => removeEndpointItemHandler(index)}> </button>
          </div>
            <div className="endpoint-inner" >
              <input className="endpoint-name"  onChange={(e) => {handleEndpointNameChange(e.target.value, index)}} placeholder={endpointName} />
              <div className="httpverb-url-con" >
                  <select className="http-verb"  onChange={ e => this.toggleRequireCon(e.target.value, index)}>
                      <option value={httpVerb}> {httpVerb} </option>
                      <option value="GET"> GET </option>
                      <option value="POST" > POST </option>
                      <option value="PUT"> PUT </option>
                      <option value="DELETE"> DELETE </option>
                  </select>
                  <input className="api-input" onChange={(e) => {handleEndpointURLChange(e.target.value, index)}} placeholder={urlData} />
                  
                  <button className="endpoint-save" onClick={(e) => {handleSubmitEndpoint(index)}}>Save</button>
              </div>
              <div className={requireConClass}>
                  <label>Request</label>
                      <AceEditor
                          width={'100%'}
                          border={'1px solid #CCC'}
                          height={'120px'}
                          mode="json"
                          name={`requestEditor` + index}
                          onLoad={this.onLoad}
                          onChange={(e) => {handleRequestChange(e, index)}}
                          fontSize={14}
                          showPrintMargin={true}
                          showGutter={true}
                          highlightActiveLine={true}
                          value={requestText}
                          setOptions={{
                          enableBasicAutocompletion: false,
                          enableLiveAutocompletion: false,
                          enableSnippets: false,
                          showLineNumbers: true,
                          tabSize: 2,
                      }}/>
              </div>

              <div className="responseCon">
                  <label>Response</label>
                      <AceEditor
                          width={'100%'}
                          border={'1px solid #CCC'}
                          height={'120px'}
                          mode="json"
                          theme="tomorrow"
                          name={`responseEditor` + index}
                          onLoad={this.onLoad}
                          onChange={(e) => {handleResponseChange(e, index)}}
                          fontSize={14}
                          showPrintMargin={true}
                          showGutter={true}
                          highlightActiveLine={true}
                          value={responseText}
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

export default EndpointItem;