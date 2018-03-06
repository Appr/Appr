import React, { Component } from 'react';
import classnames from 'classnames';

class RegEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEmailFail: false,
            showEmailSuccess: false,
        }
        this.handleFailedEmail = this.handleFailedEmail.bind(this);
        this.handleSuccessEmail = this.handleSuccessEmail.bind(this);
        this.handleConstraint = this.handleConstraint.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.emailErrorText !== ''){
            this.setState({
                showEmailFail: true,
                showEmailSuccess: false
            })
        }
    }

    handleFailedEmail() {
        this.setState({
            showEmailFail: true,
            showEmailSuccess: false
        });
    }

    handleSuccessEmail() {
        this.setState({
            showEmailFail: false,
            showEmailSuccess: true
        });
    }

    handleConstraint(e) {
        const email = e.target.value;
        if (email.length > 0) {
            !email.includes('@') || email[email.length - 4] !== '.' || this.props.emailErrorText.length > 0 ? this.handleFailedEmail() : this.handleSuccessEmail();
        }
        else {
            this.setState({
                showEmailFail: false,
                showEmailSuccess: false
            });
        }
    }

    render() {
        const { handleChangeInput, emailReady } = this.props;
        


        let failEmailClass = classnames({
            "reg-field": true,
            "reg-field--fail": this.state.showEmailFail
        });
        let successEmailClass = classnames({
            "reg-field-fail": true,
            "reg-field--success": this.state.showEmailSuccess
        });

        return (
            <div className={`${failEmailClass} ${successEmailClass}`}>
                <label className="input-tag"> Email </label>
                <input className="input-solo" type="text" name="email" placeholder="e.g. kyloren@firstorder.org" onChange={e => { handleChangeInput(e), this.handleConstraint(e) }}/>
                <div className="reg-info">
                    <p className="invalid-text"> {this.props.emailErrorText} </p>
                    <p className="valid-text"> This email is valid </p>
                </div>
            </div>
        );
    }
}

export default RegEmail;
