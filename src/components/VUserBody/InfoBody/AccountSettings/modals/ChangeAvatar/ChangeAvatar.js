import React, { Component } from 'react';
import '../modals.scss';
import './changeavatar.scss';
import ChangeAvatarURL from './AvatarChangeURL/AvatarChangeURL';
import AvatarIconGallery from './AvatarIconGallery/AvatarIconGallery';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ChangeAvatar extends Component {
    constructor(props){
        super(props)
        this.state={
            avatar: this.props.userInfo.avatar,
            UI:{
                hideChangeURLOption: true,
                hideAvatarGallery: false
            }
        };
        this.handleAvatarChange = this.handleAvatarChange.bind(this);
        this.toggleChangeURL = this.toggleChangeURL.bind(this);
    }

    toggleChangeURL(){
        if(this.state.UI.hideChangeURLOption === true){
            this.setState({
                UI: {
                    hideChangeURLOption: false,
                    hideAvatarGallery: true
                }
            })
        }
        else{
            this.setState({
            UI: {
                hideChangeURLOption: true,
                hideAvatarGallery: false
            }
        })
    }}
    
    handleAvatarChange(e){
        let newAvatar = e.trim();
        this.setState({
            avatar: newAvatar
          })
      }
    render() {
        const {userInfo, handleAvatarSubmit, onCloseBtnClick } = this.props;

        let avatarGalleryClass = classnames({
            "avatarIconGallary-wrapper":  true,
            "avatarIconGallery--hide": this.state.UI.hideAvatarGallery
        })

        let changeURLClass = classnames({
            "changeAvatarURL--hide": this.state.UI.hideChangeURLOption,
            "changeAvatarURL-wrapper": true
        })

        let modelBackBtnClass = classnames({
            "modal-header-placeholder--before": this.state.UI.hideChangeURLOption,
            "model-header-placeholder--after": true
        })
      return (
        <div className="modalStyle-inner">
            <div className="modal-account-settings-content">
                <div className="modal-header">
                    <div className={`${modelBackBtnClass}`}>
                        <button onClick={this.toggleChangeURL}>Back</button>
                    </div>
                    <h2 className="modal-title">Change Avatar</h2>
                    <span className="closeBtn" onClick={onCloseBtnClick}>&times;</span>
                </div>
                {/* <form> */}
                    <div className="avatar-settings-content">
                        <div className={`${avatarGalleryClass}`}>
                            <AvatarIconGallery selectedAvatar={this.state.avatar} handleAvatarChange={this.handleAvatarChange} toggleChangeURL={this.toggleChangeURL} oldAvatar={this.state.avatar}/>
                        </div>
                        
                        <div className={`${changeURLClass}`} >
                            <ChangeAvatarURL userInfo={userInfo} handleAvatarChange={this.handleAvatarChange} />
                        </div>
                    </div>

                <div className="submitModal">
                    <button id="updateAvatar" onClick={(e) => {handleAvatarSubmit(this.state.avatar)}}>
                    Update Avatar
                    </button>
                </div>
                {/* </form> */}
            </div>
        </div>
      );
    }
  }

  ChangeAvatar.propTypes = { onCloseBtnClick: PropTypes.func }
  ChangeAvatar.defaultProps = { onCloseBtnClick: () => {} }
  export default ChangeAvatar;


