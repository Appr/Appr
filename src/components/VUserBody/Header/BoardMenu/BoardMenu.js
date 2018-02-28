import React, { Component } from 'react';
import { Link, Redirect, BrowserRouter } from 'react-router-dom';
import history from '../../../../history';
import './board-menu.scss'
import { findDashboardInfo } from '../../../../services/dashboard.services';
import { createGroup } from '../../../../services/group.services';
import { createProject } from '../../../../services/project.services';
import { findProject } from '../../../../services/project.services';
import { updateProjectRedux } from '../../../../actions/actionCreators';
import { connect } from 'react-redux';

class BoardMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            groups: [],
            projects: []
        }
        this.handleCreateButton = this.handleCreateButton.bind(this);
    }

    handleCreateButton(buttonPressed) {
		const userid = this.props;
		let name = '';
		let reqBody = {};
		if (buttonPressed === 'group') {
			name = prompt('What is the name of your group?');
			reqBody = {createdByUserId: userid, name};
			createGroup(reqBody)
				.then( res => {
					if (res.data[0].id) {
						const groupid = res.data[0].id;
						this.props.history.push(`/user/${userid}/group/${groupid}/dashboard`);
					}
					else {
						alert(res.data.message);
					}
				})
				.catch(err => {throw err});
		}
		else if (buttonPressed === 'project') {
            name = prompt('What is the name of your project?');
           
			reqBody = {name, authorId: userid};
			createProject(reqBody)
				.then( res => {
					if (res.data[0].id) {
						const projectid = res.data[0].id;
                        this.props.history.push(`/user/${userid}/project/${projectid}/ideas`);
					}
					else {
						alert(res);
					}
				})
				.catch(err => {throw err});
        }
        this.props.closeMenus();
	}

  render() {

    const { projectid, closeMenus, updateProjectRedux } = this.props;


    // const groups = this.props.dashboardInfo.groups;
    // const projects = this.props.dashboardInfo.projects;

    function getProject(projectid, path){
        findProject(projectid)
        .then( res => {
            if (res.status !== 200) {
                console.log(res);
            }
            else {
                closeMenus();
                updateProjectRedux(res.data[0]);
                history.push(path)
            }
        })
        .catch(err => {throw err});
    }

    // const displayGroups = groups.map( group => {
    //     const index = groups.indexOf(group);
    //     return (
    //         <Link to={`/group-dashboard/${group.id}`} key={`group-${index}`}>
    //               <div className="board-menu-item">
    //               <div className="board-item-thumbnail">

    //               </div>
    //               <div className="board-item-name">
    //                   {group.name}
    //               </div>
    //           </div>
    //         </Link>
    //     )
    // })

    let userid = this.props.userInfo.id;

    const displayProjects = this.props.dashboardInfo.projects.map( (project, index) => {
            if(project !== null){
                let path = `/user/${userid}/project/${project.id}/ideas`;
                return (
                            <div className="board-menu-item" onClick={(e) => getProject(project.id, path)} >
                            <div className="board-item-thumbnail" style={{'background-image': `url(${project.background})`}}>

                            </div>
                            <div className="board-item-name">
                                {project.name}
                            </div>
                        </div>
                )
            }
  })
  
    return (
        <div className="boards-main-container">
        <div className="board-menu-header">
        <div className="back-con" onClick={this.closeMenus}>
            <div className="back-icon"> </div>
            <div className="board-text">Hide</div>
        </div> 
        </div>
            <div className="personal-boards-con">
                <div className="text-12">PERSONAL PROJECTS</div>
        
                    {displayProjects}
        
                    
                        <div className="create-board-item" onClick={() => this.handleCreateButton('project')}>
                            <div className="create-board-thumbnail">
                                <div className="plus-symbol">+</div>
                            </div>
                            <div className="create-board-name">
                                Create Project
                            </div>
                        </div>
            </div>
            {/* <div className="recent-boards-con">
                <div className="text-12">GROUP PROJECTS</div>
        
                {displayGroups}


                        <div className="create-board-item" onClick={() => this.handleCreateButton('group')}>
                            <div className="create-board-thumbnail">
                                <div className="plus-symbol">+</div>
                            </div>
                            <div className="create-board-name">
                                Create Group
                            </div>
                        </div>
            </div> */}
            
        </div>
    );
  }
}

function mapStateToProps(state){
    return state;
}
  
  export default connect( mapStateToProps, {updateProjectRedux} ) (BoardMenu);



