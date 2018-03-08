import React, { Component } from 'react';
import './modals.scss'
import PropTypes from 'prop-types';
import { updateUserInfo, updateUserEmail } from '../../../../../services/account.services';
import { connect } from 'react-redux';
class ChangeEmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    }

    handleEmailSubmit(){
        const userid = this.props.userInfo.id;
        const reqBody = {
            email: this.state.email
        };
        console.table(reqBody)
        updateUserEmail(userid, reqBody)
          .then( res => {
            if ( res.status !== 200 ) {
              alert(res);
            }
            else{
              this.props.pullFromBackend(userid)
              this.props.onCloseBtnClick();

            }
          })
          .catch(err => {throw err});
      }

    handleEmailChange(e){
        let newEmail = e.toLowerCase();
        this.setState({
            email: newEmail
          })
      }

    render() {
        const { handleEmailSubmit, userInfo } = this.props;
      return (
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
                <div className="modal-header">
                    <h2 className="modal-title">CHANGE EMAIL</h2>
                    <span className="closeBtn" onClick={this.props.onCloseBtnClick}>&times;</span>
                </div>
                {/* <form> */}
                <div className="modal-body">

                    <label className="modal-input-tag">Current Email</label>
                    <section className="modal-row">
                        <label className="current-email">{userInfo.email}</label>
                    </section>
                    <label className="modal-input-tag">New Email</label>
                    <section className="modal-row">
                        <input className="modal-form" type="email" autoFocus onChange={(e) => {this.handleEmailChange(e.target.value)}} maxLength={30} required/>
                    </section>
                </div>
                <div className="submitModal">
                    <button className="cancel-btn" onClick={ this.props.onCloseBtnClick }> Cancel </button>
                    <button id="updateEmail" className="submit-btn" deleted onClick={(e) => {this.handleEmailSubmit()}}> Update </button>
                </div>
                {/* </form> */}
            </div>
        </div>

      );
    }
  }

  function mapStateToProps(state){
      return state
  }

  ChangeEmail.propTypes = { onCloseBtnClick: PropTypes.func }
  ChangeEmail.defaultProps = { onCloseBtnClick: () => {} }
  export default connect(mapStateToProps)(ChangeEmail);


