import React, { Component } from 'react';
import classnames from 'classnames';
import { findProjectFeature } from '../../../../../services/project.feature.services';

class FeatureItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feature: {},
            UI: { saveBtn: false }
        };
    }

    componentDidMount() {
        const { projectid, id } = this.props;
        findProjectFeature(projectid, id)
            .then(res => {
                if (res.status !== 200){
                    console.log(res)
                }
                else {
                    this.setState({ feature: res.data[0] })
                }
            })
            .catch(err => {throw err});
    }


    render() {
        const { index, featureData, handleChangeFeature, handleDeleteFeature, handleSaveChange } = this.props;
        return (
            <div className="features-item">
                <section>
                    <label>{(index + 1) + '.'}</label>
                    <input value={featureData} onChange={e => { handleChangeFeature(e, index)}} onBlur={e => handleSaveChange(e, index)}/>
                    {/* <input value={featureData} onChange={e => { handleChangeFeature(e, index); this.toggleSaveBtn(e)}}/> */}

                </section>
                {/* <button className="input-complete-btn" onClick={() => handleSubmitFeature(index)}> Save </button> */}
                <button className="delete-x" onClick={() => handleDeleteFeature(index)}> &times; </button>
            </div>
        );
    }
}

export default FeatureItem
