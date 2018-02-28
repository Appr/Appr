import React, { Component } from 'react';
import PasswordIcon from '../../../img/icons/Key-Icon.svg';
import UsernameIcon from '../../../img/icons/Username-Icon.svg';
import { Link } from 'react-router-dom';
import './login.scss';
import { loginTest, login } from '../../../services/auth.services';
import { request } from 'https';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
	}

	handleInputChange(e) {
		const field = e.target.name;
		this.setState({ [field]: e.target.value });
	}

	handleSubmitLogin() {
		const { username, password } = this.state;
		const creds = { username, password };
		if (!username.includes('@') || username[username.length - 4] !== '.'){
			alert('Make sure you entered your email correctly!');
		}
		else {
			if (password.length === 0) {
				alert('Type in your password.');
			}
			else {
				loginTest(creds)
					.then( res => {
						if (res.data === 'login test was successful!') {
							login(creds)
								.then( res => {
									if (res.status === 200) {
										this.props.history.push(`/user/${res.data.id}/dashboard`);
									}
								})
								.catch(err => {throw err});
						}
						else {
							alert(res.data);
						}
					})
					.catch(err => {throw err});
			}
		}
	}

	render() {
		return (
			<div className="login-parent">
				<div className="login-container">
					<div className="login-top">
						<div className="logo-container">
							<div className="logo-login"> Appr </div>
						</div>
					</div>
					<div className="login-middle">
						<div className="usr-pswd-container">
							<div className="usr-pswd-row">
								<div className="lgn-icon-con">
									<div className="lgn-icon"> 
										<img src={UsernameIcon} alt="username icon"/> 
									</div>
								</div>
								<input className="usr-pswd-input" type="text"  name="username" placeholder="vader@empire.org" onChange={e => this.handleInputChange(e)}/>
							</div>
							<div className="usr-pswd-row">
								<div className="lgn-icon-con">
									<div className="lgn-icon">
										<img src={PasswordIcon} alt="password icon"/> 
									</div>
								</div>
								<input className="usr-pswd-input" type="password"  name="password" placeholder="deathstar4eva" onChange={e => this.handleInputChange(e)}/>
							</div>

							<div className="login-btn-con">
								<button className="login-btn" onClick={this.handleSubmitLogin}> LOGIN </button>
							</div>
						</div>
					</div>
					<div className="login-bottom"/>
				</div>
			</div>
		);
	}
}

export default Login;
