import React, { Component } from 'react';
import './landomon.scss';
import classnames from "classnames";

class ModalTextField extends Component {
    constructor(props){
        super(props)
        this.state ={
            showSuccess: false,
            showFail: false,
            showForceFail: false
        }
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleFailed = this.handleFailed.bind(this);
        this.handleDefaultStyle = this.handleDefaultStyle.bind(this);
        this.handleForceFailed = this.handleForceFailed.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errorText){
             this.handleFailed();
        }
        else if(nextProps.forceFail === true){
            this.handleForceFailed()
        }
        else{
            this.handleDefaultStyle();
            if(nextProps.showSuccess === false){
                this.handleSuccess();
            }
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
            "modalTextField": true,
            "modalTextField--fail": this.state.showFail
        });

        let successTextFieldClass = classnames({
            "modalTextField": true,
            "modalTextField--success": this.state.showSuccess
        });


        let forcedFailTextFieldClass = classnames({
            "modalTextField": true,
            "modalTextField--forceFail": this.state.showForceFail
        });

        return(
            <div className={`${failTextFieldClass} ${successTextFieldClass} ${forcedFailTextFieldClass}`} >
                <label className="modalTextFieldLabel"> {label} </label>
                <input className="modalTextFieldInput"
                    defaultValue={this.props.defaultValue}
                    autoFocus
                    name={label}  
                    type={this.props.type} 
                    onChange={onChangeAction}
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

export default ModalTextField;