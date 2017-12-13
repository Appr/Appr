import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './register.scss';
import classnames from "classnames";
import { register, login } from '../../../services/auth.services';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            username: '',
            showFirstNameFail: false,
            showFirstNameSuccess: false,
            showLastNameFail: false,
            showLastNameSuccess: false,
            showEmailFail: false,
            showEmailSuccess: false,
            showPasswordFail: false,
            showPasswordSuccess: false,
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleFailedFirstName = this.handleFailedFirstName.bind(this);
        this.handleSuccessFirstName = this.handleSuccessFirstName.bind(this);
        this.handleFailedLastName = this.handleFailedLastName.bind(this);
        this.handleSuccessLastName = this.handleSuccessLastName.bind(this);
        this.handleFailedEmail = this.handleFailedEmail.bind(this);
        this.handleSuccessEmail = this.handleSuccessEmail.bind(this);
        this.handleFailedPassword = this.handleFailedPassword.bind(this);
        this.handleSuccessPassword = this.handleSuccessPassword.bind(this);
        this.handleButtonRegister = this.handleButtonRegister.bind(this);
    }

    handleChangeInput(e) {
        const key = e.target.name;
        const value = e.target.value;
        let newState = this.state[key];
        newState = value;
        this.setState({ [key]: newState });
    }

    handleFailedFirstName() {
        this.setState({
            showFirstNameSuccess: false,
            showFirstNameFail: true
        });
    }

    handleSuccessFirstName() {
        this.setState({
            showFirstNameFail: false,
            showFirstNameSuccess: true
        });
    }

    handleFailedLastName() {
        this.setState({
            showLastNameSuccess: false,
            showLastNameFail: true
        });
    }

    handleSuccessLastName() {
        this.setState({
            showLastNameFail: false,
            showLastNameSuccess: true
        });
    }

    handleFailedEmail() {
        this.setState({
            showEmailSuccess: false,
            showEmailFail: true
        });
    }

    handleSuccessEmail() {
        this.setState({
            showEmailFail: false,
            showEmailSuccess: true
        });
    }

    handleFailedPassword() {
        this.setState({
            showPasswordSuccess: false,
            showPasswordFail: true
        });
    }

    handleSuccessPassword() {
        this.setState({
            showPasswordFail: false,
            showPasswordSuccess: true
        });
    }

    handleButtonRegister() {
        const { firstName, lastName, email, password, username } = this.state;
        const reqBody = { firstName, lastName, email, password, username };
        const creds = { username: email, password };
        register(reqBody)
            .then( res => {
                if (res.data.message === 'Registration was successful!') {
                    login(creds)
                        .then( res => {
                            if (res.status === 200) {
                                this.props.history.push(`/user/${res.data.id}/dashboard`)
                            }
                            else {
                                alert(res.data);
                            }
                        })
                        .catch(err => {throw err});
                }
                else {
                    alert(res.data.message);
                }
            })
            .catch(err => {throw err});
    }

    render() {
        let failFirstNameClass = classnames({
            "reg-firstName": true,
            "reg-firstName--fail": this.state.showFirstNameFail
        });

        let successFirstNameClass = classnames({
            "reg-lastName": true,
            "reg-lastName--success": this.state.showFirstNameSuccess
        });

        let failLastNameClass = classnames({
            "reg-lastName": true,
            "reg-lastName--fail": this.state.showLastNameFail
        });

        let successLastNameClass = classnames({
            "reg-lastName": true,
            "reg-lastName--success": this.state.showLastNameSuccess
        });

        let failEmailClass = classnames({
            "reg-field": true,
            "reg-field--fail": this.state.showEmailFail
        });

        let successEmailClass = classnames({
            "reg-field-fail": true,
            "reg-field--success": this.state.showEmailSuccess
        });

        let failPasswordClass = classnames({
            "reg-field": true,
            "reg-field--fail": this.state.showPasswordFail
        });

        let successPasswordClass = classnames({
            "reg-field": true,
            "reg-field--success": this.state.showPasswordSuccess
        });

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
                                        <div className={`${failFirstNameClass} ${successFirstNameClass}`}>
                                            <input type="text" name="firstName" placeholder="First" onChange={e => this.handleChangeInput(e)}/>
                                            <div className="reg-info">
                                                <p className="invalid-text">Please type in your first name</p>
                                            </div>
                                        </div>
                                        <div className={`${failLastNameClass} ${successLastNameClass}`}>
                                            <input type="text" name="lastName" placeholder="Last" onChange={e => this.handleChangeInput(e)}/>
                                            <div className="reg-info">
                                                <p className="invalid-text"> Please type in your last name </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${failEmailClass} ${successEmailClass}`}>
                                    <label className="input-tag"> Email </label>
                                    <input className="input-solo" type="text" name="email" placeholder="e.g. kyloren@firstorder.org" onChange={e => this.handleChangeInput(e)} onInvalid={this.handleFailedEmail} required/>
                                    <div className="reg-info">
                                        <p className="invalid-text"> This email is invalid </p>
                                        <p className="valid-text"> This email is valid </p>
                                    </div>
                                </div>
                                <div className={`${successPasswordClass} ${failPasswordClass}`}>
                                    <label className="input-tag"> Password </label>
                                    <input className="input-solo" type="password" name="password" placeholder="e.g. ih8ud@ddy" onChange={e => this.handleChangeInput(e)}/>
                                    <div className="reg-info">
                                        <p className="invalid-text"> Try again </p>
                                        <p className="valid-text"> Ready to go! </p>
                                    </div>
                                </div>
                                


                                <div className="username-wrapper">
                                    <label className="input-tag"> Create a Username </label>
                                    <input className="input-solo" type="text" name="username" placeholder="e.g. radar_tech_matt548" onChange={e => this.handleChangeInput(e)}/>
                                    <div className="reg-info">
                                        <p className="invalid-text"> Taken! </p>
                                        <p className="valid-text"> Available! </p>
                                    </div>
                                </div>



                                <div className="reg-btn-footer">
                                    <button className="create-account-btn not-enough-info-btn" onClick={this.handleButtonRegister}> Create New Account </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <section>
                        <button className="pass" onClick={this.handleSuccessLastName}>Pass LastName</button>
                        <button className="fail" onClick={this.handleFailedLastName}>Fail Lastname</button>
                    </section>

                    <section>
                        <button className="pass" onClick={this.handleSuccessFirstName}>Pass FirstName</button>
                        <button className="fail" onClick={this.handleFailedFirstName}>Fail FirstName</button>
                    </section>
                    

                    <section>
                        <button className="pass" onClick={this.handleSuccessEmail}>Pass Email</button>
                        <button className="fail" onClick={this.handleFailedEmail}>Fail Email</button>
                    </section>

                    <section>
                        <button className="pass" onClick={this.handleSuccessPassword}>Pass Password</button>
                        <button className="fail" onClick={this.handleFailedPassword}>Fail Password</button>
                    </section> */}
                </div>
            </div>
        );
    }
}

export default Register;
