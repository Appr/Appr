import React, { Component } from 'react';
import '../AccountSettings/modals/modals.scss';


class Feedback extends Component {
  render() {
      const getURLPath = `${window.location.href}`
    return (
        <div className="modalStyle-inner">
        <div className="modal-account-settings-content">
            <div className="modal-header">
                <div className="modal-header-placeholder"></div>
                <h2 className="modal-title">Report Bug</h2>
                <span className="closeBtn" onClick={this.props.onCloseBtnClick}>&times;</span>
            </div>
            <form method="post" action="/send">
            <div className="modal-body">
                <label class="modal-input-tag">Problem</label>
                <section class="modal-row">
                    <input type="text" name="problem" id="problem" class="modal-form" required autoFocus />
                </section>
                <label class="modal-input-tag">Description</label>
                <section class="modal-row">
                    <textarea id="description" name="description" class="modal-form" style={{"min-height": "70px", "resize": "none"}} required/>
                </section>
                <input type="text" name="location" id="location" value={getURLPath} style={{"display": "none"}} />
                    
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
