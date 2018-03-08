import React, { Component } from 'react';
import './tracking.scss'
import ProjectItem from './ProjectItem/ProjectItem';
import classnames from "classnames";
import { findTrackerLists, deleteTrackerListNew, createTrackerList, updateTrackerList } from '../../../../services/project.tracker.services';
import { connect } from 'react-redux';


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

            this.findMeSomeStuff = this.findMeSomeStuff.bind(this);
        }

      scrollToBottom = () => {
        this.listEnd.scrollIntoView({ behavior: "smooth" });
    }

findMeSomeStuff(projectid){
  findTrackerLists(projectid)
  .then( res => {
    if (res.status !== 200) {
      console.log(res);
    }
    else {
      this.setState({ lists: res.data });
    }
  })
}



componentDidMount(){
  const projectid = this.props.projectInfo.id;
  this.findMeSomeStuff(projectid);
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
    const projectid = this.props.projectInfo.id;
    let listOrder = this.state.lists.length + 1;
    let listName = this.state.listName;
    let body = {listName, listOrder};

    createTrackerList(projectid, body)
      .then(res => {
        if(res.status !== 200){
          console.log(res);
        }
        else {
          findTrackerLists(projectid)
          .then( res => {
            if (res.status !== 200) {
              console.log(res);
            }
            else {
              this.setState({
                lists: res.data,
                isAddListInputOpen: false,
                listName: '',
              })
            }
          })
        }
      })
  }

  removeTrackerListHandle(listid){
    const projectid = this.props.projectInfo.id;

    deleteTrackerListNew(projectid, listid)
      .then( res => {
        this.findMeSomeStuff(projectid)
      })
  }
  
  render() {

    const lists = this.state.lists;
    const projectid = this.props.projectInfo.id;


    lists.forEach((list, index) => {
        let listid = list.id;

        let body = {
          listName: list.list_name,
          listOrder: index+1
        }

        updateTrackerList(projectid, listid, body)
            .then( res => {
              console.table(res.data)
            })
            .catch(err => {throw err})
      });



    const displayTrackerLists= this.state.lists.map( (list) => {
      const index = lists.indexOf(list);  

      return(
        <ProjectItem key={`tracker-list-${index}`} index={index} list_order={list.list_order} listid={list.id} removeTrackerListHandle={this.removeTrackerListHandle} listName={list.list_name}  projectid={this.props.projectid} />
      )
    })
   

    var addListToggleClass = classnames({
        "add-list--after":  this.state.isAddListInputOpen, 
        "add-list--before" : true
    })
    return (
        <div className="tracking-container">
        <div className="project-header">
            <label>Tracker</label>
         
          </div>
          <div className="tracking-wrapper">
          
             
                <div className="project-items-container" id="project">
                    {displayTrackerLists}
        
                    <div className="add-list-wrapper" ref={(el) => { this.listEnd = el; }}>
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
    );
  }
}

function mapStateToProps(state){
  return state
}


export default connect(mapStateToProps)(Tracking);

