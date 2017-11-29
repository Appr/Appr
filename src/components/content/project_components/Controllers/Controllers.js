import React, { Component } from 'react';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import Header from '../../../Header/Header';
import addIcon from '../../../../img/icons/add-icon.svg';

import './controllers.scss';

class Controllers extends Component {
  render() {
    return (
    <div>
        <Header />
    <div className="main-fix">
        <ProjectSetupSidebar />
        <div className="controllers-container">
      
        <div className="controllers-wrapper">
        
            <div className="project-section-header">Controllers</div>
            <div className="controller-list-container">
                        <div className="contro-item">
                            <div className="contro-item-inner">
                            <div className="project-item-header">
                                <span> </span>
                            </div>
                                <div className="contro-item-title">
                                    <input type="text" placeholder="View 1" />
                                </div>
                                <div className="contro-item-inputs">
                                <div className="contro-row-container">
                                    <label className="contro-row-name">When</label>
                                    <div className="contro-input-row">
                                        
                                        <input
                                            className="contro-input-field" 
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="contro-row-container">
                                    <label className="contro-row-name">Do</label>
                                    <div className="contro-input-row">
                                        
                                        <input
                                            className="contro-input-field" 
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="contro-row-container">
                                    <label className="contro-row-name">Require</label>
                                    <div className="contro-input-row">
                                        
                                        <input
                                            className="contro-input-field" 
                                            type="text"
                                        />
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <button className="add-contro-item">
                            <div className="add-contro-item-inner">
                                <div className="add-contro-item-body">
                                    <img src={addIcon} alt="Add New Controller"/>
                                </div>
                                <div className="add-contro-item-footer">
                                    <label>Add New Controller</label>
                                </div>
                            </div>
                        </button>
            
            </div>
            
        </div>
      
      </div>
      </div>
      </div>
    );
  }
}

export default Controllers;