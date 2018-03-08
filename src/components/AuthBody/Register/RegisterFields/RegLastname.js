import React, { Component } from 'react';
import classnames from 'classnames';

class RegLastname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLastNameFail: false,
            showLastNameSuccess: false
        }
        this.handleFailedLastName = this.handleFailedLastName.bind(this);
        this.handleSuccessLastName = this.handleSuccessLastName.bind(this);
        this.handleConstraint = this.handleConstraint.bind(this);
    }

    handleFailedLastName() {
        this.props.toggleReadySwitch('lastName', false);
        this.setState({
            showLastNameFail: true,
            showLastNameSuccess: false
        });
    }

    handleSuccessLastName() {
        this.props.toggleReadySwitch('lastName', true);
        this.setState({
            showLastNameFail: false,
            showLastNameSuccess: true
        });
    }

    handleConstraint(e) {
        e.target.value.length === 0 ? this.handleFailedLastName() : this.handleSuccessLastName();
    }

    render() {
        const { handleChangeInput } = this.props;
        let failLastNameClass = classnames({
            "reg-lastName": true,
            "reg-lastName--fail": this.state.showLastNameFail
        });

        let successLastNameClass = classnames({
            "reg-lastName": true,
            "reg-lastName--success": this.state.showLastNameSuccess
        });

        return (
            <div className={`${failLastNameClass} ${successLastNameClass}`}>
                <input type="text" name="lastName" placeholder="Last" onChange={e => { handleChangeInput(e) && this.handleConstraint(e) }}/>
                <div className="reg-info">
                    <p className="invalid-text"> Please type in your last name </p>
                </div>
            </div>
        );
    }
}

export default RegLastname;
