import React, { Component } from 'react';
import './modals.scss'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUserPassword } from '../../../../../services/account.services';

class ChangePassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            confirmPassword: '',
            newPassword: ''
        }
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);

    }

    handlePasswordSubmit(){
        const userid = this.props.userInfo.id;
        let { confirmPassword, newPassword } = this.state;
        if(newPassword === confirmPassword) {
            const reqBody = {
                password: newPassword
            };
            updateUserPassword(userid, reqBody)
                .then( res => {
                    if ( res.status !== 200 ) {
                        alert(res);
                    }
                    else {
                        this.props.pullFromBackend(userid);
                        this.props.onCloseBtnClick();
                    }
                })
                .catch(err => {throw err});
        }
    }

    handleNewPasswordChange(text){
        this.setState({
            newPassword: text
        })
    }

    handleConfirmPasswordChange(text){
        this.setState({
            confirmPassword: text
        })
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
                <label className="modal-input-tag">New Password</label>
                <section className="modal-row">
                    <input type="password" className="modal-form" autoFocus required onChange={ (e) => {this.handleNewPasswordChange(e.target.value)}} maxLength="18" />
                </section>
                <label className="modal-input-tag">Confirm Password</label>
                <section className="modal-row">
                    <input type="password" className="modal-form" required onChange={ (e) => {this.handleConfirmPasswordChange(e.target.value)}} maxLength="18" />
                </section>

                </div>
                <div className="submitModal">
                    <button className="cancel-btn" onClick={this.props.onCloseBtnClick}> Cancel </button>
                    <button id="updatePassword" className="submit-btn" onClick={(e) => {this.handlePasswordSubmit()}}> Update </button>
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


