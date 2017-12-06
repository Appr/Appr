import React, { Component } from 'react';
import './tracking.scss'
import Header from '../../../Header/Header';
import ProjectItem from './ProjectItem/ProjectItem';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import classnames from "classnames";



class Tracking extends Component {
          constructor(props){
            super(props);
            this.state ={
                isAddListInputOpen: false,
                lists: {
                  arr: [
                    
                  ]

                },
            }
            this.openListToggle = this.openListToggle.bind(this); 
            this.closeListToggle = this.closeListToggle.bind(this); 
        }


        openListToggle(e){
         this.setState({isAddListInputOpen: true})
                console.log("input show");
        }

        closeListToggle(e){
          this.setState({isAddListInputOpen: false})
                console.log("input show");
       }
  
  render() {

    var addListToggleClass = classnames({
        "add-list--after":  this.state.isAddListInputOpen, 
        "add-list--before" : true
    })
    return (
      <div style={{"background": "grey", "height": "100vh", "overflow-y": "hidden"}}>
        <Header />
        <div className="main-fix">
        <ProjectSetupSidebar />
        <div className="tracking-container">
        <div className="project-header">
            <label>Tracker</label>
         
          </div>
          <div className="tracking-wrapper">
          
             
                <div className="project-items-container" id="project">
                    <ProjectItem listName="To Do" />
                    <ProjectItem listName="Backlog" />
                    <ProjectItem listName="Repos" />
                    <ProjectItem listName="Schema" />
                    <ProjectItem listName="Database" />
                    <ProjectItem listName="Test" />
                    <div className="add-list-wrapper" >
                          <div className={addListToggleClass} onFocus={this.openListToggle}>
                            <div className="add-list-content">
                              <input placeholder="Add a list..." /> 
                              <div className="add-list-btn-set">
                                <button> Save </button>
                                <button onClick={this.closeListToggle}> Close </button>
                              </div>
                            </div>
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

export default Tracking;