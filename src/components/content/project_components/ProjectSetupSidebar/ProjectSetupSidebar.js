import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './project-setup-sidebar.scss';

export default class ProjectSetupSidebar extends Component {
    render() {
        return (
            <div className="project-sidebar-container">
            <div className="project-sidebar-header">
                <input type="text" placeholder="Project Name" autoFocus/> 
            </div>
            <ul className="project-sidebar-inner">
                <Link to="ideas" className="psb-item"><li>Ideas & Users</li></Link>
                <Link to="features" className="psb-item"><li >Features</li></Link>
                <Link to="views"  className="psb-item"><li>Views</li></Link>
                <Link to="controllers" className="psb-item"><li>Controllers</li></Link>
                <Link to="endpoints" className="psb-item"><li>Endpoints</li></Link>
                <Link to="schema" className="psb-item"><li >Schema</li></Link>
                <Link to="tracker" className="psb-item"><li >Tracker</li></Link>
                <Link to="tracking" className="psb-item"><li >Tracking</li></Link>
            </ul>
        </div>
        )
    }
}