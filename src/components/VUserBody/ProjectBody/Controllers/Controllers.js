import React, { Component } from 'react';
import addIcon from '../../../../img/icons/add-icon.svg';
import './controllers.scss';
import ControllerItem from './ControllerItem/ControllerItem';
import { createProjectController, findProjectControllers, updateProjectController, deleteProjectController } from '../../../../services/project.controller.services';
import { connect } from 'react-redux';
class Controllers extends Component {
  constructor(props) {
      super(props);
      this.state = {
          controllers: []
      };
      this.handleAddController = this.handleAddController.bind(this);
      this.handleChangeInput = this.handleChangeInput.bind(this);
      this.handleSaveChange = this.handleSaveChange.bind(this);
      this.handleDeleteController = this.handleDeleteController.bind(this);
      this.pullFromBackend = this.pullFromBackend.bind(this);
  }

  scrollToBottom = () => {
    this.listEnd.scrollIntoView({ behavior: "smooth" });
  }

  pullFromBackend(projectid, scrollOption){
    findProjectControllers(projectid)
    .then( res => {
        if (res.status === 500) {
            console.log('Internal Server Error');
        }
        else {
            this.setState({controllers: res.data})
            if(scrollOption === 'yesScroll'){
                this.scrollToBottom();
            }
        }
    })
    .catch(err => {throw err});
  }



  componentDidMount() {
      const projectid = this.props.projectInfo.id;
      this.pullFromBackend(projectid, 'noScroll')
  }

  handleAddController() {
    const projectid = this.props.match.params.projectid;
    const reqBody = { controllerName: 'Select View', whenData: '', doData: '', requireData: '' };
    createProjectController(projectid, reqBody)
        .then(res => {
            this.pullFromBackend(projectid, 'yesScroll')
        })
        .catch(err => {throw err});
  }

  handleChangeInput(e, index, field) {
      const newState = this.state.controllers;
      newState[index][field] = e.target.value;
      this.setState({ controllers: newState });
  }

  handleSaveChange(index) {
      const projectid = this.props.projectInfo.id;
      const controllerid = this.state.controllers[index].id;
      const reqBody = {
          controllerName: this.state.controllers[index].controller_name,
          whenData: this.state.controllers[index].when_data,
          doData: this.state.controllers[index].do_data,
          requireData: this.state.controllers[index].require_data
      };

      updateProjectController(projectid, controllerid, reqBody)
        .then( res => {
        })
        .catch(err => {throw err});
  }



  handleDeleteController(index) {
    const projectid = this.props.match.params.projectid;
    const controllerid = this.state.controllers[index].id;
    deleteProjectController(projectid, controllerid)
        .then(res => {
            if (res.status !== 200) {
                console.log(res);
            }
            else {
                this.pullFromBackend(projectid)
            }
        })
        .catch(err => {throw err});
  }

  render() {
    const projectid = this.props.projectInfo.id;
    const controllers = this.state.controllers;
    const displayControllers = controllers.map(controller => {
        const index = controllers.indexOf(controller);
        return <ControllerItem
                    key={index}
                    index={index}
                    controllerid={controller.id}
                    controllerName={controller.controller_name}
                    whenData={controller.when_data}
                    doData={controller.do_data}
                    requireData={controller.require_data}
                    handleDeleteController={this.handleDeleteController}
                    handleChangeInput={this.handleChangeInput}
                    handleSaveChange={this.handleSaveChange}
                    projectid={projectid}
                    handleControllerNameChange={this.handleControllerNameChange}/>
    });

    return (

                <div className="controllers-container">
                    <div className="container-wrapper">
                    <div className="controllers-wrapper">
                        <div className="project-section-header"> Controllers </div>
                        <div className="controller-list">

                            {displayControllers}

                            <button className="add-contro-item" onClick={this.handleAddController}>
                                <div className="add-contro-item-inner">
                                    <div className="add-contro-item-body">
                                        <img src={addIcon} alt="Add New Controller"/>
                                    </div>
                                    <div className="add-contro-item-footer" ref={(el) => { this.listEnd = el; }}>
                                        <label> Add New Controller </label>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>

    );
  }
}
function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps) (Controllers);