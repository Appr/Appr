import React, { Component } from 'react';
import './idea_users.scss';
import { createProjectIdea, findProjectIdeas, updateProjectIdea, deleteProjectIdea } from '../../../../services/project.idea.services';
import { createProjectUserField, findProjectUserFields, updateProjectUserField, deleteProjectUserField } from '../../../../services/project.userfield.services';
import IdeaField from './Fields/IdeaField';
import UserField from './Fields/Userfield';
import { connect } from 'react-redux';

class Ideas_Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ideas: [],
            userfields: []
        }
        this.handleAddField = this.handleAddField.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.submitChangeField = this.submitChangeField.bind(this);
        this.handleDeleteField = this.handleDeleteField.bind(this);
        this.pullFromDatabase = this.pullFromDatabase.bind(this);
    }

    pullFromDatabase(projectid){
        const ideaExamples = [
            { idea_data: 'e.g. Rule the Galaxy.' },
            { idea_data: 'e.g. Get Baby out of the corner.'}
        ];
        const userfieldExamples = [
            { target_demo_data: 'e.g. Jedi', skill_data: 'diplomacy', description_data: 'what a bunch of squares'},
            { target_demo_data: 'e.g. Sith', skill_data: 'violence', description_data: 'the cool kids table'}
        ];

        findProjectIdeas(projectid)
            .then( res => {
                if (res.status !== 200) {
                    console.log(res);
                }
                else {
                    res.data.length > 0 ? this.setState({ ideas: res.data }) : this.setState({ ideas: ideaExamples });
                }
            })
            .catch(err => {throw err});

        findProjectUserFields(projectid)
            .then(res => {
                if (res.status !== 200) {
                    console.log(res);
                }
                else {
                    res.data.length > 0 ? this.setState({ userfields: res.data }) : this.setState({ userfields: userfieldExamples });
                }
            })
            .catch(err => {throw err});

    }

    componentWillMount() {
        const projectid = this.props.projectInfo.id;
        this.pullFromDatabase(projectid);
    }


    componentWillReceiveProps(nextProps) {
        const projectid = nextProps.projectInfo.id;
        this.pullFromDatabase(projectid);
    }

    handleAddField(field) {
        const projectid = this.props.match.params.projectid
        const newState = this.state[field];
        if (field === 'ideas') {
            const reqBody = {ideaData: ''};
            createProjectIdea(projectid, reqBody)
                .then(res => {
                    if (res.status !== 200) {
                        console.log(res);
                    }
                    else {
                        newState.push(res.data[0]);
                        this.setState({ ideas: newState });
                    }
                })
                .catch(err => {throw err});
        }
        else if (field === 'userfields') {
            const reqBody = { targetDemoData: '', skillData: '', descriptionData: '' };
            createProjectUserField(projectid, reqBody)
                .then(res => {
                    if (res.status !== 200) {
                        console.log(res);
                    }
                    else {
                        newState.push(res.data[0]);
                        this.setState({ userfields: newState });
                    }
                })
                .catch(err => {throw err});
        }
    }

    handleChangeField(e, field, index) {
        const key = e.target.name;
        const value = e.target.value;
        const newState = this.state[field];
        newState[index][key] = value;
        this.setState({ [field]: newState });
    }

    submitChangeField(e, field, index) {
        const key = e.target.name;
        const projectid = this.props.match.params.projectid
        const id = e.target.id;

        if (field === 'ideas') {
            const ideaData = this.state[field][index].idea_data;
            const reqBody = { ideaData };
            updateProjectIdea(projectid, id, reqBody)
            .then(res => {
                if (res.status !== 200) {
                    console.log(res);
                }
            })
            .catch(err => {throw err});
        }
        else if (field === 'userfields') {
            const { target_demo_data, skill_data, description_data } = this.state[field][index];
            const reqBody = {
                targetDemoData: target_demo_data,
                skillData: skill_data,
                descriptionData: description_data
            };
            updateProjectUserField(projectid, id, reqBody)
                .then(res => {
                    if (res.status !== 200) {
                        console.log(res);
                    }
                })
                .catch(err => {throw err});
        }
        
    }

    handleDeleteField(e, field, index) {
        const projectid = this.props.match.params.projectid
        const id = Number(e.target.id);
        const newState = this.state[field];
        newState.splice(index, 1);
        this.setState({ [field]: newState });

        if (field === 'ideas') {
            deleteProjectIdea(projectid, id)
                .then(res => {
                    if (res.status !== 200) {
                        console.log(res);
                    }
                })
                .catch(err => {throw err});
        }
        else if (field === 'userfields') {
            deleteProjectUserField(projectid, id)
                .then(res => {
                    if (res.status !== 200) {
                        console.log(res);
                    }
                })
                .catch(err => {throw err});
        }
    }

    render() {
        const { userid, projectid } = this.props.match.params;
        const ideas = this.state.ideas;
        const userfields = this.state.userfields;
        const displayIdeas = ideas.map( idea => {
            const index = ideas.indexOf(idea);
            return <IdeaField key={`idea-${index}`} index={index} ideaid={idea.id} ideaData={idea.idea_data} handleChangeField={this.handleChangeField} submitChangeField={this.submitChangeField} handleDeleteField={this.handleDeleteField}/>
        });
        const displayUsers = userfields.map( userfield => {
            const index = userfields.indexOf(userfield);
            return <UserField index={index} userfieldid={userfield.id} targetDemoData={userfield.target_demo_data} skillData={userfield.skill_data} descriptionData={userfield.description_data} handleChangeField={this.handleChangeField} submitChangeField={this.submitChangeField} handleDeleteField={this.handleDeleteField}/>
        });

        return (
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
                                        <button className="add-button" id="ideas" onClick={() => this.handleAddField('ideas')}> <span/> Add Idea </button>
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
                                        <button className="add-button"  onClick={() => this.handleAddField('userfields')}> <span/> Add User </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Ideas_Users);
