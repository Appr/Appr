import React, { Component } from 'react';
import classnames from 'classnames';
// import { findUsername } from '../../../../services/account.services';

class RegUsername extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUsernameFail: false,
            showUsernameSuccess: false
        }
        this.handleFailedUsername = this.handleFailedUsername.bind(this);
        this.handleSuccessUsername = this.handleSuccessUsername.bind(this);
        this.handleConstraint = this.handleConstraint.bind(this);
    }

    handleFailedUsername() {
        this.props.toggleReadySwitch('username', false);
        this.setState({
            showUsernameFail: true,
            showUsernameSuccess: false
        });
    }

    handleSuccessUsername() {
        this.props.toggleReadySwitch('username', true);
        this.setState({
            showUsernameFail: false,
            showUsernameSuccess: true
        });
    }

    // handleConstraint(e) {
    //     const username = e.target.value;
        // if (username.length > 0) {
        //     this.handleSuccessUsername();
        //     const reqBody = { username };
        //     findUsername(reqBody)
        //         .then( res => {
        //             res.status !== 200 ? console.log(res) : this.handleFailedUsername();
        //         })
        //         .catch(err => {throw err});
        // }
        // else {
        //     this.setState({
        //         showUsernameFail: false,
        //         showUsernameSuccess: false
        //     });
        // }
    // }

    render() {
        const { handleChangeInput } = this.props;
        let failUsernameClass = classnames({
            "reg-field": true,
            "reg-field--fail": this.state.showUsernameFail
        });
        let successUsernameClass = classnames({
            "reg-field": true,
            "reg-field--success": this.state.showUsernameSuccess
        });

        return (
            <div className={`${successUsernameClass} ${failUsernameClass}`}>
                <label className="input-tag"> Create a Username </label>
                <input className="input-solo" type="text" name="username" placeholder="e.g. radar_tech_matt548" onChange={e => { handleChangeInput(e)}}/>
                <div className="reg-info">
                    <p className="invalid-text"> Taken! </p>
                    <p className="valid-text"> Available! </p>
                </div>
            </div>
        );
    }
}

export default RegUsername;
