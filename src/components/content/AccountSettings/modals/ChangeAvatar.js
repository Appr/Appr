import React, { Component } from 'react';
import './modals.scss'
import PropTypes from 'prop-types';

class ChangeAvatar extends Component {
    
    render() {
      return (
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
                <div className="modal-header">
                    <div className="modal-header-placeholder"></div>
                    <h2 className="modal-title">Change Avatar</h2>
                    <span className="closeBtn" onClick={this.props.onCloseBtnClick}>&times;</span>
                </div>
                <form>
                <div className="modal-body">
                    <label class="modal-input-tag">Change Image URL</label>
                    <section class="modal-row">
                        <input class="modal-form" type="url" pattern={/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)jpg|png|gif?/g} autoFocus placeholder={this.props.userInfo.avatar} onChange={(e) => {this.props.handleAvatarChange(e.target.value)}}  required />
                        
                    </section>
                        
                </div>
                <div className="submitModal">
                    <button id="updateAvatar">
                    Update Avatar
                    </button>
                </div>
                </form>
            </div>
        </div>
      );
    }
  }

  ChangeAvatar.propTypes = { onCloseBtnClick: PropTypes.func }
  ChangeAvatar.defaultProps = { onCloseBtnClick: () => {} }
  export default ChangeAvatar;


