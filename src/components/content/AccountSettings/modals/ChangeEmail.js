import React, { Component } from 'react';
import './modals.scss'
import PropTypes from 'prop-types';

class ChangeEmail extends Component {
    
    render() {
      return (
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
                <div className="modal-header">
                    <div className="modal-header-placeholder"></div>
                    <h2 className="modal-title">Change Email</h2>
                    <span className="closeBtn" onClick={this.props.onCloseBtnClick}>&times;</span>
                </div>
                <div className="modal-body">
                    <label className="modal-input-tag">Current Email</label>
                    <section className="modal-row">
                        <label className="current-email">{this.props.userInfo.email}</label>
                    </section>
                    <label className="modal-input-tag">New Email</label>
                    <section className="modal-row">
                        <input className="modal-form" autoFocus onChange={(e) => {this.props.handleEmailChange(e.target.value)}} maxLength={30}/>
                    </section>
                </div>
                <div className="submitModal">
                    <button id="updateEmail">
                    Update Email
                    </button>
                </div>
            </div>
        </div>
        
      );
    }
  }

  ChangeEmail.propTypes = { onCloseBtnClick: PropTypes.func }
  ChangeEmail.defaultProps = { onCloseBtnClick: () => {} }
  export default ChangeEmail;


