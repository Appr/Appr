import React, { Component } from 'react';
import './settingsmenu.scss';
import Modal from 'react-modal';
import { ModalBox } from '../../../Header/headerStyles';
import ArchiveProject from './modals/ArchiveProject';
import RenameProject from './modals/RenameProject';


export default class SettingsMenu extends Component {
        constructor(props) {
        super(props);
        this.state = {
            archiveModalOpen: false,
            projectNameModalOpen: false,
        };
        this.openArchiveModal = this.openArchiveModal.bind(this);
        this.closeArchiveModal = this.closeArchiveModal.bind(this);
        this.openProjectNameModal = this.openProjectNameModal.bind(this);
        this.closeProjectNameModal = this.closeProjectNameModal.bind(this);
    }

    openArchiveModal(){
        this.setState({archiveModalOpen: true})
    }

    openProjectNameModal(){
        this.setState({projectNameModalOpen: true})
    }

    closeArchiveModal(){
        this.setState({archiveModalOpen: false})
    }

    closeProjectNameModal(){
        this.setState({projectNameModalOpen: false})
    }


    render() {
        let { toggleSettingsMenu, toggleBackgroundMenu } = this.props;

        return (
            <div>
                 
                    <div className='project-settings-header'>
                        {/* <button onClick={(e) => toggleSettingsMenu()}/> */}
                            <div className="change-settings-title"> Settings </div>
                        {/* <span /> */}
                    </div>
                    
                    <ul className='settings-list'>
                        <li className="settings-list-item" onClick={(e) => toggleBackgroundMenu()}>Change Background</li>
                        <li className="settings-list-item" onClick={this.openProjectNameModal}>Change Name</li>
                        <li className="settings-list-item" onClick={this.openArchiveModal}>Archive Project</li>
                    </ul>

                    <div className='project-sidebar-footer'>
                        <label onClick={(e) => toggleSettingsMenu()}>Close Settings</label>
                        
                    </div>
                
                <Modal
                    isOpen={this.state.archiveModalOpen}
                    onRequestClose={this.closeArchiveModal}
                    className="modal-account-settings-content"
                    style={ModalBox}
                >
                    <ArchiveProject closeArchiveModal={this.closeArchiveModal} />
                </Modal>

                <Modal
                    isOpen={this.state.projectNameModalOpen}
                    onRequestClose={this.closeProjectNameModal}
                    className="modal-account-settings-content"
                    style={ModalBox}
                >
                    <RenameProject closeProjectNameModal={this.closeProjectNameModal} />
                </Modal>
            </div>
        )
    }
}