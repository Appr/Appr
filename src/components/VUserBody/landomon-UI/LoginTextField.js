import React, { Component } from 'react';
import './landomon.scss';
import classnames from "classnames";

class LoginTextField extends Component {
    constructor(props){
        super(props)
        this.state ={
            showSuccess: false,
            showFail: false,
            showForceFail: false,
        }
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleFailed = this.handleFailed.bind(this);
        this.handleForceFailed = this.handleForceFailed.bind(this);
        this.handleDefaultStyle = this.handleDefaultStyle.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errorText){
             this.handleFailed();
        }
        else if(nextProps.forceFail === true){
            this.handleForceFailed()
        }
        else if(nextProps.forceFail === false){
            this.handleDefaultStyle();
        }
        else{
            this.handleDefaultStyle();
        }
    }

    handleSuccess(){
        this.setState({
            showFail: false,
            showSuccess: true
        })
    }

    handleDefaultStyle(){
        this.setState({
            showFail: false,
            showSuccess: false,
            showForceFail: false
        })
    }

    handleFailed(){
        this.setState({
            showFail: true,
            showSuccess: false
        })
    }

    handleForceFailed(){
        this.setState({
            showFail: false,
            showSuccess: false,
            showForceFail: true
        })
    }


    render(){
        let {label, loading, errorText, onChangeAction} = this.props;

        let failTextFieldClass = classnames({
            "loginTextField": true,
            "loginTextField--fail": this.state.showFail
        });

        let successTextFieldClass = classnames({
            "loginTextField": true,
            "loginTextField--success": this.state.showSuccess
        });

        let forcedFailTextFieldClass = classnames({
            "loginTextField": true,
            "loginTextField--forceFail": this.state.showForceFail
        });

        return(
            <div className={`${failTextFieldClass} ${successTextFieldClass} ${forcedFailTextFieldClass}`} >
                <input className="modalTextFieldInput"
                    name={label}  
                    type={this.props.type} 
                    onChange={(e) => onChangeAction(e)}
                    placeholder={this.props.placeholder} 
                    maxLength={this.props.maxLength}
                />
                <div className="validation-info" style={this.props.validationStyle}>
                    <p className="error-text" style={this.props.errorTextStyle}> {this.props.errorText} </p>
                </div>
            </div>
        )
    }
}

export default LoginTextField;