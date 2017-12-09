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
                lists: [],
                listName: ''
            }
            this.openListToggle = this.openListToggle.bind(this); 
            this.closeListToggle = this.closeListToggle.bind(this); 

            this.addTrackerListHandle = this.addTrackerListHandle.bind(this);
            this.removeTrackerListHandle = this.removeTrackerListHandle.bind(this);
        }



  //Add List Button methods
  openListToggle(e){
    this.setState({isAddListInputOpen: true})
          console.log("input show");
  }

  closeListToggle(e){
    this.setState({isAddListInputOpen: false})
          console.log("input show");
  }


  //Trackerlist add remove methods
  addTrackerListHandle(){
    let TrackingList = this.state.lists;
    TrackingList.push({
      name: this.state.listName
    })
    this.setState({
      isAddListInputOpen: false,
      trackerLists: TrackingList,
      listName: '',
    })
  }

  removeTrackerListHandle(){
    let TrackingList = this.state.trackerLists;
    TrackingList.pop();
    console.log('remove list')
    this.setState({trackerLists: TrackingList})
  }
  
  render() {
    console.log(this.state.listName)

    const displayTrackerLists= this.state.lists.map( (list, index) => {
      return(
        <ProjectItem key={`tracker-list-${index}`} PutInTrashClick={this.removeTrackerListHandle} listName={list.name} />
      )
    })
   

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
                    {displayTrackerLists}
        
                    <div className="add-list-wrapper" >
                          <div className={addListToggleClass} onFocus={this.openListToggle}>
                            <div className="add-list-content">
                              <input placeholder="Add a list..." value={this.state.listName} onChange={ (e) => this.setState({
                                listName: e.target.value
                              })} /> 
                              <div className="add-list-btn-set">
                                <button className="saveTBtn" onClick={this.addTrackerListHandle}> Save </button>
                                <button className="closeTBtn" onClick={this.closeListToggle}> <span />  </button>
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

