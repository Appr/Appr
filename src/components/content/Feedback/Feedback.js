import React, { Component } from 'react';
import '../AccountSettings/modals/modals.scss';


class Feedback extends Component {
    constructor(props){
        super();
        this.state ={
            problem: '',
            description: '',
            location: '',
            formSent: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        console.log(this.state.formSent);
        e.preventDefault()
        fetch('reportbug', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({
                problem: this.state.problem,
                description: this.state.description,
                location: this.state.location
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.success){
                this.setState({formSent: true})
            }
            else this.setState({formSent: false})
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount(){
        this.setState({
            location: `${window.location.href}`
        })
    }
  render() {
      console.log(this.state)
    return (
        <div className="modalStyle-inner">
        <div className="modal-account-settings-content">
            <div className="modal-header">
                <div className="modal-header-placeholder"></div>
                <h2 className="modal-title">Report Bug</h2>
                <span className="closeBtn" onClick={this.props.onCloseBtnClick}>&times;</span>
            </div>
            <form onSubmit={this.handleSubmit}>
            
            <div className="modal-body">
                <label className="modal-input-tag">Problem</label>
                <section className="modal-row">
                    <input type="text" name="problem" id="problem" className="modal-form" value={this.state.problem} required autoFocus onChange={(e) => {this.setState({ problem: `${e.target.value}`})}} />
                </section>
                <label className="modal-input-tag">Description</label>
                <section className="modal-row">
                    <textarea id="description" name="description" className="modal-form" value={this.state.description} style={{minHeight: "70px", "resize": "none"}} onChange={(e) => {this.setState({ description: `${e.target.value}` })}} required/>
                </section>
                <input type="text" name="location" id="location" value={this.state.location} style={{"display": "none"}} />
                    
            </div>
            <div className="submitModal">
                <button type="submit">
                Send
                </button>
            </div>
            </form>
        </div>
    </div>
    );
  }
}

export default Feedback;
