import React, { Component } from 'react';
import './modals.scss'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUserPassword } from '../../../../../services/account.services';
import SubmitButton from '../../../landomon-UI/SubmitButton';
import ModalTextField from '../../../landomon-UI/ModalTextField';


class ChangePassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            confirmPassword: '',
            newPasswordForceFail: false,
            errorText: '',
            showSuccessButton: false,
            showSuccessField: false,
            buttonLoading: false
        }
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    }

    handlePasswordSubmit(){
        this.setState({
            buttonLoading: true
        })
        const userid = this.props.userInfo.id;
        let { confirmPassword, newPassword } = this.state;
        if(newPassword === confirmPassword) {
            const reqBody = {
                password: newPassword
            };
            updateUserPassword(userid, reqBody)
                .then( res => {
                    if(res.data['passwordError']){
                        let newErrorText = res.data['passwordError'];
                        console.log(newErrorText)
                        this.setState({
                            showSuccessField: false,
                            errorText: newErrorText,
                            newPasswordForceFail: true
                    })}
                    else {
                        this.setState({
                            buttonLoading: false
                        })
                        this.props.pullFromBackend(userid);
                        this.props.onCloseBtnClick();
                    }
                })
                .catch(err => {throw err});
        }
    }



    handleNewPasswordChange(text){
        let confirmPassword = this.state.confirmPassword;
        if(this.state.errorText.length > 3){
            this.setState({
                errorText: '',
                newPasswordForceFail: false
            })
        }
        this.setState({
            newPassword: text
        })
        
        if (text !== confirmPassword) {
            this.setState({
                showSuccessButton: true,
                showSuccessField: true
            })
        }
        else{
            this.setState({
                showSuccessButton: false,
                showSuccessField: false
            })
        }
    }

    handleConfirmPasswordChange(text){
        let newPassword = this.state.newPassword;
        if(this.state.errorText.length > 3){
            this.setState({
                errorText: '',
                newPasswordForceFail: false
            })
        }
        this.setState({
            confirmPassword: text
        })
        if (text !== newPassword) {
            this.setState({
                showSuccessButton: true,
                showSuccessField: true
            })
        }
        else{
            this.setState({
                showSuccessButton: false,
                showSuccessField: false
            })
        }
    }

    render() {
        console.table(this.state);
      return (
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
                <div className="modal-header">
                    <h2 className="modal-title">CHANGE PASSWORD</h2>
                    <span className="closeBtn" onClick={this.props.onCloseBtnClick}>&times;</span>
                </div>

                <div className="modal-body">
                <section className="modal-row">
                    <ModalTextField 
                        type='password'
                        onChangeAction={(e) => {this.handleNewPasswordChange(e.target.value)}}
                        label="New Password"
                        maxLength="18"
                        showSuccess={this.state.showSuccessField}
                        forceFail={this.state.newPasswordForceFail}
                        
                    />
                </section>
                <section className="modal-row">
                    <ModalTextField 
                        type='password'
                        onChangeAction={(e) => {this.handleConfirmPasswordChange(e.target.value)}}
                        label="Confirm Password"
                        errorText={this.state.errorText}
                        maxLength="18"
                        showSuccess={this.state.showSuccessField}
                    />
                </section>

                </div>
                <div className="submitModal">
                    <button className="cancel-btn" onClick={this.props.onCloseBtnClick}> Cancel </button>                    
                    <SubmitButton 
                        label='update' 
                        disabled={this.state.showSuccessButton} 
                        onClickAction={this.handlePasswordSubmit}
                        loading={this.state.buttonLoading}
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

  ChangePassword.propTypes = { onCloseBtnClick: PropTypes.func }
  ChangePassword.defaultProps = { onCloseBtnClick: () => {} }

  export default connect(mapStateToProps)(ChangePassword);


