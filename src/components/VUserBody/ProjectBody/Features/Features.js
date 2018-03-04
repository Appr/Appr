import React, { Component } from 'react';
import './features.scss';
import FeatureItem from "./FeatureItem/FeatureItem";
import { findProjectFeatures, createProjectFeature, updateProjectFeature, deleteProjectFeature } from '../../../../services/project.feature.services';
import { connect } from 'react-redux';
class Features extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: []
        };
        this.pullFromBackend = this.pullFromBackend.bind(this);
        this.handleAddFeature = this.handleAddFeature.bind(this);
        this.handleChangeFeature = this.handleChangeFeature.bind(this);
        // this.handleSubmitFeature = this.handleSubmitFeature.bind(this);
        this.handleDeleteFeature = this.handleDeleteFeature.bind(this);
        this.handleSaveChange = this.handleSaveChange.bind(this);
    }

    scrollToBottom = () => {
        this.listEnd.scrollIntoView({ behavior: "smooth" });
    }

    pullFromBackend(projectid, scrollOption){
        findProjectFeatures(projectid)
            .then( res => {
                if (res.status !== 200) {
                    alert(res);
                }
                else {
                    this.setState({ features: res.data });
                    if(scrollOption === 'yesScroll'){
                        this.scrollToBottom();
                    }
                }
            })
            .catch(err => {throw err});
    }



    componentDidMount() {
        const projectid = this.props.projectInfo.id;
        this.pullFromBackend(projectid)
    }

    handleAddFeature() {
        const projectid = this.props.projectInfo.id;
        const reqBody = { featureData: '' };
        createProjectFeature(projectid, reqBody)
            .then( res => {
                if (res.status !== 200) {
                    alert(res);
                }
                else {
                    this.pullFromBackend(projectid, 'yesScroll')   
                }
            })
            .catch(err => {throw err});
    }

    handleChangeFeature(e, index) {
        const newState = this.state.features;
        newState[index].feature_data = e.target.value;
        this.setState({ features: newState });
    }



    handleDeleteFeature(index) {
        const projectid = this.props.match.params.projectid;
        const featureid = this.state.features[index].id;
        deleteProjectFeature(projectid, featureid)
            .then( res => {
                if (res.status !== 200) {
                    console.log(res);
                }
                else {
                    this.pullFromBackend(projectid)
                }
            })
            .catch(err => {throw err});
    }

    handleSaveChange(e, index) {
          const projectid = this.props.projectInfo.id;
          const featureid = this.state.features[index].id;
          const reqBody = {
              featureData: this.state.features[index].feature_data
          };
          updateProjectFeature(projectid, featureid, reqBody)
          .then( res => {
              if (res.status !== 200) {
                  alert(res);
              }
          })
          .catch(err => {throw err});
      }




    render() {
        const userid = this.props.userInfo.id;
        const projectid = this.props.projectInfo.id;
        const features = this.state.features;
        const displayFeatures = features.map( (feature, index) => {
            const id = feature.id;
            return (<FeatureItem
                        key={`featuresItem${index}`}
                        index={index}
                        projectid={projectid}
                        id={id}
                        featureData={feature.feature_data}
                        handleChangeFeature={this.handleChangeFeature}
                        handleDeleteFeature={this.handleDeleteFeature}
                        handleSaveChange={this.handleSaveChange} />
            );
        });
        return (
                    <div className="features-container" >


                        <div className="container-wrapper">

                            <div className="project-section-header">
                                <label> Features </label>
                            </div>
                                <div className="features-area drop-shadow">
                                    <div className="features-wrapper">
                                        <div className="features-list">

                                          {displayFeatures}

                                        </div>
                                        <div className="features-footer" ref={(el) => { this.listEnd = el; }}>
                                        <button className="add-button" onClick={this.handleAddFeature}> <span/> Add Feature </button>
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
export default connect(mapStateToProps)(Features);
