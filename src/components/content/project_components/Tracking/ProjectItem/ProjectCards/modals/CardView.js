import React, { Component } from 'react';
import './cardview.scss'
import PropTypes from 'prop-types';
import DueDateIcon from '../../../../../../../img/icons/due-date-icon.svg';
import LabelIcon from '../../../../../../../img/icons/label-icon.svg';
import CopyIcon from '../../../../../../../img/icons/copy-icon.svg';
import MoveIcon from '../../../../../../../img/icons/move-icon.svg';
import MembersIcon from '../../../../../../../img/icons/member-icon.svg';

class CardView extends Component {
  render() {
    return (
    <div className="cardview-parent">
    
      <div className="cardview-container">
        <div className="cardview-inner">
          <div className="cardview-left">
              <section className="cardview-header">
                  <div className="cardview-title">
                      {this.props.taskName}
                  </div>
                  <div className="cardview-fromlist">
                      In list <b>{this.props.listName}</b>
                  </div>
              </section>
              <section className="cardview-body">
                    <label> Add Comment</label>
                    <textarea  />
                    <button className="not-enough-info-btn"> Save </button>
              </section>
              <div className="cardview-footer">
              </div>

          </div>
          <div className="cardview-right">
                <section className="top-con">
                    <span onClick={this.props.onCloseBtnClick}> &times; </span>
                </section>
                <section className="side-group-menu">
                    <div className="cv-side-title">
                        Actions
                    </div>
                    <div className="side-options">
                        <button className="btn-and-icon">
                            <div className="label-icon-con">
                                <img src={MoveIcon} />
                                <label> Move </label> 
                            </div>
                        </button>
                        <button className="btn-and-icon">
                            <div className="label-icon-con">
                                <img src={CopyIcon} />
                                <label> Copy </label> 
                            </div>
                        </button>
                    </div>
                </section>

                <section className="side-group-menu">
                    <div className="cv-side-title">
                        Add
                    </div>
                    <div className="side-options">
                        <button className="btn-and-icon">
                            <div className="label-icon-con">
                                <img src={MembersIcon} />
                                <label> Members </label> 
                            </div>
                        </button>
                        <button className="btn-and-icon">
                            <div className="label-icon-con">
                                <img src={DueDateIcon} />
                                <label> Due Date </label> 
                                </div>
                        </button>
                        <button className="btn-and-icon">
                            <div className="label-icon-con">
                                <img src={LabelIcon} />
                                <label> Labels </label> 
                            </div>
                        </button>
                        <button className="btn-and-icon delete-task-btn" onClick={this.props.onDeleteTaskClick} >
                            <div className="label-icon-con">
                                <label > Delete </label> 
                            </div>
                        </button>
                    </div>
                </section>

          </div>
      </div>
      </div>
    </div>

                       

                      
                  

   
    );
  }
}

CardView.propTypes = {
     onCloseBtnClick: PropTypes.func, 
     onDeleteTaskClick: PropTypes.func 
    }
CardView.defaultProps = {
     onCloseBtnClick: () => {} , 
     onDeleteTaskClick: () => {
         console.log('defaultTaskClick')
     }
    }

export default CardView;