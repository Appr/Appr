import React, { Component } from 'react';
import './projectitem.scss'
import ProjectCard from './ProjectCards/ProjectCard';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class ProjectItem extends Component {
  constructor(props){
    super(props);
    this.state ={
        name: '',
        tasks: [],
        taskName: '',
        isTaskInputOpen: true,
        showText: false
    }
    this.addTaskToggle = this.addTaskToggle.bind(this); 
    this.addTaskItemHandler = this.addTaskItemHandler.bind(this);
    this.removeTaskItemHandler = this.removeTaskItemHandler.bind(this);
}


addTaskToggle(){
    if(this.state.isTaskInputOpen){
        this.setState({
          isTaskInputOpen: false,
          showText: true
        })
    }
    else {
     
        this.setState({
          isTaskInputOpen: true,
          showText: false
        })  
    }
}

addTaskItemHandler(){
  let NewTask = this.state.tasks;
  NewTask.push({
      taskName: this.state.taskName,
      listName: `${this.props.listName}`
  })
  this.setState({
      tasks: NewTask,
      taskName: ''
  })
  this.addTaskToggle();
}

removeTaskItemHandler(){
  let NewTask = this.state.tasks;
  NewTask.pop();
  console.log('remove task')
  this.setState({taskName: NewTask})
}

  render() {
    console.log(this.state.taskName)

    let addTaskInput = classnames({
      "add-task-show": true,
      "add-task": this.state.isTaskInputOpen
  })

    let showText = classnames({
      "show-text": true,
      "hide": this.state.showText
    })

    const displayTasks = this.state.tasks.map((task, index ) =>{
      return(
        <ProjectCard key={`tracker-list-${index}`} listName={this.props.listName} taskName={task.taskName} onDeleteTaskClick={this.removeTaskItemHandler}  />
      )
    })
    return (
    
      <div className="project-item">
            <div className="project-item-block">
              <div className="prjt-item-inner">
                  <div className="prjt-item-header"> 
                    <input type="text" placeholder={this.props.listName}/>
                    <span onClick={this.props.PutInTrashClick}> </span>
                  </div>
                  <div className="prjt-item-body">
                    <ul>
                      
                        {displayTasks}

                    </ul>
                  </div>
                  <div className="prjt-item-footer" >
                  <div className={showText} onClick={this.addTaskToggle}><label> Add a task... </label></div>
                    <div className={addTaskInput} >
                      <textarea type="text" value={this.state.taskName} onChange={ (e) => this.setState({
                        taskName: e.target.value
                      })}/>
                      <div className="list-btn-set">
                        <button className="saveTBtn" onClick={this.addTaskItemHandler}> Add </button>
                        <button className="closeTBtn" onClick={this.addTaskToggle}> <span /> </button>
                      </div>
                    </div>
                      
                    </div>
                  </div>
            </div>
            </div>
    );
  }
}

ProjectItem.propTypes = { PutInTrashClick: PropTypes.func }
ProjectItem.defaultProps = { PutInTrashClick: () => {} }
export default ProjectItem;





{/* <div className="dotmenu--open">
                    <div className="pop-over-menu">
                        <div className="pop-over-menu-wrapper">
                            <div className="menu-header">
                              <span className="menu-placeholder"></span>
                              <div classname="menu-title">
                                List Actions
                              </div>
                              <span className="delete-x"> &times;</span>
                            </div>
                            <ul>
                              <li>Archive This List</li>
                            </ul>
                        </div>
                    </div>
                    </div> */}