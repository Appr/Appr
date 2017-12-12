

import React, { Component } from 'react';
import UserAvatar from '../../img/placeholders/Landon-Thumb-Grey.jpg';
import AlertIcon from '../../img/icons/Bell-02.svg';
import BoardsIcon from '../../img/icons/boards.svg';
import classnames from 'classnames';
import {Link, Route} from 'react-router-dom';
import Modal from 'react-modal';
import Feedback from '../content/Feedback/Feedback'
import './header.scss';
import './board-menu.scss';


const ModalBox = {
    
      overlay : {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        width: "100%"
      },
      content : {
        borderRadius: "4px",
        outline: "none",
        position: "absolute",
        top: "50%",
        left: "50%",
        right: "50%",
        bottom: "50%",
      }
    };




class Header extends Component {
    constructor(props){
        super(props);
        this.state ={
            rightMenuOpen: true,
            breadToX: false,
            boardMenuOpen: true,
            showHeader: false,
            showCurtain: true,
            feedbackModalOpen: false,
            
            userInfo: {
                name: 'Landon',
                username: 'landonwjohnson',
                email: 'landonwjohnson@gmail.com'
            }
         
            
        }
        this.handleRightMenuClick = this.handleRightMenuClick.bind(this); 
        this.handleBoardMenuClick = this.handleBoardMenuClick.bind(this);
        this.handleHeader = this.handleHeader.bind(this);
        this.closeMenus = this.closeMenus.bind(this);
        this.openFeedbackModal = this.openFeedbackModal.bind(this);
        this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
    }

    openFeedbackModal(){
        this.setState({breadToX: false})
        this.setState({boardMenuOpen: true})
        this.setState({showCurtain: true})
        this.setState({rightMenuOpen: true})
        this.setState({feedbackModalOpen: true})
        
    }
      
      
    closeFeedbackModal(){
        this.setState({feedbackModalOpen: false})
    }

    handleRightMenuClick(){
        if(this.state.rightMenuOpen){
            this.setState({
                rightMenuOpen: false,
                breadToX: true,
            })
        }
        else {
            this.setState({
                rightMenuOpen: true,
                breadToX: false
            })
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

    const userInitials = this.state.userInfo.name.charAt(0);
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

    let breadMenuTransform = classnames({
        "bread-menu-toggle-before": true,
        "bread-menu-toggle-after": this.state.breadToX
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
                <div className="v2 recent-boards-con">
                    <div className="text-12">RECENT PROJECTS</div>
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
                    <div className="text-12">PERSONAL PROJECTS</div>
                        
                        <Link to="/ideas" onClick={this.closeMenus}>
                            <div className="create-board-item">
                                <div className="create-board-thumbnail">
                                    <div className="plus-symbol">+</div>
                                </div>
                                <div className="create-board-name">
                                    Create Project
                                </div>
                            </div>
                        </Link>
                </div>
            </div>
          </div>
          <div className="header-container">
                <div className="nav-bar">
                    <div className="board-con" href="#" onClick={this.handleBoardMenuClick} >
                    <div className="board-icon"><img src={BoardsIcon} /></div>
                    
                    <div className="board-text">Projects</div>
                    </div>
                    <div>
                        <div className="logo"></div>
                    </div>
                <div className="user-con">
                 
                        <div className="avatar"> <label>{userInitials}</label> </div>
                        <div className="hello-user">Hello {this.state.userInfo.name}!</div>
                        <div className="alert-icon v2-placeholder"><img src={AlertIcon} /></div>
                        <div className="bread-container" onClick={this.handleRightMenuClick}>
                            <div className={breadMenuTransform} href="#" >
                                <div className="bread-menu">
                                    <div className="bread-top">  </div>
                                    <div className="bread-bottom"> </div>
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
                    <li onClick={this.openFeedbackModal}>Report Bug</li>
                    <Link to="/" onClick={this.closeMenus}><li>Log Out</li></Link>
                </ul>
            </div>
            </div>
        </div>
        
      
        
        

        <div className={handleCurtain} onClick={this.handleBoardMenuClick}>
        </div>

        <Modal 
              isOpen ={this.state.feedbackModalOpen} 
              onRequestClose={this.closeFeedbackModal}
              className="modal-account-settings-content"
              style={ModalBox}
        >
              <Feedback onCloseBtnClick={this.closeFeedbackModal} />
        </Modal>
      </div>
    );
  }
}

export default Header;
