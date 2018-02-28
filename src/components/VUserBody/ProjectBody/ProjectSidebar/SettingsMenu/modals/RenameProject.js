import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProject, updateProject, findProject } from '../../../../../../services/project.services';
import history from '../../../../../../history';
import { findDashboardInfo } from '../../../../../../services/dashboard.services';
import { updateDashboard, updateProjectRedux } from '../../../../../../actions/actionCreators';


class RenameProject extends Component {
  constructor(props){
    super(props)
    this.state={
        localProjectName: ''

    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRename = this.handleRename.bind(this);
  } 

  handleNameChange(e){
    let newName = e;
    this.setState({
        localProjectName: newName
    })
  }

  handleRename(){
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
                    findDashboardInfo(userid)
                        .then( res => {
                            this.props.updateDashboard(res.data)
                            
                            closeProjectNameModal()
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
                <div className="modal-header-placeholder"></div>
                <h2 className="modal-title">Change Project Name</h2>
                <span className="closeBtn" onClick={(e) => closeProjectNameModal()}>&times;</span>
              </div>
              
                <div className="modal-body">
                  
                    <label className="modal-input-tag">Current Name</label>
                        <section className="modal-row">
                            <label className="current-email">{projectInfo.name}</label>
                        </section>
                        <label className="modal-input-tag">New Name</label>
                        <section className="modal-row">
                            <input className="modal-form" autoFocus onChange={(e) => {this.handleNameChange(e.target.value)}} maxLength={30} required/>
                        </section>
                
                </div>
              <div className="submitModal">
                <button onClick={(e) => this.handleRename()}>
                  CHANGE NAME
                </button>
              </div>
            </div>
           </div>
      );
    }
  }

  function mapStateToProps(state){
    return state;
  }


  export default connect(mapStateToProps, {updateDashboard, updateProjectRedux}) (RenameProject);


