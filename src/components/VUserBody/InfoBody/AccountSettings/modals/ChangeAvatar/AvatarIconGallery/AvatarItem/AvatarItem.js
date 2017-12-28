import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './avataritem.scss';
import classnames from 'classnames';

class AvatarItem extends Component {
    constructor(props){
        super(props);
        this.state ={
            selected: false,
        }

        this.handleAvatarClick = this.handleAvatarClick.bind(this);
    }
 



    handleAvatarClick(backgroundSource){
        this.props.handleAvatarChange(backgroundSource);
        if(this.props.backgroundSource === this.props.oldAvatar){
            this.setState({selected: true})
        }
        this.props.handleAvatarChange(backgroundSource);
        
}

 

    render() {
        let avatarPicItemClass = classnames({
            'avatarPicItem': true,
            'avatarPicItem--selected': this.state.selected
        })
        console.log(this.state)
        const { backgroundSource, portfolio, creatorName, oldAvatar} = this.props;
      return (
            <li className={avatarPicItemClass} value={backgroundSource}  onClick={(e) => this.handleAvatarClick(backgroundSource)} style ={{ backgroundImage: `url(${backgroundSource})` }}> 
                <section className="attribution">
                    <Link to={portfolio} target="_blank">
                        <label>{creatorName}</label>
                        <span>SELECTED</span>
                    </Link>
                </section> </li>
      );
    }
  }

export default AvatarItem


