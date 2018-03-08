import React, { Component } from 'react';
import '../components/VUserBody/InfoBody/AccountSettings/modals/modals.scss';
import { connect } from 'react-redux';
import ModalTextField from '../components/VUserBody/landomon-UI/ModalTextField';
class ModalTest extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            errorText: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.enableError1 = this.enableError1.bind(this);
        this.disableError1 = this.disableError1.bind(this);
    }

    enableError1(){
        this.setState({
            errorText: 'party'
        })
        console.log(this.state)
    }

    disableError1(){
        this.setState({
            errorText: ''
        })
    }

    handleEmailChange(e){
        let newEmail = e.toLowerCase();
        this.setState({
            email: newEmail
          })
      }

    render() {
        console.log(this.state)

      return (
        <div>
            <button onClick={e => {this.enableError1()}}>Error1 on</button>
            <button onClick={e => {this.disableError1()}}>Error1 off</button>
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
                <div className="modal-header">
                    <h2 className="modal-title">CHANGE EMAIL</h2>
                    <span className="closeBtn">&times;</span>
                </div>
                {/* <form> */}
                <div className="modal-body">
                    <section className="modal-row">
                    <ModalTextField
                        label="test"
                        errorText={this.state.errorText}
                        type="text"
                        onChangeAction={(e) => this.handleEmailChange(e.target.value)}
                        placeholder='Cmon bro'
                    />

                    <ModalTextField
                        label="Dank Input"
                        errorText="dannnk"
                        type="text"
                        onChangeAction={console.log('Navi: "Hey, Listen"!!!')}
                        placeholder='BROO'
                    />
    
                    </section>
                </div>
                <div className="submitModal">
                </div>
                {/* </form> */}
            </div>
        </div>
        </div>

      );
    }
  }

  function mapStateToProps(state){
      return state
  }

  export default connect(mapStateToProps)(ModalTest);


