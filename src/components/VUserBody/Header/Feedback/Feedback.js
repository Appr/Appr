import React, { Component } from 'react';
import '../../InfoBody/AccountSettings/modals/modals.scss';
import ModalTextField from '../../landomon-UI/ModalTextField';
import SubmitButton from '../../landomon-UI/SubmitButton';
import { connect } from 'react-redux';
import { reportBug } from '../../../../services/nodemailer.services';


class Feedback extends Component {
    constructor(props){
        super(props);
        this.state ={
            problem: '',
            description: '',
            formSent: false,
            hideButtonSuccess: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeProblem = this.handleChangeProblem.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
    }



    handleSubmit(){

        let reqBody = {
            name: `${this.props.userInfo.first_name} ${this.props.userInfo.last_name}`,
            problem: this.state.problem,
            description: this.state.description,
            location: `${window.location.href}`
        }

        reportBug(reqBody)
            .then(res => {
                console.log(res.data)
                    this.setState({formSent: true})
                    this.props.onCloseBtnClick();
            })
        // console.log(this.state.formSent);
        // fetch('/api/mail/reportbug', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },

        //     body: JSON.stringify({
        //         name: `${this.props.userInfo.first_name} ${this.props.userInfo.last_name}`,
        //         problem: this.state.problem,
        //         description: this.state.description,
        //         location: `${window.location.href}`
        //     })
        // })
        // .then((response) => response.json())
        // .then((responseJson) => {
        //     if (responseJson.success){
        //         this.setState({formSent: true})
        //         this.props.onCloseBtnClick();
        //     }
        //     else{
        //          this.setState({formSent: false})
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }


    handleChangeProblem(e) {
        let newProblem = e;
        let description = this.state.description;
        this.setState({
            problem: newProblem
        })
        if(newProblem === '' || description === ''){
            this.setState({hideButtonSuccess: true})
        }
        else{
            this.setState({hideButtonSuccess: false})
        } 
    }

    handleChangeDescription(e) {
        let newDescription = e;
        let problem = this.state.problem;

        this.setState({
            description: newDescription
        })

        if(problem === '' || newDescription === ''){
            this.setState({hideButtonSuccess: true})
        }
        else{
            this.setState({hideButtonSuccess: false})
        } 
    }

  render() {

    console.log(this.state)

    return (
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
                <div className="modal-header">
                    <h2 className="modal-title">REPORT BUG</h2>
                    <span className="closeBtn" onClick={this.props.onCloseBtnClick}>&times;</span>
                </div>

                    <div className="modal-body">
                        <section className="modal-row">
                            <ModalTextField 
                                label="problem"
                                onChangeAction={(e) => this.handleChangeProblem(e.target.value)}
                            />
                        </section>
                        <label className="modal-input-tag">Description</label>
                        <section className="modal-row">
                            <textarea id="description" name="description" className="modal-form" style={{minHeight: "70px", "resize": "none"}} onChange={(e) => {this.handleChangeDescription(e.target.value)}}/>
                        </section>

                    </div>
                    <div className="submitModal">
                        <button className="cancel-btn" onClick={this.props.onCloseBtnClick}> Cancel </button>
                        <SubmitButton 
                            onClickAction={(e) => {this.handleSubmit()}}
                            label='Send'
                            disabled={this.state.hideButtonSuccess}
                        />
                    </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps) (Feedback);
