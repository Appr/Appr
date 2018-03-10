import React, { Component } from 'react';
import classnames from 'classnames';
import { findProjectView } from '../../../../../services/project.view.services';

class ViewItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            view: {},
            UI: { saveBtn: false }
        };
    }

    componentDidMount(){
        const { projectid, id } = this.props;
        console.log(projectid);
        findProjectView(projectid, id)
            .then(res => {
                if(res.status !== 200){
                    console.log(res)
                }
                else {
                    this.setState({view: res.data[0] })
                }
            })
            .catch(err => {throw err});
    }

    render(){
        const { key, index, id, viewName, viewImageUrl, handleChangeView, handleDeleteViewButton, handleSaveChange } = this.props;
        return (
            <div className="view-item" key={key}>
                <section>
                    <label>{(index + 1) + '.'}</label>
                    <input className="view-input-name" type="text" placeholder="Name" id={id} value={viewName} onChange={e => handleChangeView(e, index, "name")} onBlur={e => handleSaveChange(e, index)}/>
                    <input className="view-input-imgurl" type="text" placeholder="Wireframe URL" id={id} value={viewImageUrl} onChange={e => handleChangeView(e, index, "image_url")} onBlur={e => handleSaveChange(e, index)}/>
                </section>
                    {/* <button className="input-complete-btn"  id={view.id} onClick={e => this.submitChangeView(e, index)}>Save</button> */}
                    <button className="delete-x" id={id} onClick={e => handleDeleteViewButton(e, index)}>&times;</button>
            </div>
        );
    }
}

export default ViewItem;