import React, { Component } from 'react';
import PasswordIcon from '../../../img/icons/Key-Icon.svg';
import UsernameIcon from '../../../img/icons/Username-Icon.svg';
import { Link } from 'react-router-dom';
import './login.scss';
import { loginTest, login } from '../../../services/auth.services';
import { request } from 'https';
import { updateAuth, updateUser, updatePersonalProjects } from '../../../actions/actionCreators';
import { findUserInfo } from '../../../services/account.services';
import {  findPersonalProjects } from '../../../services/dashboard.services';

import { connect } from 'react-redux'
import history from '../../../history';
import { withRouter } from 'react-router-dom';
import LoginButton from '../../VUserBody/landomon-UI/LoginButton';
import LoginTextField from '../../VUserBody/landomon-UI/LoginTextField';


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			UI:{
				loginLabel: 'Login',
				loginLoading: false,
				errorText: '',
				forceFailUserName: false
			}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
	}

	handleInputChange(e) {
		const field = e.target.name;
		this.setState({ [field]: e.target.value });
		this.setState({
			UI:{
				usernameErrorText: '',
				forceFailUserName: false,
				errorText: '',
				loginLabel: 'Login',
				loginLoading: false,
			}
		})
	}



	handleSubmitLogin() {
		const { username, password } = this.state;
		let creds = { username, password };

		if (!username.includes('@') || username[username.length - 4] !== '.'){
			this.setState({
				UI: {
					errorText: this.state.UI.errorText,
					usernameErrorText: 'Make sure you entered your email correctly!',
					loginLabel: 'Login',
					loginLoading: false,
					forceFailUserName: false
				}
			})
		}
		else {
			if (password.length === 0) {
				this.setState({
					UI: {
						errorText: 'Type in your password!',
						usernameErrorText: this.state.UI.usernameErrorText,
						loginLabel: 'Login',
						loginLoading: false,
						forceFailUserName: false
					}
				})
			}
			else {
				this.setState({
					UI:{
						loginLabel: 'Loading',
						loginLoading: true
					}
				})
				loginTest(creds)
					.then( res => {
						console.log(res.data)
						if(res.data['loginError']){
							let newErrorText = res.data['loginError'];
							this.setState({
								UI:{
									forceFailUserName: true,
									errorText: newErrorText,
									loginLoading: false,
									loginLabel: 'Login',
									usernameErrorText: '',

								}
							})
							
						}
						 else if (res.status === 200) {
							 const logInBody = {
								 username: this.state.username,
								 password: res.data
							 }
							login(logInBody)
								.then( res => {
										this.props.updateAuth(true);

										if(res.status === 200){
												findUserInfo(res.data.id)
												.then( res => {
													if (res.status !== 200) {
													alert('failed')
														this.revertLoginButton();
													}
													else if (res.status === 200){
														let userInfo = {   
															id: res.data[0].id,
															username: res.data[0].username,
															avatar: res.data[0].avatar,
															first_name: res.data[0].first_name,
															last_name: res.data[0].last_name,
															email: res.data[0].email
															}
															this.props.updateUser(userInfo)
											
															findPersonalProjects(userInfo.id)
																.then( res => {
																	this.props.updatePersonalProjects(res.data);
																		history.push(`/user/${userInfo.id}/dashboard`);
																})
																
													}
												})
												.catch(err => {throw err})
											}
									}
								)
								.catch(err => {throw err})
						}
					})
					.catch(err => {
						this.props.updateAuth(false)
						throw err
					});
			}
		}
	}

	render() {
		console.log(this.state)
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
							{/* <div className="usr-pswd-row"> */}
								{/* <div className="lgn-icon-con">
									<div className="lgn-icon"> 
										<img src={UsernameIcon} alt="username icon"/> 
									</div>
								</div> */}
								<LoginTextField
									onChangeAction={this.handleInputChange}
									label='username'
									type="text"
									errorText={this.state.UI.usernameErrorText}
									forceFail={this.state.UI.forceFailUserName}
									placeholder="Username"
								/>
								<LoginTextField
									onChangeAction={this.handleInputChange}
									label='password'
									type='password'
									errorText={this.state.UI.errorText}
									placeholder="Password"
								/>
								{/* <input className="usr-pswd-input" type="text"  name="username" placeholder="vader@empire.org" onChange={e => this.handleInputChange(e)}/> */}
							{/* </div> */}
							{/* <div className="usr-pswd-row">
								<div className="lgn-icon-con" style={{backgroundColor: 'transparent'}}>
									<div className="lgn-icon">
										<img src={PasswordIcon} alt="password icon"/> 
									</div>
								</div>
								<input className="usr-pswd-input" type="password"  name="password" placeholder="iamthebest" onChange={e => this.handleInputChange(e)}/>
							</div> */}

							<div className="login-btn-con">
								<LoginButton
									onClickAction={this.handleSubmitLogin}
									label={this.state.UI.loginLabel}
									loading={this.state.UI.loginLoading}
								/>
							</div>
						</div>
					</div>
					<div className="login-bottom"/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return state
}

export default withRouter(connect(mapStateToProps, {updateAuth, updateUser, updatePersonalProjects})(Login));
