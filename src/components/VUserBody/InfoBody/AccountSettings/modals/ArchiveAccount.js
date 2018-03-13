import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../../../../history';
import { deleteUser } from '../../../../../services/account.services';
import ModalTextField from '../../../landomon-UI/ModalTextField';
import DeleteButton from '../../../landomon-UI/DeleteButton';


class ArchiveAccount extends Component {
  constructor(props){
    super(props)
    this.state={
        email: '',
        password: '',
        hideButtonSuccess: true,
        buttonLoading: false,
        errorText: '',
        emailForceFail: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
  }

  handlePasswordChange(e){
    if(this.state.errorText.length > 3){
      this.setState({
          errorText: '',
          emailForceFail: false
      })
    }
    this.setState({
      password: e
    })
  }

  handleEmailChange(e){
    let storeEmail = this.props.userInfo.email;
      if(this.state.errorText.length > 3){
        this.setState({
            errorText: '',
            emailForceFail: false
        })
      }
      if(e === storeEmail){
        this.setState({hideButtonSuccess: false})
      }
      else if(e !== storeEmail){
        this.setState({hideButtonSuccess: true})
      }

      this.setState({
        email: e
      })
  }
  handleArchive(){
    let projectid = this.props.projectInfo.id;
    let userid = this.props.userInfo.id;
    let { email, password } = this.state;
    if(password === ''){
      this.setState({
        errorText: 'Wrong account information',
        emailForceFail: true
      })
    }
    else{
    let path = `/`;
    let reqBody = { userid, password, email }
    console.log(userid)
    deleteUser(reqBody)
        .then( res => {
            if(res.data['ErrorText']){
              let newError = res.data['ErrorText']
              this.setState({
                errorText: newError,
                emailForceFail: true
              })
            }
            else{
              history.push('/');
            }
        })
      }
    }
    render() {
      console.log(this.state)

        const { onCloseBtnClick, projectInfo, userInfo } = this.props;


      return (

        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
              <div className="modal-header">
                <h2 className="modal-title">DELETE ACCOUNT</h2>
                <span className="closeBtn" onClick={(e) => onCloseBtnClick()}>&times;</span>
              </div>

                <div className="modal-body">
                    <section className="modal-row">
                      <ModalTextField 
                        label="Email"
                        onChangeAction={(e) => {this.handleEmailChange(e.target.value)}}
                        forceFail={this.state.emailForceFail}
                      />
                    </section>

                    <section className="modal-row">
                      <ModalTextField 
                        onChangeAction={(e) => {this.handlePasswordChange(e.target.value)}}
                        label="Password"
                        type="password"
                        errorText={this.state.errorText}
                      />
                    </section>
                </div>
              <div className="submitModal">
                <button className="cancel-btn" onClick={ (e) => onCloseBtnClick() }> Cancel </button>
                {/* <button className="archive-btn" onClick={(e) => this.handleArchive()}> DELETE </button> */}
                <DeleteButton
                  onClickAction={(e) => this.handleArchive()}
                  label="DELETE"
                  loading={this.state.buttonLoading}
                  disabled={this.state.hideButtonSuccess}
                />
              </div>
            </div>
           </div>
      );
    }
  }

  function mapStateToProps(state){
    return state;
  }


  export default connect(mapStateToProps) (ArchiveAccount);


