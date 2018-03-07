import React, { Component } from 'react';

class CreateAccountButton extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let {label, loading, errorText, onClickAction} = this.props;
        return(
            <button onClick={(e) => onClickAction()}>{this.props.label}</button>
        )
    }
}

export default CreateAccountButton;