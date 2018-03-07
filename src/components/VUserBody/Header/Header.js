import React, { Component } from 'react';
import BoardsIcon from '../../../img/icons/boards.svg';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Feedback from './Feedback/Feedback';
import './header.scss';
import { ModalBox } from './headerStyles';
import BoardMenu from './BoardMenu/BoardMenu';
import { connect } from 'react-redux';
import { logout } from '../../../services/auth.services';


class Header extends Component {
    constructor(props){
        super(props);
        this.state ={
            rightMenuOpen: true,
            breadToX: false,
            boardMenuOpen: true,
            showCurtain: true,
            feedbackModalOpen: false,
            UI: {
                hideHeader: false
            }
        }
            this.handleRightMenuClick = this.handleRightMenuClick.bind(this); 
            this.handleBoardMenuClick = this.handleBoardMenuClick.bind(this);
            this.closeMenus = this.closeMenus.bind(this);
            this.openFeedbackModal = this.openFeedbackModal.bind(this);
            this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
            this.handleLogOut = this.handleLogOut.bind(this);
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
            this.setState({breadToX: false})
            this.setState({rightMenuOpen:true})
       
        }
        else {
            this.setState({boardMenuOpen: true})
            this.setState({showCurtain: true})
        }
    }

    closeMenus(){
        this.setState({
                boardMenuOpen: true,
                showCurtain: true,
                rightMenuOpen: true,
                breadToX: false
            })
    }

    handleLogOut() {
        logout()
        .then( res => {
            console.log(res);
        })
    }
    
  render(){
    const { userInfo, handleInitials } = this.props;

     

    
    let rightMenuClass = classnames({
        "right-menu-container--hide": this.state.rightMenuOpen,
        "right-menu-container": true
    })

    let boardMenuClass = classnames({
        "board-menu-container--hide": this.state.boardMenuOpen,
        "board-menu-container": true
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
 
      <div>
          <div className={boardMenuClass}>
                <BoardMenu closeMenus={this.closeMenus}/>
          </div>
          <div className="header-container">
                <div className="nav-bar">
                    <div className="board-con" href="#" onClick={this.handleBoardMenuClick} >
                            <div className="board-icon"><img src={BoardsIcon} alt="board menu" /></div>      
                            <div className="board-text">Projects</div>
                    </div>
                    <div className="header-search"> 
                                <input />
                                <button />
                    </div>

                    <div>
                        <div className="logo"></div>
                    </div>
                    <div className="user-con">
                            <div className="avatar" style={{backgroundImage: `url(${userInfo.avatar})`}} > <label>{handleInitials()}</label> </div>
                            <div className="hello-user">Hello {userInfo.first_name}!</div>
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
        <div className={rightMenuClass} >
            <div className="right-menu-outter">
            <div className="right-menu-inner">
                <ul>
                    <Link to={`/user/${userInfo.id}/account/settings/${userInfo.id}`} onClick={this.closeMenus}><li>Settings</li></Link>
                    <li onClick={this.openFeedbackModal}>Report Bug</li>
                    <Link to="/" onClick={(e) => this.handleLogOut()}><li>Log Out</li></Link>
                </ul>
            </div>
            </div>
            <div className="backdropCloseMenu" onClick={this.closeMenus}/>
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

function mapStateToProps(state){
    const { userInfo } = state;
    return {
        userInfo
    }
}
export default connect(mapStateToProps)(Header);