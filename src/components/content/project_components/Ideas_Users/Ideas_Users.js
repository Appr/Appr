import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import Header from '../../../Header/Header';
import './idea_users.scss';
import { getUId, getAltUId } from '../../../../utils/uid.utils';
import { createProjectIdea, findProjectIdeas, updateProjectIdea, deleteProjectIdea } from '../../../../services/project.idea.services';

class Ideas_Users extends Component {
    constructor(props) {
        super(props);
        this.state={
            input: '',
            ideas: [],
            users: []
        }
        this.handleAddIdeaButton = this.handleAddIdeaButton.bind(this);
        this.handleChangeIdea = this.handleChangeIdea.bind(this);
        this.submitChangeIdea = this.submitChangeIdea.bind(this);
        this.handleDeleteIdeaButton = this.handleDeleteIdeaButton.bind(this);
    }

    componentDidMount() {
        // const projectid = this.props.match.params.projectid
        // when testing is over, delete the next line and uncomment the line above.
        const projectid = 1;

        const ideaExamples = [
            { idea_data: 'example: Rule the Galaxy.' },
            { idea_data: 'example: Get Baby out of the corner.'}
        ];

        findProjectIdeas(projectid)
            .then( res => {
                if(res.status !== 200) {
                    console.log(res);
                }
                else {
                    if(res.data.length > 0) {
                        this.setState({ ideas: res.data });
                    }
                    else {
                        this.setState({ ideas: ideaExamples });
                    }
                }
            })
            .catch(err => {throw err});
    }

    handleAddIdeaButton() {
        // const projectid = this.props.match.params.projectid
        // the line above should work, below is just a temporary solution
        const projectid = 1;

        const body = {ideaData: ''};
        const newState = this.state.ideas;
        newState.push(body);
        this.setState({ ideas: newState });

        createProjectIdea( projectid, body)
            .then(res => {
                if(res.status !== 200) {
                    console.log(res);
                }
            })
            .catch(err => {throw err})
    }

    handleChangeIdea(e) {
        // the next line should work, but it returns undefined.
        // const index = Number(e.target.index);

        const newState = this.state.ideas;

        // newState[index].idea_data = e.target.value;
        // the line above should work, below is just a temporary solution
        newState.find( idea => {
            if (idea.id == e.target.id) {
                idea.idea_data = e.target.value;
            }
        });

        this.setState({ ideas: newState });
    }

    submitChangeIdea(e) {
        // the next line should work, but it returns undefined.
        // const index = Number(e.target.index);

        // const projectid = this.props.match.params.projectid
        // the line above should work, below is just a temporary solution
        const projectid = 1;

        const ideaid = Number(e.target.id);

        // const body = this.state.ideas[index].idea_data;
        // the line above should work, below is just a temporary solution
        let body;
        const newState = this.state.ideas;
        newState.find( idea => {
            if (idea.id == e.target.id) {
                body = idea.idea_data;
            }
        });

        updateProjectIdea(projectid, ideaid, body)
            .then(res => {
                if(res.status !== 200) {
                    console.log(res);
                }
            })
            .catch(err => {throw err});
    }

    handleDeleteIdeaButton(e) {
        // the next line should work, but it returns undefined.
        // const index = Number(e.target.index);

        // const projectid = this.props.match.params.projectid
        // the line above should work, below is just a temporary solution
        const projectid = 1;

        const ideaid = Number(e.target.id);
        const newState = this.state.ideas;

        // newState.splice(index, 1);
        // the line above should work, below is just a temporary solution
        newState.find( idea => {
            if (idea.id == e.target.id) {
                newState.splice(newState.indexOf(idea), 1);
            }
        }); 

        this.setState({ ideas: newState });

        deleteProjectIdea(projectid, ideaid)
            .then(res => {
                if(res.status !== 200) {
                    console.log(res);
                }
            })
            .catch(err => {throw err});
    }

    render() {
        const ideas = this.state.ideas;
        const users = this.state.users;
        const displayIdeas = ideas.map( idea => {
            const i = ideas.indexOf(idea);
            return(
                <div className="ideas-item" key={getUId()}>
                    <section>
                        <label>{(i + 1) + '.'}</label>
                        <input index={i} id={idea.id} value={idea.idea_data} onChange={this.handleChangeIdea}></input>
                    </section>
                    <button className="not-enough-info-btn" index={i} id={idea.id} onClick={this.submitChangeIdea}> Save </button>
                    <span className="delete-x" index={i} id={idea.id} onClick={this.handleDeleteIdeaButton}> &times; </span>
                </div>
            )
        });

        const displayUsers = users.map( user => {
            return(
                <div className="users-item" key={getAltUId()}>
                    <section>
                        <label>{(users[user] + 1) + '.'}</label>
                        <input></input>
                        <input></input>
                        <input></input>
                    </section>
                    <button className="not-enough-info-btn"> Save </button>
                    <span className="delete-x"> &times; </span>
                </div>
            )
        });

        return (
            <div>
                <Header />
                <div className="main-fix">
                    <ProjectSetupSidebar />
                    <div className="ideasUsers-container">
                        <div className="ideasUsers-wrapper">
                            <div className="project-section-header">
                                <label> Ideas & Users </label>
                            </div>
                            <div className="ideas-users-area drop-shadow">
                                <div className="ideas-users-wrapper">
                                    <div className="area-title"> Ideas </div>
                                    <div className="ideas-list">
                                        {displayIdeas}
                                    </div>
                                    <div className="ideas-users-footer">
                                        <button className="add-button" id="ideas" onClick={this.handleAddIdeaButton}> <span/> Add Idea </button>
                                    </div>
                                </div>
                            </div>
                            <div className="ideas-users-area drop-shadow">
                                <div className="ideas-users-wrapper">
                                    <div className="area-title">Users</div>
                                    <div className="users-list">
                                        {displayUsers}
                                    </div>
                                    <div className="ideas-users-footer">
                                        <button className="add-button"> <span/> Add User </button>
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

export default Ideas_Users;
