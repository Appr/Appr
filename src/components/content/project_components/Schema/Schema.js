import React, { Component } from 'react';
import './schema.scss';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import Header from '../../../Header/Header';
import addIcon from '../../../../img/icons/add-icon.svg';

class Schema extends Component {
  render() {
    return (
      <div>
      <Header />
        <div className="main-fix">
          <ProjectSetupSidebar />
            <div className="schema-container">
              <div className="schema-wrapper">
                <div className="project-section-header">Schema</div>
                <div className="table-list-container">
                  <div className="schema-item">
                  <div className="project-item-header">
                    <span> </span>
                  </div>
                    <div className="name-table-row">
                      <input className="name-table" type="text" placeholder="Table Name" />
                    </div>
                        <div className="column-item">
                          <div className="column-fields-wrapper">
                            <input className="column-input-text md-input" type ="text" placeholder="column name" />
                            <select className="column-input-select sm-input" required placeholder="type">
                              <option value="">type </option>
                              <option value="">DATE</option>
                              <option value="">INTEGER</option>
                              <option value="">TEXT</option>
                              <option value="">VARCHAR</option>
                              <option value="">CHAR</option>
                            </select>
                                      
                            <input className="schema-column-text sm-input" type ="text" placeholder="size" />
                          </div>
                            <div className="column-checkbox-wrapper">
                                  <div className="column-checkbox">
                                    <label> pk </label>
                                    <input type="checkbox" />
                                  </div>

                                  <div className="column-checkbox">
                                    <label> fk </label>
                                    <input type="checkbox" />
                                  </div>

                                  <div className="column-checkbox">
                                    <label> ai </label>
                                    <input type="checkbox" />
                                  </div>

                                  <div className="column-checkbox">
                                    <label> nn </label>
                                    <input type="checkbox" />
                                  </div>

                              <div className="column-checkbox">
                                <label> ur </label>
                                <input type="checkbox" />
                              </div>
                            </div>
                            <div className="remove-row">
                              <span className="delete-x">&times;</span> 
                            </div>
                        </div>
                        
                    <div className="column-item-footer">
                      <button className="add-button"> <img src={addIcon} alt="Add Column"/> Add Column </button>
                    </div>
                  </div>
                  
                  <div className="schema-item">
                    <div className="project-item-header">
                      <span> </span>
                    </div>
                    <div className="name-table-row">
                      <input className="name-table" type="text" placeholder="Table Name" />
                    </div>
                        <div className="column-item">
                          <div className="column-fields-wrapper">
                            <input className="column-input-text md-input" type ="text" placeholder="column name" />
                            <select className="column-input-select sm-input" required placeholder="type">
                              <option value="">type </option>
                              <option value="">DATE</option>
                              <option value="">INTEGER</option>
                              <option value="">TEXT</option>
                              <option value="">VARCHAR</option>
                              <option value="">CHAR</option>
                            </select>
                                      
                            <input className="schema-column-text sm-input" type ="text" placeholder="size" />
                          </div>
                            <div className="column-checkbox-wrapper">
                                  <div className="column-checkbox">
                                    <label> pk </label>
                                    <input type="checkbox" />
                                  </div>

                                  <div className="column-checkbox">
                                    <label> fk </label>
                                    <input type="checkbox" />
                                  </div>

                                  <div className="column-checkbox">
                                    <label> ai </label>
                                    <input type="checkbox" />
                                  </div>

                                  <div className="column-checkbox">
                                    <label> nn </label>
                                    <input type="checkbox" />
                                  </div>

                              <div className="column-checkbox">
                                <label> ur </label>
                                <input type="checkbox" />
                              </div>
                            </div>
                            <div className="remove-row">
                              <span className="delete-x">&times;</span> 
                            </div>
                        </div>
                        <span className="schema-divider"></span>
                        <div className="column-item">
                          <div className="column-fields-wrapper">
                            <input className="column-input-text md-input" type ="text" placeholder="column name" />
                            <select className="column-input-select sm-input" required placeholder="type">
                              <option value="">type </option>
                              <option value="">DATE</option>
                              <option value="">INTEGER</option>
                              <option value="">TEXT</option>
                              <option value="">VARCHAR</option>
                              <option value="">CHAR</option>
                            </select>
                                      
                            <input className="schema-column-text sm-input" type ="text" placeholder="size" />
                          </div>
                            <div className="column-checkbox-wrapper">
                                  <div className="column-checkbox">
                                    <label> pk </label>
                                    <input type="checkbox" />
                                  </div>

                                  <div className="column-checkbox">
                                    <label> fk </label>
                                    <input type="checkbox" />
                                  </div>

                                  <div className="column-checkbox">
                                    <label> ai </label>
                                    <input type="checkbox" />
                                  </div>

                                  <div className="column-checkbox">
                                    <label> nn </label>
                                    <input type="checkbox" />
                                  </div>

                              <div className="column-checkbox">
                                <label> ur </label>
                                <input type="checkbox" />
                              </div>
                            </div>
                            <div className="remove-row">
                              <span className="delete-x">&times;</span> 
                            </div>
                        </div>
                        
                    <div className="column-item-footer">
                      <button className="add-button"> <img src={addIcon} /> Add Column </button>
                    </div>
                  </div>
                  <button className="add-table"> Add Table </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Schema;