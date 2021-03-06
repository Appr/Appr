import React, { Component } from 'react';
import '../../AccountSettings/modals/modals.scss';
import PropTypes from 'prop-types';
import { updateUserInfo, updateUserEmail } from '../../../../../services/account.services';
import { createProject, findProject, updateProject, updateLastOpenedProject } from '../../../../../services/project.services';
import { findDashboardInfo, findPersonalProjects, findRecentProjects } from '../../../../../services/dashboard.services';
import { connect } from 'react-redux';
import { updatePersonalProjects, updateProjectRedux, updateRecentProjects } from '../../../../../actions/actionCreators';
import history from '../../../../../history';
import SubmitButton from '../../../landomon-UI/SubmitButton';
import moment from 'moment';
import ModalTextField from '../../../landomon-UI/ModalTextField';

class CreateProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            projectName: '',
            validated: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleProjectSubmit = this.handleProjectSubmit.bind(this);
    }

    handleProjectSubmit(){
        const userid = this.props.userInfo.id;
        const reqBody = {
            name: this.state.projectName,
            authorId: userid
        };
        console.table(reqBody)
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
                            let projectid = res.data[0].id;
                            this.props.updateProjectRedux(res.data[0]);
                            let newTime = moment();
                            let lastOpenedBody = {
                                time: newTime
                            }
                            updateLastOpenedProject(projectid, lastOpenedBody)
                            .then( res => {
                                if(res.status === 200){
                                    findRecentProjects(userid)
                                        .then(res => {
                                            if(res.status === 200){
                                                this.props.updateRecentProjects(res.data)
                                                history.push(`/user/${userid}/project/${projectid}/ideas`);
                                                this.props.onCloseBtnClick();
                                            }
                                        })
                                }
                            })
						})
                    }

				})
                .catch(err => {throw err});
      }

    handleNameChange(e){
        let newProjectName = e;
        this.setState({
            projectName: newProjectName
          })
        if (e === '') {
            this.setState({
                validated: true
            })
        }
        else{
            this.setState({
                validated: false
            })
        }
        // else if(this.state.projectName.length === 0){
        //     this.setState({
        //         validated: false
        //     })
        // }
      }

    render() {
        // function handleValidation(incomingName){
        //     if (incomingName !== '') {
        //         console.log('should enable');
        //         this.setState({
        //             validated: true
        //         })
        //     }
        //     if (incomingName === ''){
        //         console.log('should disable');
        //         this.setState({
        //             validated: false
        //         })
        //     }
        // }
        const { userInfo } = this.props;
      return (
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
                <div className="modal-header">
                    <h2 className="modal-title">CREATE PROJECT</h2>
                    <span className="closeBtn" onClick={this.props.onCloseBtnClick}>&times;</span>
                </div>
                <div className="modal-body">
                    <section className="modal-row">
                        <ModalTextField
                            label ="Project Name"
                            onChangeAction={(e) => {this.handleNameChange(e.target.value)}}
                            type='text'
                            maxLength={20}
                        />
                    </section>
                </div>
                <div className="submitModal">
                    <button className="cancel-btn" onClick={ this.props.onCloseBtnClick }> Cancel </button>
                    {/* <button id="createProject" className="submit-btn" deleted onClick={(e) => {this.handleProjectSubmit()}}> Update </button> */}
                    <SubmitButton label='create' disabled={this.state.validated} onClickAction={this.handleProjectSubmit} />
                </div>
            </div>
        </div>

      );
    }
  }

  function mapStateToProps(state){
      return state
  }

  CreateProject.propTypes = { onCloseBtnClick: PropTypes.func }
  CreateProject.defaultProps = { onCloseBtnClick: () => {} }
  export default connect(mapStateToProps, {updatePersonalProjects, updateProjectRedux, updateRecentProjects})(CreateProject);