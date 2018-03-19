import React, { Component } from 'react';
import { findAvatars} from '../../../../../../../services/avatar.services';
import AvatarItem from './AvatarItem/AvatarItem';


class AvatarIconGallery extends Component {
    constructor(props){
        super(props);
        this.state ={
            avatars: []
        }
    }

    componentWillMount(){
        findAvatars()
            .then( res => {
                if (res.status !== 200){
                    console.log(res);
                }
                else{
                    this.setState({ avatars: res.data })
                }
            })
    }


    render() {
        const { handleAvatarChange, toggleChangeURL, selectedAvatar} = this.props;
        const avatars = this.state.avatars;
        const displayAvatarItems = avatars.map( avatar => {
            const index = avatars.indexOf(avatar);
            return(
                <AvatarItem key={index} selected={ avatar.avatar_url === selectedAvatar } backgroundSource={avatar.avatar_url} creatorName={avatar.creator_name} portfolio={avatar.portfolio} handleAvatarChange={handleAvatarChange}/>
            )
        })
      return (
                <div className="modal-body-avatar">
                    <section className="avatarPicContainer">
                       <ul className="avatarPicList">
                            <li className="avatarURLItem" onClick={e => {toggleChangeURL()}}></li>
                                    { displayAvatarItems }
                      
                        </ul>
                    </section> 
               </div>
      );
    }
  }

export default AvatarIconGallery;