import React, { Component } from 'react';
import editIcon from '../../../../img/icons/Pencil-Icon.svg';
import './account-settings.scss';
import EditProfile from './modals/EditProfile';
import ChangeEmail from './modals/ChangeEmail';
import ChangePassword from './modals/ChangePassword'
import ChangeAvatar from './modals/ChangeAvatar';
import Header from '../../Header/Header';
import Modal from 'react-modal';
import { ModalBox } from './accountsettingsStyled';
import { findUser } from '../../../../services/account.services';

class AccountSettings extends Component {
  constructor(){
    super()
    this.state={
      profileModalOpen: false,
      emailModalOpen: false,
      passwordModalOpen: false,
      avatarModalOpen: false,
    }
    //UI Modals
      this.openProfileModal = this.openProfileModal.bind(this);
      this.openEmailModal = this.openEmailModal.bind(this);
      this.openPasswordModal = this.openPasswordModal.bind(this);
      this.openAvatarModal = this.openAvatarModal.bind(this);
      this.closeProfileModal = this.closeProfileModal.bind(this);
      this.closeEmailModal = this.closeEmailModal.bind(this);
      this.closePasswordModal = this.closePasswordModal.bind(this);
      this.closeAvatarModal = this.closeAvatarModal.bind(this);

      this.handleInitials = this.handleInitials.bind(this);
  }

  //UI Modals
    closeProfileModal() {
      this.setState({profileModalOpen: false});
    }

    closeEmailModal(){
      this.setState({emailModalOpen: false})
    }

    closePasswordModal(){
      this.setState({passwordModalOpen: false});
    }

    closeAvatarModal(){
      this.setState({avatarModalOpen: false})
    }

    openProfileModal() {
      this.setState({profileModalOpen: true});
    }

    openEmailModal(){
      this.setState({emailModalOpen: true});
    }

    openPasswordModal(){
      this.setState({passwordModalOpen: true});
    }

    openAvatarModal(){
      this.setState({avatarModalOpen: true})
    }


  //Handle userInfoLocal




    // handleUserNameChange(e){
    //   let newUserName = e;
    //   this.setState({
    //       userInfo: {
    //         initial: this.state.initial,
    //         firstName: this.state.userInfo.firstName,
    //         lastName: this.state.userInfo.lastName,
    //         username: newUserName,
    //         email: this.state.userInfo.email,
    //         avatar: this.state.userInfo.avatar
    //       }
    //     })
    // }



    handleAvatarChange(e){
      let newAvatar = e.trim();
      this.setState({
          userInfo: {
            initial: this.state.initial,
            firstName: this.state.userInfo.firstName,
            lastName: this.state.userInfo.lastName,
            username: this.state.userInfo.username,
            email: this.state.userInfo.email,
            avatar: newAvatar
          }
        })
    }

    handleInitials(e){
      let userInitials;
      if(this.props.userInfo.avatar !== ''){
        userInitials = '';
      }
      else{
        userInitials = this.props.userInfo.firstName.charAt(0).toUpperCase();
      }
  
      return userInitials
    }
  
  render() {
   
    const { userInfo, handleNameSubmit, handleEmailSubmit } = this.props;
    console.log(this.state)
    return (
      <div className="account-settings-container">
          <div className="profile-section-outter">
              <div className="profile-section-inner">
              <div className="wrapper">
                  <div className="change-initial" onClick={this.openAvatarModal}>  
                    <div>Change</div>
                  </div>
                  <div className="avatar-initial"  style={{backgroundImage: `url(${userInfo.avatar})`}} >
                  
                  <label>{userInfo.firstName.charAt(0).toUpperCase()}</label>
                  </div>
                  <div className="name-username-edit-con">
                    <div className="name-and-username">
                        <div className="headline-22" onClick={this.openProfileModal}>{userInfo.firstName} {userInfo.lastName} </div>
                        <div className="text-9">@{userInfo.username}</div>
                    </div>
                    <div className="edit-profile-btn" onClick={this.openProfileModal}>
                      <div className="button-icon"><img src={editIcon} alt="edit profile"/></div>
                      Edit Profile
                      </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="account-section">
            <div className="headline-30"> Account Settings </div>
            <div className="landscape-divider" />
            <div className="account-options">
              <div className="headline-20" onClick={this.openEmailModal}> Change Email </div>
              <div className="headline-20" onClick={this.openPasswordModal}> Change Password </div>
              <div className="headline-20"  onClick={this.openAvatarModal}> Change Avatar </div>
            </div>

          
          </div>





          <Modal 
              isOpen ={this.state.profileModalOpen} 
              onRequestClose={this.closeProfileModal}
              className="modal-account-settings-content"
              style={ModalBox}
          >
              <EditProfile userInfo={userInfo} handleNameSubmit={handleNameSubmit} onCloseBtnClick={this.closeProfileModal} handleFirstNameChange={this.handleFirstNameChange} handleLastNameChange={this.handleLastNameChange} />
          </Modal>

          <Modal 
              isOpen ={this.state.emailModalOpen} 
              onRequestClose={this.closeEmailModal}
              className="modal-account-settings-content"
              style={ModalBox}
          >
              <ChangeEmail userInfo={userInfo}  onCloseBtnClick={this.closeEmailModal} handleEmailSubmit={handleEmailSubmit}/>
          </Modal>

          <Modal 
              isOpen ={this.state.passwordModalOpen} 
              onRequestClose={this.closePasswordModal}
              className="modal-account-settings-content"
              style={ModalBox}
          >
              <ChangePassword userInfo={userInfo} onCloseBtnClick={this.closePasswordModal} />
          </Modal>

          <Modal 
              isOpen ={this.state.avatarModalOpen} 
              onRequestClose={this.closeAvatarModal}
              className="modal-account-settings-content"
              style={ModalBox}
          >
              <ChangeAvatar userInfo={userInfo} onCloseBtnClick={this.closeAvatarModal} handleAvatarChange={this.handleAvatarChange} showAvatarFail={this.showAvatarFail}/>
          </Modal>
      </div>
    );
  }
}

export default AccountSettings;