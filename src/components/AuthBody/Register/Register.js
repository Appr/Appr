import React, { Component } from 'react';
import './register.scss';
import { register, login } from '../../../services/auth.services';
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


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            username: '',
            firstNameReady: false,
            lastNameReady: false,
            emailReady: false,
            passwordReady: false,
            usernameReady: false,
            registerCheck: false
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
        
        const { firstName, lastName, email, password, username } = this.state;
        const reqBody = { firstName, lastName, email, password, username };
        const creds = { username: email, password };

        register(reqBody)
            .then( res => {
                if(res.status !== 200){
                    alert('shit')
                }
                else{
                    this.props.updateAuth(true);
                    login(creds)
                    .then( res => {
                        if(res.status !== 200){
                            alert('failed')
                        }
                        if(res.status === 200){
                            console.log(res.data)
                            findUserInfo(res.data.id)
                                .then( res => {
                                    if(res.status === 200){
                                        let userInfo = {   
                                            id: res.data[0].id,
                                            username: res.data[0].username,
                                            avatar: res.data[0].avatar,
                                            first_name: res.data[0].first_name,
                                            last_name: res.data[0].last_name,
                                            email: res.data[0].email
                                        }
                                        this.props.updateUser(userInfo);
                                        history.push(`/user/${userInfo.id}/dashboard`);
                                    }
                                    }
                                )
                                .catch(err => {throw err})
                        }
                    })
                    .catch(err => {throw err})
                }
            })
            .catch(err => {throw err})
    }

    render() {
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
                                <RegEmail handleChangeInput={this.handleChangeInput} toggleReadySwitch={this.toggleReadySwitch}/>
                                <RegPassword handleChangeInput={this.handleChangeInput} toggleReadySwitch={this.toggleReadySwitch}/>
                                <RegUsername handleChangeInput={this.handleChangeInput} toggleReadySwitch={this.toggleReadySwitch}/>
                                <div className="reg-btn-footer">
                                    {registerBtn}
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
