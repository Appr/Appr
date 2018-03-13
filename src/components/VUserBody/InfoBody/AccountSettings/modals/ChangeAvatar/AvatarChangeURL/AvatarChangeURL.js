import React, { Component } from 'react';
import ModalTextField from '../../../../../landomon-UI/ModalTextField';

class AvatarChangeURL extends Component {
    render() {
        const { userInfo, handleAvatarChange } = this.props;
      return (
                <div className="modal-body-avatar">
                    <section className="modal-row-avatar">
                        <ModalTextField 
                            label='Use Image URL'
                            onChangeAction={(e) => {handleAvatarChange(e.target.value)}}
                            type='url'
                        />
                        {/* <input className="modal-form-avatar" type="url" pattern={/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)jpg|png|gif?/g} autoFocus placeholder={userInfo.avatar} onChange={(e) => {handleAvatarChange(e.target.value)}}  required /> */}
                    </section> 
               </div>
      );
    }
  }

export default AvatarChangeURL


