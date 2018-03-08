import React, { Component } from 'react';
import classnames from 'classnames';

class RegFirstname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFirstNameFail: false,
            showFirstNameSuccess: false
        }
        this.handleFailedFirstName = this.handleFailedFirstName.bind(this);
        this.handleSuccessFirstName = this.handleSuccessFirstName.bind(this);
        this.handleConstraint = this.handleConstraint.bind(this);
    }

    handleFailedFirstName() {
        this.props.toggleReadySwitch('firstName', false);
        this.setState({
            showFirstNameFail: true,
            showFirstNameSuccess: false
        });
    }

    handleSuccessFirstName() {
        this.props.toggleReadySwitch('firstName', true);
        this.setState({
            showFirstNameFail: false,
            showFirstNameSuccess: true
        });
    }

    handleConstraint(e) {
        e.target.value.length === 0 ? this.handleFailedFirstName() : this.handleSuccessFirstName();
    }

    render() {
        const { handleChangeInput } = this.props;
        let failFirstNameClass = classnames({
            "reg-firstName": true,
            "reg-firstName--fail": this.state.showFirstNameFail
        });
        let successFirstNameClass = classnames({
            "reg-lastName": true,
            "reg-lastName--success": this.state.showFirstNameSuccess
        });

        return (
            <div className={`${failFirstNameClass} ${successFirstNameClass}`}>
                <input type="text" name="firstName" placeholder="First" onChange={e => { handleChangeInput(e) && this.handleConstraint(e) }}/>
                <div className="reg-info">
                    <p className="invalid-text"> Please type in your first name </p>
                </div>
            </div>
        );
    }
}

export default RegFirstname;
