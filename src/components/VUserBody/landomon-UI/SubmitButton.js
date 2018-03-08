import React, { Component } from 'react';
import './landomon.scss';
import classnames from "classnames";

class SubmitButton extends Component {
    constructor(props){
        super(props)
        this.state ={
            disabled: true
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.disabled === false){
            this.setState({
                disabled: false
            })
        }
        else{
            this.setState({
                disabled: true
            })
        }
    }

    render(){
        let {label, disabled, onClickAction} = this.props;
        let submitBtnClass = classnames({
            "submit-btn": true,
            "submit-btn-disabled": this.state.disabled,
        })
        function handleAction(){
            if (disabled === false){
                onClickAction();
            }
            else(
                console.log('party')
            )
        }
        return(
            <button className={submitBtnClass} onClick={(e) => handleAction()}>
                {this.props.label}
            </button>



        )
    }
}

export default SubmitButton;