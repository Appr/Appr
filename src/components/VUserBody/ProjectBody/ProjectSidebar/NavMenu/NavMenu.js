import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import './navmenu.scss';
import { findProject, updateProject } from '../../../../../services/project.services';
import { connect } from 'react-redux';
import { updateDashboard } from '../../../../../actions/actionCreators';
import { findDashboardInfo } from '../../../../../services/dashboard.services';

class ProjectSetupSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: ''
        };
  }



    render() {
        const { userid, projectid, projectInfo, toggleSettingsMenu } = this.props;
        let projectName = this.props.projectInfo.name;
        return (
            <div>
                <div className='project-sidebar-header'>
                    <div className="nav-project-name"> 
                        {projectName}
                    </div>
                </div>
                
                <ul className={'nav-list'} >
                    <NavLink exact activeClassName="nav-item--active" to={`/user/${userid}/project/${projectid}/ideas`} className="nav-item" ><li>Ideas & Users</li></NavLink>
                    <NavLink exact activeClassName="nav-item--active" to={`/user/${userid}/project/${projectid}/features`} className="nav-item"><li >Features</li></NavLink>
                    <NavLink exact activeClassName="nav-item--active" to={`/user/${userid}/project/${projectid}/views`}  className="nav-item"><li>Views</li></NavLink>
                    <NavLink exact activeClassName="nav-item--active" to={`/user/${userid}/project/${projectid}/controllers`} className="nav-item"><li>Controllers</li></NavLink>
                    <NavLink exact activeClassName="nav-item--active" to={`/user/${userid}/project/${projectid}/endpoints`} className="nav-item"><li>Endpoints</li></NavLink>
                    <NavLink exact activeClassName="nav-item--active" to={`/user/${userid}/project/${projectid}/schema`} className="nav-item"><li >Schema</li></NavLink>
                    <NavLink exact activeClassName="nav-item--active" to={`/user/${userid}/project/${projectid}/tracker`} className="nav-item"><li >Tracker</li></NavLink>
                </ul>

                <div className='project-sidebar-footer'>
                    <label onClick={(e) => toggleSettingsMenu()}>Change Settings</label>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default withRouter(connect(mapStateToProps, {updateDashboard})(ProjectSetupSidebar));