import React, { Component } from 'react';
import classnames from 'classnames';
import './projectsidebar.scss';
import NavMenu from './NavMenu/NavMenu';
import BackgroundMenu from './BackgroundMenu/BackgroundMenu';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import { withRouter } from 'react-router-dom'

 class ProjectSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UI:{ 
                hideProjectMenu: false,
                hideSettingsMenu: true,
                hideBackgroundMenu: true
            }
        };
        this.toggleBackgroundMenu = this.toggleBackgroundMenu.bind(this);
        this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this);
    }


    toggleSettingsMenu(){
        if(this.state.UI.hideProjectMenu === false){
            this.setState({ 
                UI: { 
                        hideProjectMenu: true, 
                        hideSettingsMenu: false,
                        hideBackgroundMenu: true
                    }
                })
        }
        else if(this.state.UI.hideSettingsMenu === false){
            this.setState({ 
                UI: { 
                        hideProjectMenu: false, 
                        hideSettingsMenu: true,
                        hideBackgroundMenu: true,
                     } 
                })
        }
    }
    

    toggleBackgroundMenu(){
        if(this.state.UI.hideSettingsMenu === false){
            this.setState({ 
                UI: { 
                        hideProjectMenu: true, 
                        hideSettingsMenu: true,
                        hideBackgroundMenu: false
                    }
                })
        }
        else if(this.state.UI.hideBackgroundMenu === false){
            this.props.clearProjectBackgroundPreview();
            this.setState({ 
                UI: { 
                        hideProjectMenu: true, 
                        hideSettingsMenu: false,
                        hideBackgroundMenu: true 
                    } 
                })
        }
    }

    render() {
        
        let navMenuClass = classnames({
            "navMenu-wrapper": true,
            "navMenu--hide": this.state.UI.hideProjectMenu
        })

        let backgroundMenuClass = classnames({
            "backgroundMenu--hide": this.state.UI.hideBackgroundMenu,
            "backgroundMenu-wrapper": true
        })

        let settingsMenuClass = classnames({
            "settingsMenu--hide": this.state.UI.hideSettingsMenu,
            "settingsMenu-wrapper": true
        })
        
        const {handleProjectBackground, userid, projectid, selectedBackground, changeProjectBackground } = this.props;
       
        return (

            
            <div className="project-sidebar">
                <span className="psb-divider" />
                <div className={`${navMenuClass}`}>
                    <NavMenu userid={userid} projectid={projectid} toggleSettingsMenu={this.toggleSettingsMenu}  />
                </div>
                <div className={settingsMenuClass} >
                    <SettingsMenu toggleSettingsMenu={this.toggleSettingsMenu} toggleBackgroundMenu={this.toggleBackgroundMenu} />
                </div>
                <div className={backgroundMenuClass} >
                    <BackgroundMenu changeProjectBackground={changeProjectBackground} selectedBackground={selectedBackground}  handleProjectBackground={handleProjectBackground} toggleBackgroundMenu={this.toggleBackgroundMenu} />
                </div>
            </div>
        )
    }
}

export default withRouter(ProjectSidebar);