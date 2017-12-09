import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import Header from '../../../Header/Header';
import './idea_users.scss';

class Ideas_Users extends Component {
    constructor(props) {
        super(props);
        this.state={
            ideas: {
                arr: [{
                     key: 1,
                     label: 1,
                     name: "What problem(s) does your app solve?"
                    },
                    {
                     key: 2,
                     label: 2,
                     name: "How does it solve those problems?"
                    }]
            },
            users: {
                arr: [{
                     key: 1,
                     label: 1,
                     targetDemographic: 'Target Demographic',
                     techSkill: 'Technology Skill',
                     description: 'Description'
                    }]
            }
        }
        this.addIdeaItemHandler = this.addIdeaItemHandler.bind(this);
        this.removeIdeaItemHandler = this.removeIdeaItemHandler.bind(this);
        this.addUserItemHandler = this.addUserItemHandler.bind(this);
        this.removeUserItemHandler = this.removeUserItemHandler.bind(this);
    }

    addIdeaItemHandler(){
        let IdeaList = this.state.ideas.arr;
        IdeaList.push({
            key: 2,
            label: 2,
            name: 'Type here'
        });
        this.setState({ arr: IdeaList})

    }

    removeIdeaItemHandler(){
        let IdeaList = this.state.ideas.arr;
        IdeaList.splice(1,1);
        this.setState({ arr: IdeaList})
    }

    addUserItemHandler(){
        let UserList = this.state.users.arr;
        UserList.push({
            key: 2,
            label: 2,
            targetDemographic: '15-30',
            techSkill: 'Intermediate',
            description: 'DevMountain Student'
        })
        this.setState({ arr: UserList})
    }

    removeUserItemHandler(){
        let UserList = this.state.users.arr;
        UserList.splice(1,1);
        this.setState({ arr: UserList})
    }

  render() {
      const displayIdeas = this.state.ideas.arr.map( idea => {
        return(
            <div className="ideas-item">
            <section>
                <label>{idea.label + '.'}</label>
                <input placeholder={idea.name}></input>
            </section>
            <button className="not-enough-info-btn">Save</button>
            <span className="delete-x" onClick={this.removeIdeaItemHandler}>&times;</span>
            </div>
        )
      })

      const displayUsers = this.state.users.arr.map( user => {
          return(
            <div className="users-item">
            <section>
            <label>{user.label + '.'}</label>
                <input placeholder={user.targetDemographic}></input>
                <input placeholder={user.techSkill}></input>
                <input placeholder={user.description}></input>
            </section>
            <button className="not-enough-info-btn">Save</button>
            <span className="delete-x" onClick={this.removeUserItemHandler}>&times;</span>
        </div>
              
          )
      })
    return (
      <div>
      <Header />
      <div className="main-fix">
       <ProjectSetupSidebar />

          <div className="ideasUsers-container">
            <div className="ideasUsers-wrapper">
             <div className="project-section-header">
                <label>Ideas & Users</label>
            </div>
                    <div className="ideas-users-area drop-shadow">
                        <div className="ideas-users-wrapper">
                          <div className="area-title">Ideas</div>
                          <div className="ideas-list">

                           {displayIdeas}

                          </div>
                          <div className="ideas-users-footer">
                              <button className="add-button" onClick={this.addIdeaItemHandler}> <span/> Add Idea </button>
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
                              <button className="add-button" onClick={this.addUserItemHandler}> <span/> Add User </button>
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