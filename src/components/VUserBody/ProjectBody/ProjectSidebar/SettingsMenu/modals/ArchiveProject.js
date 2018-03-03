import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProject } from '../../../../../../services/project.services';
import history from '../../../../../../history';
import { findDashboardInfo, findPersonalProjects } from '../../../../../../services/dashboard.services';
import { updatePersonalProjects } from '../../../../../../actions/actionCreators';


class ArchiveProject extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }




    
    render() {

        const { closeArchiveModal, projectInfo, userInfo, dashboardInfo, updatePersonalProjects } = this.props;

        function handleArchive(){
            let projectid = projectInfo.id;
            let userid = userInfo.id;
            let path = `/user/${userid}/dashboard`;
            deleteProject(projectid)
                .then(res =>{
                  findPersonalProjects(userid)
                  .then( res => {
                      updatePersonalProjects(res.data);
                      history.push(path);                 
                  })
                })

        }

      return (
          
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
              <div className="modal-header">
                <div className="modal-header-placeholder"></div>
                <h2 className="modal-title"></h2>
                <span className="closeBtn" onClick={(e) => closeArchiveModal()}>&times;</span>
              </div>
              
                <div className="modal-body">
                  
                    <p>Are you sure you want to archive <b>{projectInfo.name}</b>?
                    </p>
                
                </div>
              <div className="submitModal">
                <button onClick={(e) => handleArchive()}>
                  ARCHIVE
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


  export default connect(mapStateToProps, {updatePersonalProjects}) (ArchiveProject);


