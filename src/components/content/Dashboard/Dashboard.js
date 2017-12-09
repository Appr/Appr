import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.scss';
import './dashboard-projects.scss';
import addIcon from '../../../img/icons/add-icon.svg';
import Header from '../../Header/Header'

class Dashboard extends Component {
  render() {
    return (
      <div>
      <Header />
      <div className="dashboard-container">
      <div className="personal-list-container">
          <label className="dash-section-title">Personal Projects</label>
          <ul className="projects-list">
              {/* <li className="project-thumb">
                  <div className="project-thumb-body">
                      <div className="project-thumb-icon"></div>
                  </div>
                  <div className="project-thumb-footer">
                      <label>Houser</label>
                  </div>
              </li>
               */}
              <Link to="/ideas">
                  <li className="create-project-thumb">
                      <div className="create-project-thumb-body">
                          <img src={addIcon} alt="add icon"/>
                      </div>
                      <div className="create-project-thumb-footer">
                          <label>Create New Project</label>
                      </div>
                  </li>
              </Link>
          </ul>
      </div>
      </div>


</div>

    );
  }
}

export default Dashboard;