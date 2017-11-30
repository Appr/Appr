import React, { Component } from 'react';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import AddIcon from '../../../../img/icons/add-icon.svg';
import './features.scss';
import Header from '../../../Header/Header';

class Features extends Component {
  render() {
    return (
      <div>
      <Header />
      <div className="main-fix">
        <ProjectSetupSidebar />

          <div className="features-container">
            <div className="container-wrapper">
                <div className="project-section-header">
                  <label>Features</label> 
                </div>

            

                    <div className="features-area drop-shadow">
                      <div className="features-wrapper">
                        <div className="features-list">
                            <div className="features-item">
                                    <section>
                                    <label>1.</label>
                                    <input placeholder="Feature"></input>
                                    </section>
                                    <button className="not-enough-info-btn">Save</button>
                                    <span className="delete-x">&times;</span> 
                            </div>
                            
                        </div>
                        <div className="features-footer">
                              <button className="add-button"> <img src={AddIcon}/> Add Feature </button>
                        </div>
                      </div>
                    </div>

                
            </div>
         </div>
      </div>
      </div>
    );
  }
}

export default Features;