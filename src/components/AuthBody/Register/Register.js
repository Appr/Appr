import React, { Component } from 'react';
import './register.scss';
import { register, login, loginTest } from '../../../services/auth.services';
import RegFirstname from './RegisterFields/RegFirstname';
import RegLastname from './RegisterFields/RegLastname';
import RegEmail from './RegisterFields/RegEmail';
import RegPassword from './RegisterFields/RegPassword';
import RegUsername from './RegisterFields/RegUsername';
import { connect } from 'react-redux';
import { updateAuth, updateUser } from '../../../actions/actionCreators';
import { findUserInfo } from '../../../services/account.services';
import { withRouter } from 'react-router-dom';
import history from '../../../history';
import CreateAccountButton from '../../VUserBody/landomon-UI/CreateAccountButton';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            username: '',
            firstNameReady: true,
            lastNameReady: true,
            emailReady: true,
            passwordReady: true,
            usernameReady: true,
            emailErrorText: '',
            passwordErrorText: '',
            createAccountBtnLabel: 'Create New Account',
            createAccountBtnLoading: false,
            createAccountBtnDisabled: false
        };

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.toggleReadySwitch = this.toggleReadySwitch.bind(this);
        this.handleButtonRegister = this.handleButtonRegister.bind(this);
    }

    handleChangeInput(e) {
        const key = e.target.name;
        let newState = this.state[key];
        newState = e.target.value;
        this.setState({ [key]: newState });
    }

    toggleReadySwitch(field, ready) {
        //toggle ready switch should only check if all of
        //the fields have been filled out, not validation
        const readySwitch = field + 'Ready';
        if (ready === true) {
            this.setState({ [readySwitch]: true });
        }
        else {
            this.setState({ [readySwitch]: false });
        }
    }

    handleButtonRegister() {
        console.log('register button fired!')
		const isAuth = this.props.authRouter.verifiedUser;
        const { firstName, lastName, email, password } = this.state;
        const ind = email.indexOf("@");
        const username = email.slice(0,ind);
        const reqBody = { firstName, lastName, email, password, username };
        const creds = { username: email, password };
        register(reqBody)
            .then( res => {
                if (res.status === 500){
                    alert('register failed')
                }
            //VALIDATION
                else if(res.data['emailError']){
                    let newErrorText = res.data['emailError'];
                    this.setState({
                        emailErrorText: newErrorText
                    })
                }
                else if(res.data['passwordError']){
                    let newErrorText = res.data['passwordError'];
                    console.log(newErrorText)
                    this.setState({
                        passwordErrorText: newErrorText
                    })
                }
            //VALIDATION
                else if(res.status === 200){
                    this.setState({
                        emailErrorText: '',
                        passwordErrorText: '',
                        createAccountBtnLabel: 'Registering Account',
                        createAccountBtnLoading: true
                    })
                    let hashedPassword = res.data;
                    loginTest(creds)
                        .then( res => {
                            if(res.status === 500){
                                alert('login test failed')
                            }
                            else if(res.status === 200){
                                this.setState({
                                    createAccountBtnLabel: 'Logging in',
                                })
                                this.props.updateAuth(true);
                                const logInBody = {
                                    username: this.state.email,
                                    password: hashedPassword
                                }
                                login(logInBody)
                                    .then( res => {
                                        console.log(res.data)
                                        if(res.status !== 200){
                                            alert('login failed')
                                        }
                                        else if (res.status === 200) {
                                            this.setState({
                                                createAccountBtnLabel: 'getting user informatio'
                                            })
                                            findUserInfo(res.data.id)
                                                .then(res => {
                                                    if(res.status !== 200){
                                                        alert('find user info failed')
                                                    }
                                                    else{
                                                        let userInfo = {
                                                            id: res.data[0].id,
                                                            username: res.data[0].username,
                                                            avatar: res.data[0].avatar,
                                                            first_name: res.data[0].first_name,
                                                            last_name: res.data[0].last_name,
                                                            email: res.data[0].email
                                                        }
                                                        this.props.updateUser(userInfo)
                                                        history.push(`/user/${userInfo.id}/dashboard`);
                                                    }
                                                })
                                        }
                                    
                                    })
                            }
                        })
                        .catch(err => {throw err
                            this.setState({
                                createAccountBtnLabel: 'Create New Account',
                                createAccountBtnLoading: false
                            })
                        })
                        
                    }

                })
                .catch(err => {throw err
                    this.setState({
                        createAccountBtnLabel: 'Create New Account',
                        createAccountBtnLoading: false
                    })
                })
            }
    

    render() {
        console.log(this.state.password)
        const { firstNameReady, lastNameReady, emailReady, passwordReady, usernameReady } = this.state;
        let registerBtn = <div/>
        if (firstNameReady === true && lastNameReady === true && emailReady === true && passwordReady === true && usernameReady === true) {
            registerBtn = <button className="create-account-btn" onClick={this.handleButtonRegister}> Create New Account </button>
        }
        else {
            registerBtn = <button className="create-account-btn not-enough-info-btn"> Fill out all fields </button>
        }

        return (
            <div className="register-container">
                {/* <div className="reg-header v2"> </div> */}
                <div className="option-container">
                    <div className="option-container-inner">
                        {/* <div className="placeholder-div v2">  </div> */}
                        {/* <div className="option-divider" v2> </div> */}
                        <div className="create-account-outter">
                            <div className="create-account-inner">
                                <div className="create-account-tag"> Create an Account </div>
                                <div className="reg-field">
                                    <label className="input-tag"> Name </label>
                                    <div className="reg-combined-wrapper">
                                        <RegFirstname handleChangeInput={this.handleChangeInput} toggleReadySwitch={this.toggleReadySwitch}/>
                                        <RegLastname handleChangeInput={this.handleChangeInput} toggleReadySwitch={this.toggleReadySwitch}/>
                                    </div>
                                </div>
                                <RegEmail emailErrorText={this.state.emailErrorText} emailReady={this.state.emailReady} handleChangeInput={this.handleChangeInput} toggleReadySwitch={this.toggleReadySwitch}/>
                                <RegPassword passwordErrorText={this.state.passwordErrorText} handleChangeInput={this.handleChangeInput} toggleReadySwitch={this.toggleReadySwitch}/>
                                {/* <RegUsername handleChangeInput={this.handleChangeInput} toggleReadySwitch={this.toggleReadySwitch}/> */}
                                <div className="reg-btn-footer">
                                    {/* {registerBtn} */}
                                    <CreateAccountButton
                                        onClickAction={this.handleButtonRegister}
                                        label={this.state.createAccountBtnLabel}
                                        loading={this.state.createAccountBtnLoading}
                                        errorText=''
                                        disabled={this.state.createAccountBtnDisabled}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
	return state
}

export default withRouter(connect(mapStateToProps, {updateAuth, updateUser})(Register));
