import React, { Component } from 'react';
import { Link, Redirect, BrowserRouter, withRouter} from 'react-router-dom';
import history from '../../../../history';
import './board-menu.scss'
import { findDashboardInfo, findPersonalProjects } from '../../../../services/dashboard.services';
import { createGroup } from '../../../../services/group.services';
import { createProject } from '../../../../services/project.services';
import { findProject } from '../../../../services/project.services';
import { updateProjectRedux, updatePersonalProjects } from '../../../../actions/actionCreators';
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
		const userid = this.props.userInfo.id;
		let name = '';
		let reqBody = {};
		if (buttonPressed === 'group') {
			name = prompt('What is the name of your group?');
			reqBody = {createdByUserId: userid, name};
			createGroup(reqBody)
				.then( res => {
					if (res.data[0].id) {
						const groupid = res.data[0].id;
						history.push(`/user/${userid}/group/${groupid}/dashboard`);
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
                    console.table(res.data)

					if (res.data[0].id) {
                        const projectid = res.data[0].id;
                        findProject(projectid)
                            .then(res => {
                                this.props.updateProjectRedux(res.data[0]);
                                findPersonalProjects(userid)
                                .then(res => {
                                    this.props.updatePersonalProjects(res.data);
                                    this.props.closeMenus();
                                    history.push(`/user/${userid}/project/${projectid}/ideas`);
                                })
                            })
                        
					}
					else {
						alert(res);
					}
				})
				.catch(err => {throw err});
        }
	}

  render() {

const { closeMenus, updateProjectRedux } = this.props;


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
    let personalProjects = this.props.dashboardInfo.personalProjects;
    let displayProjects = personalProjects.map( (project, index) => {
            if(project.status_id === 1){
                let path = `/user/${userid}/project/${project.id}/ideas`;
                return (
                        <div key={`board-menu-item${index}`}className="board-menu-item" onClick={(e) => getProject(project.id, path)} >
                            <div className="board-item-thumbnail" style={{backgroundImage: `url(${project.background})`}}>

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
  
  export default withRouter(connect( mapStateToProps, {updateProjectRedux, updatePersonalProjects} ) (BoardMenu));



