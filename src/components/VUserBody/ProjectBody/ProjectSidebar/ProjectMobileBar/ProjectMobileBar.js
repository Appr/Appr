import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './projectmobilebar.scss';
import history from '../../../../../history';
import { connect } from 'react-redux';

class ProjectMobileBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: '',
            opened: false,
        };
        this.handleRoute = this.handleRoute.bind(this);
        this.handleClassMainBar = this.handleClassMainBar.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
  }


    handleRoute(pageTitle, urlTitle){
        let path=`/user/${userid}/project/${projectid}/${urlTitle}`
        function pushRoute(){
            history.push(path);
        }
        const { userid, projectid } = this.props;
        this.setState({
            currentPage: pageTitle
        })
        this.toggleMenu();
        setTimeout(pushRoute, 2000)
    }

    handleClassMainBar(){
        if(this.state.opened === false){
            return 'mobile-bar-menu--hide';
        }
        else{
            return 'mobile-bar-menu';
        }
    }

    toggleMenu(){
        if(this.state.opened === false){
            this.setState({
                opened: true
            })
        }
        else{
            this.setState({
                opened: false
            })
        }
    }

    render() {


        

        const items = [
            {
                pageTitle: 'Ideas & Users',
                urlTitle: 'ideas'
            }, 
            {
                pageTitle: 'Features',
                urlTitle: 'features'
            },
            {
                pageTitle: 'Views',
                urlTitle: 'views'
            },
            {
                pageTitle: 'Controllers',
                urlTitle: 'controllers'
            },
            {
                pageTitle: 'Endpoints',
                urlTitle: 'endpoints'
            },
            {
                pageTitle: 'Schema',
                urlTitle: 'schema'
            },
            {
                pageTitle: 'Tracker',
                urlTitle: 'tracking'
            },
            {
                pageTitle: 'Project Settings',
                urlTitle: 'settings'
            }
        ];


        console.table(items)
        let displayItems = items.map((item, index) => {
                return (
                    <li key={`${item.index}-link`} onClick={(e) => {this.handleRoute(item.pageTitle, item.urlTitle)}} >{item.pageTitle}</li>
                )
        }) 
        return (
                <div className="project-mobile-bar"  >
                    <label onClick={(e) => {this.toggleMenu()}}>{this.props.projectInfo.name}</label>
                    <ul className={this.handleClassMainBar()}>
                        {displayItems}
                        {/* <Link exact to={`/user/${userid}/project/${projectid}/ideas`}><li>Ideas & Users</li></Link>
                        <Link exact to={`/user/${userid}/project/${projectid}/features`} ><li >Features</li></Link>
                        <Link exact to={`/user/${userid}/project/${projectid}/views`}  ><li>Views</li></Link>
                        <Link exact to={`/user/${userid}/project/${projectid}/controllers`} ><li>Controllers</li></Link>
                        <Link exact to={`/user/${userid}/project/${projectid}/endpoints`} ><li>Endpoints</li></Link>
                        <Link exact to={`/user/${userid}/project/${projectid}/schema`} ><li >Schema</li></Link>
                        <Link exact to={`/user/${userid}/project/${projectid}/tracker`} ><li >Tracker</li></Link>
                        <Link exact to={`/user/${userid}/project/${projectid}/setttings`} ><li >Settings</li></Link> */}

                    </ul>
                </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default withRouter(connect(mapStateToProps)(ProjectMobileBar));