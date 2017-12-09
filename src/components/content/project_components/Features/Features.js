import React, { Component } from 'react';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import './features.scss';
import Header from '../../../Header/Header';

class Features extends Component {
  constructor(props) {
    super(props);
    this.state={
        features: {
               arr: [{
                   key: 1,
                   label: 1,
                   name: 'Write use cases for your app'
                 }]
        }
    }
    this.addFeatureItemHandler = this.addFeatureItemHandler.bind(this);
    this.removeFeatureItemHandler = this.removeFeatureItemHandler.bind(this);
  }

  addFeatureItemHandler(){
    let FeatureList = this.state.features.arr;
    FeatureList.push({
      key: 2,
      label: 2,
      name: 'Type here'
    })
    this.setState({ arr: FeatureList})
  }

  removeFeatureItemHandler(){
    let FeatureList = this.state.features.arr;
    FeatureList.splice(1,1);
    this.setState({arr: FeatureList})
  }



  render() {
    const displayFeatures = this.state.features.arr.map( feature => {
      return(

        <div className="features-item">
          <section>
            <label>{feature.label + '.'}</label>
            <input placeholder={feature.name}/>
          </section>
          <button className="not-enough-info-btn">Save</button>
          <span className="delete-x" onClick={this.removeFeatureItemHandler}>&times;</span> 
        </div>

      )
    })
    return (
      <div>
      <Header />
      <div className="main-fix">
        <ProjectSetupSidebar />
          <div className="features-container">
            <div className="container-wrapper">
                <div className="project-section-header">
                  <label>Features</label> 
                </div>
                    <div className="features-area drop-shadow">
                      <div className="features-wrapper">
                        <div className="features-list">

                          {displayFeatures}

                        </div>
                        <div className="features-footer">
                              <button className="add-button" onClick={this.addFeatureItemHandler}> <span/>  Add Feature </button>
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

export default Features;