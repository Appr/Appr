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
                        <input class="modal-form" type="url" autoFocus placeholder={this.props.userInfo.avatar} onChange={(e) => {this.props.handleAvatarChange(e.target.value)}}  required />
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


