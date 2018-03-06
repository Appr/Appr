import React, { Component } from 'react';
import './modals.scss'
import PropTypes from 'prop-types';
import { updateUserInfo, updateUserProfile } from '../../../../../services/account.services'
import { connect } from 'react-redux';

class EditProfile extends Component {
  constructor(props){
    super(props)
    this.state={
      username: '',
      firstName: '',
      lastName: '',
    }
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
  }


  handleNameSubmit(){
    const userid = this.props.userInfo.id;
    let { firstName, lastName } = this.state;
    const reqBody = { 
        firstName,
        lastName
    };
    updateUserProfile(userid, reqBody)
      .then( res => {
        if ( res.status !== 200 ) {
          alert(res);
        }
        else{
          this.props.pullFromBackend(userid);
          this.props.onCloseBtnClick();
        }
      })
      .catch(err => {throw err});
  }



  handleFirstNameChange(e){
    let newFirstName = e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
    this.setState({
          firstName: newFirstName,
      })
  }

  handleLastNameChange(e){
    let newLastName = e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();;
    this.setState({
          lastName: newLastName
      })
  }

  handleUserNameChange(e){
    let newUsername = e.toLowerCase();
    this.setState({
          username: newUsername
      })
  }
    
    render() {
      console.log(this.state)
      const { userInfo, handleNameSubmit, onCloseBtnClick } = this.props;
      return (
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
              <div className="modal-header">
                <div className="modal-header-placeholder"></div>
                <h2 className="modal-title">Edit Profile</h2>
                <span onClick={onCloseBtnClick} className="closeBtn">&times;</span>
              </div>
              
                <div className="modal-body">
                  
                  <label className="modal-input-tag">First Name</label>
                    <section className="modal-row">
                      <input className="modal-form" defaultValue={userInfo.first_name} onChange={ (e) => {this.handleFirstNameChange(e.target.value)}} autoFocus maxLength="18" />
                    </section>
                  
                  <label className="modal-input-tag">Last Name</label>
                    <section className="modal-row">
                      <input className="modal-form" defaultValue={userInfo.last_name} onChange={ (e) => {this.handleLastNameChange(e.target.value)}} maxLength="18"/>
                    </section>
                  
                  {/* <label className="modal-input-tag">Username</label>
                    <section className="modal-row">
                      <input className="modal-form" defaultValue={userInfo.username} onChange={ (e) => {this.handleUserNameChange(e.target.value)}} maxLength="18"/>
                    </section> */}
                </div>
              <div className="submitModal">
                <button id="updateProfile" onClick={(e) => {this.handleNameSubmit()}}>
                  Update Profile
                </button>
              </div>
            </div>
           </div>
      );
    }
  }

  function mapStateToProps(state){
    return state
  }

  EditProfile.propTypes = { onCloseBtnClick: PropTypes.func }
  EditProfile.defaultProps = { onCloseBtnClick: () => {} }
  export default connect(mapStateToProps)(EditProfile);


