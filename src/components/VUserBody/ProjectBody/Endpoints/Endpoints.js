import React, { Component } from 'react';
import EndpointItem from './EndpointItem/EndpointItem';
import './endpoints.scss';
import { findProjectEndpoints, createProjectEndpoint, updateProjectEndpoint, deleteProjectEndpoint } from '../../../../services/project.endpoint.services';
import { connect } from 'react-redux';

class Endpoints extends Component {
  constructor(props){
    super(props);
      this.state ={
          endpoints: []
      }
      this.handleEndpointNameChange = this.handleEndpointNameChange.bind(this);
      this.handleHttpVerbChange = this.handleHttpVerbChange.bind(this);
      this.handleEndpointURLChange = this.handleEndpointURLChange.bind(this);
      this.addEndpointItemHandler = this.addEndpointItemHandler.bind(this);
      this.removeEndpointItemHandler = this.removeEndpointItemHandler.bind(this);
      this.handleResponseChange = this.handleResponseChange.bind(this);
      this.handleRequestChange = this.handleRequestChange.bind(this);
      this.handleSubmitEndpoint = this.handleSubmitEndpoint.bind(this);
      this.pullFromBackend = this.pullFromBackend.bind(this);
  }

  scrollToBottom = () => {
    this.listEnd.scrollIntoView({ behavior: "smooth" });
}

  pullFromBackend(projectid, scrollOption){
    findProjectEndpoints(projectid)
    .then(res => {
      if (res.status !== 200){
        alert(res);
      }
      else {
        this.setState({ endpoints: res.data })
        if(scrollOption === 'yesScroll'){
          this.scrollToBottom();
        }
      }
    })
  }

  componentDidMount(){
    const projectid = this.props.projectInfo.id;
    this.pullFromBackend(projectid);
  }

  //endpoint ITEM add and remove methods
  addEndpointItemHandler(projectid){
    const reqBody = { endpointName: 'Type name here', httpVerb: 'HTTP VERB', urlData: '', responseData: '', requestData: ''};
    createProjectEndpoint(projectid, reqBody)
      .then( res => {
        if (res.status !== 200){
          alert(res);
        }
        else{
          this.pullFromBackend(projectid, 'yesScroll');
        }
      })
  }

  handleSubmitEndpoint(index){
    const projectid = this.props.match.params.projectid;
    const { endpoint_name, http_verb, url_data, response_data, request_data} = this.state.endpoints[index];
    const reqBody = {
      endpointName: endpoint_name,
      httpVerb: http_verb,
      urlData: url_data,
      responseData: response_data,
      requestData: request_data
    };

    const endpointid = Number(this.state.endpoints[index].id);
    updateProjectEndpoint(projectid, endpointid, reqBody)
      .then( res => {
        if (res.status !== 200){
          alert(res);
        }
      })
      .catch(err => {throw err});
  }


  removeEndpointItemHandler(endpointid){
    const projectid = this.props.match.params.projectid;
    deleteProjectEndpoint(projectid, endpointid)
      .then( res => {
        if (res.status !== 200){
        }
        else {
          console.log(res);
          this.pullFromBackend(projectid);
        }
      })
      .catch( err => {throw err});
  }

  handleEndpointNameChange(newName, index){
    const newState = this.state.endpoints;
    newState[index].endpoint_name = newName;
    this.setState({ endpoints: newState })
  }

  handleHttpVerbChange(newVerb, index){
    const newState = this.state.endpoints;
    newState[index].http_verb = newVerb;
    this.setState({ endpoints: newState })
  }

  handleEndpointURLChange(newURL, index){
    const newState = this.state.endpoints;
    newState[index].url_data = newURL;
    this.setState({ endpoints: newState })
  }

  handleResponseChange(newReponseData, index){
    const newState = this.state.endpoints;
    newState[index].response_data = newReponseData;
    this.setState({ endpoints: newState })
  }

  handleRequestChange(newRequestData, index){
    const newState = this.state.endpoints;
    newState[index].request_data = newRequestData;
    this.setState({ endpoints: newState })
  }




  render() {
    const projectid = this.props.projectInfo.id;
    const endpoints = this.state.endpoints;
    const displayEndpoints = endpoints.map( endpoint => {
      const index = endpoints.indexOf(endpoint);
      return(
        <EndpointItem
          key={`endpointItem${index}`}
          index={index}
          endpointid={endpoint.id}
          projectid={projectid}
          endpointName={endpoint.endpoint_name}
          httpVerb={endpoint.http_verb}
          urlData={endpoint.url_data}
          requestData={endpoint.request_data}
          responseData={endpoint.response_data}


          //Methods
            removeEndpointItemHandler={this.removeEndpointItemHandler}
            handleEndpointNameChange={this.handleEndpointNameChange}
            handleHttpVerbChange={this.handleHttpVerbChange}
            handleEndpointURLChange={this.handleEndpointURLChange}
            handleResponseChange={this.handleResponseChange}
            handleRequestChange={this.handleRequestChange}
            handleSubmitEndpoint={this.handleSubmitEndpoint}

        />
      )
    })
    return (
          <div className="endpoints-container">
             <div className="container-wrapper">
                <div className="endpoints-wrapper">
                    <div className="project-section-header">
                        <label>Endpoints</label>
                    </div>

                    <div className="endpoint-list">

                        {displayEndpoints}

                      <div className="add-button-footer" ref={(el) => {this.listEnd = el; }}>
                            <button className="add-endpoint-item" onClick={(e) => {this.addEndpointItemHandler(projectid)}}> Add Endpoint</button>
                      </div>
                    </div>
                </div>
                </div>
          </div>

    );
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps) (Endpoints);