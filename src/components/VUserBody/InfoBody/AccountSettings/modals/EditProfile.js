import React, { Component } from 'react';
import './modals.scss'
import PropTypes from 'prop-types';
import { updateUserProfile } from '../../../../../services/account.services'
import { connect } from 'react-redux';
import ModalTextField from '../../../landomon-UI/ModalTextField';
import SubmitButton from '../../../landomon-UI/SubmitButton';

class EditProfile extends Component {
  constructor(props){
    super(props)
    this.state={
      username: '',
      firstName: '',
      lastName: '',
      errorText: '',
      showSuccessButton: false,
      firstNameFail: false,
      lastNameFail: false,
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

// ========== Green Update button doesn't go away on empty strings in input fields

  handleFirstNameChange(e){
    let newFirstName = e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
    if(this.state.errorText.length > 3){
      this.setState({
        errorText: '',
        firstNameFail: false
      })
    }
    if (newFirstName !== '') { 
      this.setState({
        firstName: newFirstName,
        showSuccessButton: false,
      })
    } 
    else if (newFirstName = '') {
        this.setState({
          showSuccessButton: true,
        })
      }
    console.log(this.state);
  }

  handleLastNameChange(e){
    let newLastName = e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();;
    if(this.state.errorText.length > 3){
      this.setState({
        errorText: '',
        lastNameFail: false
      })
    }
    if (newLastName !== '') { 
      this.setState({
        lastName: newLastName,
        showSuccessButton: false,
      })
    }
    else if (newLastName = '') {
      this.setState({
          showSuccessButton: true,
      })
    }
    console.log(this.state);
  }

  //================= end comment

  handleUserNameChange(e){
    let newUsername = e.toLowerCase();
    this.setState({
          username: newUsername
      })
  }

    render() {
      console.log(this.state)
      const { userInfo, onCloseBtnClick } = this.props;
      return (
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
              <div className="modal-header">
                <h2 className="modal-title">EDIT PROFILE</h2>
                <span onClick={onCloseBtnClick} className="closeBtn">&times;</span>
              </div>

                <div className="modal-body">

                    <section className="modal-row">
                        <ModalTextField 
                            label="First Name"
                            onChangeAction={(e) => {this.handleFirstNameChange(e.target.value)}}
                            maxLength="18"
                            defaultValue={userInfo.first_name}
                        />
                    </section>

                    <section className="modal-row">
                      <ModalTextField 
                        label="Last Name"
                        onChangeAction={(e) => {this.handleLastNameChange(e.target.value)}}
                        maxLength="18"
                        defaultValue={userInfo.last_name}
                      />
                    </section>

            
                </div>
              <div className="submitModal">
                <button className="cancel-btn" onClick={onCloseBtnClick}> Cancel </button>
                <SubmitButton 
                  onClickAction={(e) => {this.handleNameSubmit()}}
                  label="Update"
                  disabled={this.state.showSuccessButton}
                />
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


