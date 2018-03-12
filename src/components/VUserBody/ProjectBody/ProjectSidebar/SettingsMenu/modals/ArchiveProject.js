import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProject } from '../../../../../../services/project.services';
import history from '../../../../../../history';
import { findDashboardInfo, findPersonalProjects } from '../../../../../../services/dashboard.services';
import { updatePersonalProjects } from '../../../../../../actions/actionCreators';
import DeleteButton from '../../../../landomon-UI/DeleteButton';
import ModalTextField from '../../../../landomon-UI/ModalTextField';


class ArchiveProject extends Component {
  constructor(props){
    super(props)
    this.state={
      projectName: '',
      hideButtonSuccess: true,
      buttonLoading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
  }

  handleChange(e){
    let storeProjectName = this.props.projectInfo.name;
    if(e === storeProjectName){
      this.setState({hideButtonSuccess: false})
    }
    else if(e !== storeProjectName){
      this.setState({hideButtonSuccess: true})
    }
    this.setState({
          projectName: e
    })
  }

  handleArchive(){
    this.setState({
      buttonLoading: true
    })
    let projectid = this.props.projectInfo.id;
    let userid = this.props.userInfo.id;
    let path = `/user/${userid}/dashboard`;
    deleteProject(projectid)
        .then(res =>{
          findPersonalProjects(userid)
          .then( res => {
              this.setState({
                buttonLoading: false
              })
              this.props.updatePersonalProjects(res.data);
              history.push(path);
          })
        })
  }
    render() {
        const { closeArchiveModal, projectInfo, userInfo, updatePersonalProjects } = this.props;

        function handleArchive(){

        }

      return (

        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
              <div className="modal-header">
                <h2 className="modal-title">DELETE {projectInfo.name}</h2>
                <span className="closeBtn" onClick={(e) => closeArchiveModal()}>&times;</span>
              </div>

                <div className="modal-body">

                    <section className="modal-row">
                      <ModalTextField 
                        label={`Type in project name to 
                        confirm.`}
                        labelStyle={{fontSize: '10pt'}}
                        onChangeAction={e => this.handleChange(e.target.value)}
                      />
                    </section>

                </div>
              <div className="submitModal">
                <button className="cancel-btn" onClick={ (e) => closeArchiveModal() }> Cancel </button>
                <DeleteButton
                  onClickAction={(e) => this.handleArchive()}
                  label='DELETE'
                  loading={this.state.buttonLoading}
                  disabled={this.state.hideButtonSuccess}
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


  export default connect(mapStateToProps, {updatePersonalProjects}) (ArchiveProject);


