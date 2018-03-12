import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProject, updateProject, findProject } from '../../../../../../services/project.services';
import history from '../../../../../../history';
import { findDashboardInfo, findPersonalProjects, findRecentProjects } from '../../../../../../services/dashboard.services';
import { updateDashboard, updateProjectRedux, updatePersonalProjects, updateRecentProjects } from '../../../../../../actions/actionCreators';
import ModalTextField from '../../../../landomon-UI/ModalTextField';
import SubmitButton from '../../../../landomon-UI/SubmitButton';


class RenameProject extends Component {
  constructor(props){
    super(props)
    this.state={
        localProjectName: '',
        validated: '',
        buttonLoading: false

    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRename = this.handleRename.bind(this);
  }

  handleNameChange(e){
    let newName = e;
    this.setState({
        localProjectName: newName
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
  }

  handleRename(){
    this.setState({
      buttonLoading: true
    })
    const { closeProjectNameModal, projectInfo, userInfo, dashboardInfo, updateProjectRedux } = this.props;
    let projectid = projectInfo.id;
    let userid = userInfo.id;
    let newName = this.state.localProjectName;
    let reqBody = {name: newName, background: projectInfo.background}
    updateProject(projectid, reqBody)
        .then(res => {
            findProject(projectid)
                .then( res => {
                    updateProjectRedux(res.data[0])
                    findPersonalProjects(userid)
                    .then( res => {
                      this.props.updatePersonalProjects(res.data);
                      findRecentProjects(userid)
                      .then(res => {
                          if(res.status === 200){
                              this.props.updateRecentProjects(res.data)
                              this.setState({
                                buttonLoading: false
                              })
                              closeProjectNameModal()
                          }
                      })
                  })

                })
        })
}
    render() {
        const { closeProjectNameModal, projectInfo, userInfo, dashboardInfo } = this.props;



        console.log(this.state.localProjectName);

      return (

        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
              <div className="modal-header">
                <h2 className="modal-title">CHANGE PROJECT NAME</h2>
                <span className="closeBtn" onClick={(e) => closeProjectNameModal()}>&times;</span>
              </div>

                <div className="modal-body">
                    <section className="modal-row">
                        <ModalTextField 
                          onChangeAction={(e) => {this.handleNameChange(e.target.value)}} 
                          maxLength={20}
                        />
                    </section>
                </div>
              <div className="submitModal">
                <button className="cancel-btn" onClick={ (e) => closeProjectNameModal() }> Cancel </button>
                <SubmitButton 
                  onClickAction={(e) => this.handleRename()}
                  label="UPDATE"
                  disabled={this.state.validated}
                  loading={this.state.buttonLoading}
                />
              </div>
            </div>
           </div>
      );
    }
  }

  function mapStateToProps(state){
    return state;
  }


  export default connect(mapStateToProps, {updatePersonalProjects, updateProjectRedux, updateRecentProjects}) (RenameProject);


