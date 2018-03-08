import React, { Component } from 'react';
import './modals.scss'
import PropTypes from 'prop-types';
import { updateUserInfo, updateUserEmail } from '../../../../../services/account.services';
import { connect } from 'react-redux';
import ModalTextField from '../../../landomon-UI/ModalTextField';
import SubmitButton from '../../../landomon-UI/SubmitButton';
class ChangeEmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            errorText: '',
            fieldsFilled: false
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
              console.log(res.data)
            if(res.data['emailError']){
                console.log(res)
                let newErrorText = res.data['emailError'];
                this.setState({
                    errorText: newErrorText
                })
            }
            else{
              this.props.pullFromBackend(userid)
              this.props.onCloseBtnClick();

            }
          })
          .catch(err => {throw err});
      }



    handleEmailChange(e){
        if(this.state.errorText === 'Email already in use'){
            this.setState({
                errorText: ''
            })
        }


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
                    <section className="modal-row" style={{marginBottom: '18px'}}>
                        <label className="current-email">{userInfo.email}</label>
                    </section>
                    <section className="modal-row">
                        <ModalTextField
                            label="New Email"
                            errorText={this.state.errorText}
                            type="email"
                            placeholder='BROO'
                            onChangeAction={(e) => {this.handleEmailChange(e.target.value)}} 
                            maxLength={30}
                        />
                    </section>
                </div>
                <div className="submitModal">
                    <button className="cancel-btn" onClick={ this.props.onCloseBtnClick }> Cancel </button>
                    <SubmitButton 
                        label='update' 
                        disabled={this.state.fieldsFilled} 
                        onClickAction={this.handleEmailSubmit}
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

  ChangeEmail.propTypes = { onCloseBtnClick: PropTypes.func }
  ChangeEmail.defaultProps = { onCloseBtnClick: () => {} }
  export default connect(mapStateToProps)(ChangeEmail);


