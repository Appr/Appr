import React, { Component } from 'react';
import './dashboard.scss';
import './dashboard-projects.scss';
import { findDashboardInfo } from '../../../../services/dashboard.services';
import { createGroup } from '../../../../services/group.services';
import { createProject } from '../../../../services/project.services';
import DashGroup from './DashItems/DashGroup';
import DashProject from './DashItems/DashProject';
import { connect } from 'react-redux';
import { updateDashboard } from '../../../../actions/actionCreators';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
		this.handleCreateButton = this.handleCreateButton.bind(this);
	}


	handleCreateButton(buttonPressed) {
		const userid = this.props.match.params.userid;
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
	}

	render() {
		const userid = this.props.userInfo.id;

		let displayProjects = this.props.dashboardInfo.projects.map( (project, index) => {
			console.table(this.props.dashboardInfo.projects)
			if(project !== null){
				return <DashProject key={`project-${index}`} index={index} userid={userid} projectid={project.id} projectName={project.name} backgroundSource={project.background}/>
			}
		});
		
		// const displayGroups = groups.map( group => {
		// 	const index = groups.indexOf(group);
		// 	return <DashGroup key={`group-${index}`} userid={userid} groupid={group.id} groupName={group.name}/>
		// });


		return (
			<div>
				<div className="dashboard-container">		
					<div className="dashboard-wrapper">
						<div className="personal-list-container">
							<label className="dash-section-title"> Projects </label>
							<ul className="projects-list">

								{displayProjects}
				
								
								<li className="create-project-thumb">
									<div className="create-project-thumb-body" onClick={() => this.handleCreateButton('project')}>
										<label> Create New Project </label>
									</div>
								</li>
							</ul>
						</div>
					
						{/* <div className="group-list-container">
							<label className="dash-section-title"> Groups </label>
							<ul className="projects-list">

								{displayGroups}								

								<li className="create-project-thumb">
									<div className="create-project-thumb-body" onClick={() => this.handleCreateButton('group')}>
										<label> Create New Group </label>
									</div>
								</li>
							</ul>
						</div> */}
					</div>
				</div>
			</div>
		);
	}
}





function mapStateToProps(state){
	return state;
  }
  
export default connect( mapStateToProps, {updateDashboard} ) (Dashboard);
