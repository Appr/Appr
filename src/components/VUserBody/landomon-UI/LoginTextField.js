import React, { Component } from 'react';
import './landomon.scss';
import classnames from "classnames";

class LoginTextField extends Component {
    constructor(props){
        super(props)
        this.state ={
            showSuccess: false,
            showFail: false,
        }
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleFailed = this.handleFailed.bind(this);
        this.handleDefaultStyle = this.handleDefaultStyle.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errorText){
            return this.handleFailed();
        }
        else if(nextProps.forceFail === true){
            return this.handleFailed()
        }
        else{
            return this.handleDefaultStyle();
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
            showSuccess: false
        })
    }

    handleFailed(){
        this.setState({
            showFail: true,
            showSuccess: false
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

        return(
            <div className={`${failTextFieldClass} ${successTextFieldClass}`} >
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