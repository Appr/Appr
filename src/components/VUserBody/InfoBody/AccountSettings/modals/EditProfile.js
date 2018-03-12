import React, { Component } from 'react';
import './modals.scss'
import PropTypes from 'prop-types';
import { updateUserInfo, updateUserProfile } from '../../../../../services/account.services'
import { connect } from 'react-redux';
import ModalTextField from '../../../landomon-UI/ModalTextField';
import SubmitButton from '../../../landomon-UI/SubmitButton';

class EditProfile extends Component {
  constructor(props){
    super(props)
    this.state={
      fields: {
        firstName: this.props.userInfo.first_name,
        lastName: this.props.userInfo.last_name
      },
      buttonLabel: 'Update',
      hideButtonSuccess: true
    }
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
  }




  handleNameSubmit(){

    const userid = this.props.userInfo.id;
    let { firstName, lastName } = this.state.fields;
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
    let lastName = this.state.fields.lastName;
    let newFirstName = e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
    this.setState({
        fields: {
          firstName: newFirstName,
          lastName: this.state.fields.lastName
        }
      })
      if(newFirstName === '' || lastName === ''){
        this.setState({hideButtonSuccess: true})
      }
      else{
        this.setState({hideButtonSuccess: false})
      }

    
  }

  handleLastNameChange(e){
    let firstName = this.state.fields.firstName;
    let newLastName = e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();;
    this.setState({
      fields: {
        firstName: this.state.fields.firstName,
        lastName: newLastName
      }
      })
      if(newLastName === '' || firstName === ''){
        this.setState({hideButtonSuccess: true})
      }
      else{
        this.setState({hideButtonSuccess: false})
      }



  }



    render() {
      const { userInfo, handleNameSubmit, onCloseBtnClick } = this.props;
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
                  disabled={this.state.hideButtonSuccess}
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


