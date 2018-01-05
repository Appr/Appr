import React, { Component } from 'react';
import Header from '../../../Header/Header';
import ProjectSidebar from '../ProjectSetupSidebar/ProjectSidebar'
import './endpoints.scss';
import EndpointsField from './EndpointsItem/EndpointsField';

class Endpoints extends Component {
  constructor(props){
    super(props);
      this.state ={
        endpoints: []
      }

    this.addEndpointItemHandler = this.addEndpointItemHandler.bind(this);
    this.removeEndpointItemHandler = this.removeEndpointItemHandler.bind(this);
      
    this.addEndpointRequestHandler = this.addEndpointRequestHandler.bind(this);
    this.removeEndpointRequestHandler = this.removeEndpointItemHandler.bind(this);

  }

// componentWillMount() {
//   const endpointExamples = [
//       {endpoint_data: [{
//           url_data: "api/rebellion",
//           http_verb: "GET"
//       }]
//     },
//       {endpoint_data: [{
//         url_data: "api/empire",
//         http_verb: "POST"
//     }]
//   }
//   ];
//   const projectid = this.props.match.params.projectid;
//   findProjectEndpoints(projectid)
//       .then( res => {
//           if (res.status !== 200) {
//               alert(res);
//           }
//           else {
//               if (res.data.length === 0) {
//                   this.setState({ endpoints: endpointExamples });
//               }
//               else {
//                   this.setState({ endpoints: res.data });
//               }
//           }
//       })
//       .catch(err => {throw err});
// }

  // endpoint ITEM add and remove methods
  addEndpointItemHandler(){
    let EndpointList = this.state.endpoints;
    EndpointList.push({
      key: 2,
      label: 2,
      url: 'URL',
      httpVerb: ''
    })
    this.setState({arr: EndpointList})
  }

  removeEndpointItemHandler(){
    let EndpointList = this.state.endpoints;
    EndpointList.splice(1, 1);
    this.setState({arr: EndpointList})
  }


  //endpoint REQUEST add and remove methods
  addEndpointRequestHandler(){
    console.log('add request')
  }

  removeEndpointRequestHandler(){

  }


  //endpoint RESPONSE add and remove methods
  addEndpointResponseHandler(){
    console.log('add response')
  }

  removeEndpointResponseHandler(){

  }


  render() {
    const { userid, projectid } = this.props.match.params;
    const endpoints = this.state.endpoints;
    const displayEndpoints = endpoints.map( endpoint => {
      return<EndpointsField  removeEndpointItemHandler={endpoints.removeEndpointItemHandler} addEndpointRequestHandler={endpoints.addEndpointRequestHandler} addEndpointResponseHandler={endpoints.addEndpointResponseHandler}/>
    });
    return (
        <div className="main-fix">
          <ProjectSidebar userid={userid} projectid={projectid}/>
          <div className="endpoints-container">
          
          <div className="endpoints-wrapper">
          <div className="project-section-header">
              <label>Endpoints</label>
          </div>
            <div className="endpoints-inner-container">
              <div className="endpoint-list-container">

                  {displayEndpoints}
                
                <div className="add-button-footer">
                      <button className="add-endpoint-item" onClick={this.addEndpointItemHandler}> Add Endpoint</button>
                </div>
              </div>
            </div>
          </div>
          </div>  
          </div>
    );
  }
}


export default Endpoints;