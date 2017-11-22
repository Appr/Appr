import React, { Component } from 'react';
import editIcon from '../../img/icons/Pencil-Icon.svg';
import Header from '../Header';
import { Link } from 'react-router-dom';



  
  
  

class AccountSettings extends Component {

  render() {
    return (
      <div className="account-settings-container">
          <div className="profile-section-outter">
              <div className="profile-section-inner">
              <div className="avatar-initial">
              L
              </div>
              <div className="name-username-edit-con">
                <div className="name-and-username">
                    <div className="headline-22">Landon Johnson </div>
                    <div className="text-9">@landonwjohnson</div>
                </div>
                <div id="editProfileBtn">
                  <div className="button-icon"><img src={editIcon}/></div>
                  Edit Profile
                  </div>
              </div>
            </div>
          </div>
          <div className="account-section">
            <div className="headline-30"> Account Settings </div>
            <div className="landscape-divider" />
            <div className="account-options">
              <div className="headline-20"> Change Email </div>
              <div className="headline-20"> Change Password </div>
              <div className="headline-20"> Change Avatar </div>
            </div>
          </div>





          <div id="editProfileModal" className="modalStyle">
            <div className="modalStyle-inner">
                <div className="modal-account-settings-content">
                  <div className="modal-header">
                    <div className="modal-header-placeholder"></div>
                    <h2 className="modal-title">Edit Profile</h2>
                    <Link to="/"><span className="closeBtn">&times;</span></Link>
                    
                  </div>
                  <div className="modal-body">
                    <label className="modal-input-tag">First Name</label>
                      <section className="modal-row">
                        <input className="modal-form" />
                      </section>
                    
                    <label className="modal-input-tag">Last Name</label>
                      <section className="modal-row">
                        <input className="modal-form" />
                      </section>
                    
                    <label className="modal-input-tag">Email</label>
                      <section className="modal-row">
                        <input className="modal-form" />
                      </section>
                  </div>
                  <div className="submitModal">
                    <button id="updateProfile">
                      Update Profile
                    </button>
                  </div>
                </div>
                </div>
          </div>
      </div>
    );
  }
}

export default AccountSettings;
