import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../../../../history';
import { deleteUser } from '../../../../../services/account.services';


class ArchiveAccount extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
    render() {

        const { closeArchiveModal, projectInfo, userInfo } = this.props;

        function handleArchive(){
            let projectid = projectInfo.id;
            let userid = userInfo.id;
            let path = `/`;
            let reqBody = { userid }
            console.log(userid)
            deleteUser(reqBody)
                .then( res => {
                    console.log(res.data)
                    history.push('/');
                })

        }

      return (

        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
              <div className="modal-header">
                <h2 className="modal-title">DELETE ACCOUNT</h2>
                <span className="closeBtn" onClick={(e) => closeArchiveModal()}>&times;</span>
              </div>

                <div className="modal-body">

                    <p class="modal-warning">Are you sure you want to delete your account <b>{userInfo.first_name}</b>?
                    </p>

                </div>
              <div className="submitModal">
                <button className="cancel-btn" onClick={ (e) => closeArchiveModal() }> Cancel </button>
                <button className="archive-btn" onClick={(e) => handleArchive()}> DELETE </button>
              </div>
            </div>
           </div>
      );
    }
  }

  function mapStateToProps(state){
    return state;
  }


  export default connect(mapStateToProps) (ArchiveAccount);


