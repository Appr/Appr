import React, { Component } from 'react';
import Header from '../../../Header/Header';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar'
import './endpoints.scss';

class Endpoints extends Component {
  constructor(props){
    super(props);
      this.state ={
        endpoints: {
                arr: [{
                        key: "1",
                        label: "1",
                        url: "www.twitter.com/landonwjohnson",
                        httpVerb: 'GET',
                        request: [{
                            field1: 'test',
                            field2: 'test me again'
                        }],
                        response: [{
                            field1: 'test',
                            field2: 'test me again'
                        }]
                      }]

        }
      }
      this.addEndpointItemHandler = this.addEndpointItemHandler.bind(this);
      this.removeEndpointItemHandler = this.removeEndpointItemHandler.bind(this);
      
      this.addEndpointRequestHandler = this.addEndpointRequestHandler.bind(this);
      this.removeEndpointRequestHandler = this.removeEndpointItemHandler.bind(this);

      this.addEndpointResponseHandler = this.addEndpointResponseHandler.bind(this);
      this.removeEndpointResponseHandler = this.removeEndpointResponseHandler.bind(this);
  }

  //endpoint ITEM add and remove methods
  addEndpointItemHandler(){
    let EndpointList = this.state.endpoints.arr;
    EndpointList.push({
      key: 2,
      label: 2,
      url: 'URL',
      httpVerb: ''
    })
    this.setState({arr: EndpointList})
  }

  removeEndpointItemHandler(){
    let EndpointList = this.state.endpoints.arr;
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

    const displayEndpoints = this.state.endpoints.arr.map( endpoint => {
      return(
        <div className="endpoint-item">
        <div className="project-item-header">
            <span onClick={this.removeEndpointItemHandler}> </span>
        </div>
        
        <div className="endpoint-section-con">
          <div className="endpoint-label-con">
            {endpoint.label + '.'}
          </div>
          <div className="ep-field-con">
              <input className="url-input-field" type="text" placeholder={endpoint.url} />
              <select className="http-verb-select">
                <option>GET</option>
                <option>POST</option>
                <option>UPDATE</option>
                <option>DELETE</option>
              </select>
          </div>
        </div>
        
        <div className="endpoint-divider"> </div>



        <div className="endpoint-section-con-bottom">
          <div className="ep-field-con-bottom" />

              <div className="ep-bottom-row">
                <div className="req-res-label">
                  REQ
                </div>
                  <div className="req-res-wrapper">
                    <input className="req-input-field" type="text" placeholder="username" />
                    <span>:</span>
                    <input className="req-input-field" type="text" placeholder="" />
                  </div>
              </div>
              
              <div className="ep-bottom-add-row">
              <div className="req-res-label">
                  
                </div>
              <button className="req-res-add" onClick={this.addEndpointRequestHandler}> + Add </button>
              </div>
        </div>


        <div className="endpoint-section-con-bottom">
          <div className="ep-field-con-bottom" />

              <div className="ep-bottom-row">
                <div className="req-res-label">
                  RES
                </div>
                  <div className="req-res-wrapper">
                    <input className="req-input-field" type="text" placeholder="username" />
                    <span>:</span>
                    <input className="req-input-field" type="text" placeholder="" />
                  </div>
              </div>
              <div className="ep-bottom-add-row">
              <div className="req-res-label">
                  
                </div>
              <button className="req-res-add" onClick={this.addEndpointResponseHandler}> + Add </button>
              </div>
        </div>
      </div>
      )
    })
    return (
      <div>
      <Header />
        <div className="main-fix">
          <ProjectSetupSidebar />
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
        </div>
    );
  }
}

export default Endpoints;