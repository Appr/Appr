import React, { Component } from 'react';
import './landomon.scss';
import classnames from "classnames";

class LoginButton extends Component {
    constructor(props){
        super(props)
        this.state ={
            loading: false
        }
    }

    

    componentWillReceiveProps(nextProps){
        if (nextProps.loading === true){
            this.setState({
                loading: true
            })
        }
    }
    render(){
        let {label, loading, errorText, onClickAction} = this.props;
        let loginBtnClass = classnames({
            "login-btn": true,
            "login-btn-loading": this.state.loading,
        })
        function handleAction(){
            if (loading === false){
                onClickAction();
            }
            else(
                console.log('party')
            )
        }
        return(
            <button className={loginBtnClass} onClick={(e) => handleAction()}>{this.props.label}</button>



        )
    }
}

export default LoginButton;