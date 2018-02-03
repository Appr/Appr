import React, { Component } from 'react';
import EndpointItem from './EndpointItem/EndpointItem';
import './endpoints.scss';
import { findProjectEndpoints, createProjectEndpoint, updateProjectEndpoint, deleteProjectEndpoint } from '../../../../services/project.endpoint.services';

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
  }

  scrollToBottom = () => {
    this.listEnd.scrollIntoView({ behavior: "smooth" });
}

  componentWillMount(){
    const projectid = this.props.match.params.projectid;
    findProjectEndpoints(projectid)
      .then(res => {
        if (res.status !== 200){
          alert(res);
        }
        else {
          this.setState({ endpoints: res.data })
        }
      })

  }

  //endpoint ITEM add and remove methods
  addEndpointItemHandler(projectid){
    const reqBody = { endpointName: '', httpVerb: '', urlData: '', responseData: '', requestData: ''};
    createProjectEndpoint(projectid, reqBody)
      .then( res => {
        if (res.status !== 200){
          alert(res);
        }
        else{
          const newState = this.state.endpoints;
          newState.push(res.data[0]);
          this.setState({ endpoints: newState });
          this.scrollToBottom();
        }
      })
  }

  handleSubmitEndpoint(index){
    const projectid = this.props.match.params.projectid;
    alert('handleSubmitEndpoint FIRED!!!!!')
    const { endpoint_name, http_verb, url_data, response_data, request_data} = this.state.endpoints[index];
    const reqBody = { 
      endpointName: endpoint_name, 
      httpVerb: http_verb, 
      urlData: url_data, 
      responseData: response_data, 
      requestData: request_data
    };

    const endpointid = Number(this.state.endpoints[index].id);
    alert(`the index is ${index}`);
    alert(`the endpointid is ${endpointid}`)
    alert(`the projectid is ${projectid}`)
    updateProjectEndpoint(projectid, endpointid, reqBody)
      .then( res => {
        if (res.status !== 200){
          alert(res);
        }
      })
      .catch(err => {throw err});
  }

  removeEndpointItemHandler(index){
    const projectid = this.props.match.params.projectid;
    const endpointid = this.state.endpoints[index].id;

    deleteProjectEndpoint(projectid, endpointid)
      .then( res => {
        if (res.status !== 200){
          console.log(res);
        }
        else {
          const newState = this.state.endpoints;
          newState.splice(index, 1);
          this.setState( { endpoints: newState } );
        }
      })
  }

  handleEndpointNameChange(newName, index){
    const newState = this.state.endpoints;    
    newState[index].name = newName;
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
    console.table(this.state.endpoints);
    const { userid, projectid } = this.props.match.params;
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

export default Endpoints;