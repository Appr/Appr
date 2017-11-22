import React, { Component } from 'react';
import UserAvatar from '../img/placeholders/Landon-Thumb-Grey.jpg';
import AlertIcon from '../img/icons/Bell-02.svg';
import BoardsIcon from '../img/icons/boards.svg';
import classnames from 'classnames';
import {Link, Route} from 'react-router-dom';
import AccountSettings from './content/AccountSettings';





class Header extends Component {
    constructor(props){
        super(props);
        this.state ={
            rightMenuOpen: true,
            boardMenuOpen: true,
            showHeader: false,
            showCurtain: true
        }
        this.handleRightMenuClick = this.handleRightMenuClick.bind(this); 
        this.handleBoardMenuClick = this.handleBoardMenuClick.bind(this);
        this.handleHeader = this.handleHeader.bind(this);
        this.closeMenus = this.closeMenus.bind(this);

    }

    handleRightMenuClick(){
        if(this.state.rightMenuOpen){
            this.setState({rightMenuOpen: false})
        }
        else {
            this.setState({rightMenuOpen: true})
        }
    }


    handleBoardMenuClick(){
        if(this.state.boardMenuOpen){
            this.setState({boardMenuOpen: false})
            this.setState({showCurtain: false})
        }
        else {
            this.setState({boardMenuOpen: true})
            this.setState({showCurtain: true})
        }
    }
    
    handleHeader(){
        if(this.state.showHeader){
            this.setState({showHeader: false})
        }
        else {
            this.setState({showHeader: true})
        }
    }

    closeMenus(){
        this.setState({boardMenuOpen: true})
        this.setState({showCurtain: true})
        this.setState({rightMenuOpen: true})
    }
    
  render(){
    let rightMenuClass = classnames({
        "right-menu-container--hide": this.state.rightMenuOpen,
        "right-menu-container": true
    })

    let boardMenuClass = classnames({
        "board-menu-container--hide": this.state.boardMenuOpen,
        "board-menu-container": true
    })

    let showHeaderClass = classnames({
        "header-parent--hide": this.state.showHeader,
        "header-parent": true
    })

    let handleCurtain= classnames({
        "curtain--off": this.state.showCurtain,
        "curtain--on": true
    })

   
    

  
    return (
      <div className="header-parent">
      
          <div className={boardMenuClass}>
          
            <div className="boards-main-container">
            <div className="board-menu-header">
            <div className="back-con" onClick={this.closeMenus}>
                <div className="back-icon"> </div>
                <div className="board-text">Hide</div>
            </div>

                  
            </div>
                <div className="recent-boards-con">
                    <div className="text-12">RECENT BOARDS</div>
                        <div className="board-menu-item">
                            <div className="board-item-thumbnail">

                            </div>
                            <div className="board-item-name">
                                Placeholder
                            </div>
                        </div>
                    <div className="board-menu-item">
                        <div className="board-item-thumbnail">

                        </div>
                        <div className="board-item-name">
                            Placeholder
                        </div>
                    </div>
               
                </div>
                <div className="personal-boards-con">
                    <div className="text-12">PERSONAL BOARDS</div>
                        <div className="create-board-item">
                            <div className="create-board-thumbnail">
                                <div className="plus-symbol">+</div>
                            </div>
                            <div className="create-board-name">
                                Create Board
                            </div>
                        </div>
                </div>
            </div>
          </div>
          <div className="header-container">
                <div className="nav-bar">
                    <div className="board-con" href="#" onClick={this.handleBoardMenuClick} >
                    <div className="board-icon"><img src={BoardsIcon} /></div>
                    
                    <div className="board-text">Boards</div>
                    </div>
                    <div>
                        <div className="logo">Appr</div>
                    </div>
                <div className="user-con">
                 
                        <div className="avatar"><img src={UserAvatar} /></div>
                        <div className="hello-user">Hello Landon!</div>
                        <div className="alert-icon"><img src={AlertIcon} /></div>
                        <div className="bread-container">
                            <div id="bread-menu-toggle" href="#" onClick={this.handleRightMenuClick} >
                                <div className="bread-menu">
                                    <div className="bread-top"> <span/> </div>
                                    <div className="bread-bottom"> <span/> </div>
                                </div>
                            </div> 
                        </div>    
                </div>
                </div>
                
        </div>
        <div className={rightMenuClass}>
            <div className="right-menu-outter">
            <div className="right-menu-inner">
                <ul>
                    <Link to="/account-settings" onClick={this.closeMenus}><li>Settings</li></Link>
                    <li>Feedback</li>
                    <Link to="/" onClick={this.closeMenus}><li>Log Out</li></Link>
                </ul>
            </div>
            </div>
        </div>
        
      
        
        

        <div className={handleCurtain} onClick={this.handleBoardMenuClick}>
        </div>
      </div>
    );
  }
}

export default Header;
