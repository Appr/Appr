import React, { Component } from 'react';
import '../modals.scss';
import './changeavatar.scss';
import ChangeAvatarURL from './AvatarChangeURL/AvatarChangeURL';
import AvatarIconGallery from './AvatarIconGallery/AvatarIconGallery';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { updateUserInfo, updateUserAvatar } from '../../../../../../services/account.services'
import { connect } from 'react-redux';
class ChangeAvatar extends Component {
    constructor(props){
        super(props)
        this.state={
            userInfo: {
                avatar: ''
            },
            UI:{
                hideChangeURLOption: true,
                hideAvatarGallery: false
            }
        };
        this.handleAvatarChange = this.handleAvatarChange.bind(this);
        this.handleAvatarSubmit = this.handleAvatarSubmit.bind(this);
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

    handleAvatarSubmit(){
        const userid = this.props.userInfo.id;
        const reqBody = {
            avatar: this.state.userInfo.avatar
        };
        updateUserAvatar(userid, reqBody)
          .then( res => {
            if ( res.status !== 200 ) {
              alert(res);
            }
            else{
              this.props.pullFromBackend(userid);
              this.props.onCloseBtnClick();
            }
          })
          .catch(err => {throw err});
    }

    handleAvatarChange(e){
        let newAvatar = e.trim();
        this.setState({
            userInfo: {
                avatar: newAvatar
            }
          })
      }
    render() {
        const {userInfo, handleAvatarSubmit, onCloseBtnClick } = this.props;

        let avatarGalleryClass = classnames({
            "avatarIconGallery-wrapper":  true,
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

        let backBtnClass = classnames({
            "avatar-back-btn--before": this.state.UI.hideChangeURLOption,
            "avatar-back-btn--after": true
        })

      return (
        <div className="avatar-modal-wrapper">
            <div className="avatar-modal-content">
                <div className="avatar-modal-header">
                    <h2 className="avatar-modal-title">CHANGE AVATAR</h2>
                    <span className="avatar-closeBtn" onClick={onCloseBtnClick}>&times;</span>
                </div>
                {/* <form> */}
                <div className="avatar-settings-content">
                    <div className={`${modelBackBtnClass}`}>
                        <button className={`${backBtnClass}`} onClick={this.toggleChangeURL}>Back</button>
                    </div>
                    <div className={`${avatarGalleryClass}`}>
                        <AvatarIconGallery selectedAvatar={this.state.userInfo.avatar} handleAvatarChange={this.handleAvatarChange} toggleChangeURL={this.toggleChangeURL}/>
                    </div>

                    <div className={`${changeURLClass}`} >
                        <ChangeAvatarURL userInfo={userInfo} handleAvatarChange={this.handleAvatarChange} />
                    </div>
                </div>

                <div className="avatar-submitModal">
                    <button className="avatar-cancel-btn" onClick={onCloseBtnClick}> Cancel </button>
                    <button id="updateAvatar" className="avatar-submit-btn" onClick={(e) => {this.handleAvatarSubmit()}}> Update </button>
                </div>
                {/* </form> */}
            </div>
        </div>
      );
    }
  }

  function mapStateToProps(state){
        return state
  }

  ChangeAvatar.propTypes = { onCloseBtnClick: PropTypes.func }
  ChangeAvatar.defaultProps = { onCloseBtnClick: () => {} }
  export default connect(mapStateToProps)(ChangeAvatar);


