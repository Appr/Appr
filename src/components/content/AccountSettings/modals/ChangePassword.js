import React, { Component } from 'react';
import './modals.scss'
import PropTypes from 'prop-types';

class ChangePassword extends Component {
    
    render() {
      return (
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
                <div className="modal-header">
                    <div className="modal-header-placeholder"></div>
                    <h2 className="modal-title">Change Password</h2>
                    <span className="closeBtn" onClick={this.props.onCloseBtnClick}>&times;</span>
                </div>
                <form>
                <div className="modal-body">
                <label className="modal-input-tag">New Password</label>
                <section className="modal-row">
                    <input type="password" className="modal-form" autoFocus required/>
                </section>
                <label className="modal-input-tag">Confirm Password</label>
                <section className="modal-row">
                    <input type="password" className="modal-form" required />
                </section>
                
                </div>
                <div className="submitModal">
                    <button type="submit" id="updatePassword">
                    Update Password
                    </button>
                </div>
                </form>
            </div>
        
        </div>
        
      );
    }
  }

  ChangePassword.propTypes = { onCloseBtnClick: PropTypes.func }
  ChangePassword.defaultProps = { onCloseBtnClick: () => {} }
  export default ChangePassword;


