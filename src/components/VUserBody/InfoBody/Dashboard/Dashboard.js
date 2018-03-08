import React, { Component } from 'react';
import './dashboard.scss';
import './dashboard-projects.scss';
import { findDashboardInfo, findPersonalProjects } from '../../../../services/dashboard.services';
import { createGroup } from '../../../../services/group.services';
import { createProject, findProject, updateProject } from '../../../../services/project.services';
import DashGroup from './DashItems/DashGroup';
import DashProject from './DashItems/DashProject';
import { connect } from 'react-redux';
import { updatePersonalProjects, updateProjectRedux } from '../../../../actions/actionCreators';
import history from '../../../../history';
import Modal from 'react-modal';
import { ModalBox } from '../AccountSettings/accountsettingsStyled';
import CreateProject from './CreateProject/CreateProject';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			UI: {
				createProjectModalOpen: false
			}
		};
		this.handleCreateButton = this.handleCreateButton.bind(this);
		this.openCreateProjectModal = this.openCreateProjectModal.bind(this);
		this.closeCreateProjectModal = this.closeCreateProjectModal.bind(this);

	}

	openCreateProjectModal() {
		this.setState({
			UI: {
				createProjectModalOpen: true
			}
		})
	}

	closeCreateProjectModal() {
		this.setState({
			UI: {
				createProjectModalOpen: false
			}
		})
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
					findPersonalProjects(userid)
					.then(res => {
						this.props.updatePersonalProjects(res.data);
					})
					if (res.data[0].id) {

						const projectid = res.data[0].id;
						findProject(projectid)
						.then(res => {
							this.props.updateProjectRedux(res.data[0]);
							if(res.status === 200){
								history.push(`/user/${userid}/project/${projectid}/ideas`);
							}
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
		const userid = this.props.userInfo.id;

		let displayProjects = this.props.dashboardInfo.personalProjects.map( (project, index) => {
			if(project.status_id === 1){
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


								<li className="create-project-thumb" onClick={ () => this.openCreateProjectModal() }>
									<div className="create-project-thumb-body" >
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

				<Modal
					isOpen={this.state.UI.createProjectModalOpen}
					onRequestClose={this.closeCreateProjectModal}
					className="modal-accounts-settings-content"
					style={ModalBox}
				>
					<CreateProject onCloseBtnClick={this.closeCreateProjectModal}/>
				</Modal>

			</div>
		);
	}
}





function mapStateToProps(state){
	return state;
  }

export default connect( mapStateToProps, { updatePersonalProjects, updateProjectRedux} ) (Dashboard);
