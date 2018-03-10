import React, { Component } from 'react';
import { findProject, updateLastOpenedProject } from '../../../../../services/project.services';
import { updateProjectRedux, updateRecentProjects } from '../../../../../actions/actionCreators';
import history from '../../../../../history';
import { connect } from 'react-redux';
import moment from 'moment';
import { findRecentProjects } from '../../../../../services/dashboard.services';
class DashProject extends Component {
    render() {
        const { userid, projectid, projectName, backgroundSource, updateProjectRedux, updateRecentProjects } = this.props;
        function getProject(){
            let path = `/user/${userid}/project/${projectid}/ideas`;
            findProject(projectid)
            .then( res => {
                if (res.status !== 200) {
                    console.log(res);
                }
                else {
                    let incomingProjectInfo = res.data[0];
                    let newTime = moment();
                    let lastOpenedBody = {
                        time: newTime
                    }
                    updateLastOpenedProject(projectid,lastOpenedBody)
                        .then(res => {
                            if (res.status === 200){
                            findRecentProjects(userid)
                                .then(res => {
                                    if(res.status === 200){
                                        updateRecentProjects(res.data);
                                        updateProjectRedux(incomingProjectInfo);
                                        history.push(path)
                                    }
                                })
                            }
                        })
                }
            })
            .catch(err => {throw err});
        }

        return (
                <li className="project-thumb" style={{backgroundImage: `url(${backgroundSource})`}} onClick={(e) => getProject() } >
                    <div className="project-thumb-body" />
                    <div className="project-thumb-footer">
                        <label> {projectName} </label>
                    </div>
                </li>
        );
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateProjectRedux, updateRecentProjects}) (DashProject);
