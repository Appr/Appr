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
        if(nextProps.loading === true){
            this.setState({
                loading: true,
                disabled: false
            })
        }
        else if (nextProps.disabled === false){
            this.setState({
                disabled: false
            })
        }
        else if(nextProps.disabled === true){
            this.setState({
                disabled: true,
                loading: false
            })
        }
    }

    render(){
        console.log(this.state)
        let {label, onClickAction, disabled, loading} = this.props;
        let submitBtnClass = classnames({
            "submit-btn": true,
            "submit-btn-disabled": this.state.disabled,
        })

        let loadingBtnClass = classnames({
            "submit-btn": true,
            "submit-btn-loading": this.state.loading,
        })
        function handleAction(){
            if (disabled === false && loading === false){
                onClickAction();
            }
            else(
                console.log('party')
            )
        }
        return(
            <button className={`${submitBtnClass} ${loadingBtnClass} `} style={this.props.buttonStyle} onClick={(e) => handleAction()}>
                {this.props.label}
            </button>



        )
    }
}

export default SubmitButton;