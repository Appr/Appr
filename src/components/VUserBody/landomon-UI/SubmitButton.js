import React, { Component } from 'react';
import './landomon.scss';
import classnames from "classnames";

class SubmitButton extends Component {
    constructor(props){
        super(props)
        this.state ={
            disabled: true,
            loading: false
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.disabled === false){
            this.setState({
                disabled: false
            })
        }
        else if(nextProps.loading === true){
            console.log('loading')
        }
        else if(nextProps.disabled === true){
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
            <button className={submitBtnClass} style={this.props.buttonStyle} onClick={(e) => handleAction()}>
                {this.props.label}
            </button>



        )
    }
}

export default SubmitButton;