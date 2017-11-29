import React, { Component } from 'react';
import './projectcard.scss'
import editIcon from '../../../../../../img/icons/Pencil-Icon.svg';
import CardView from './modals/CardView';
import Modal from 'react-modal';


const CardViewModalBox = {
  
    overlay : {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      overflow: "hidden",
      width: "100%",
      zIndex: "5"
    },
    content : {
      borderRadius: "4px",
      outline: "none",
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "50%",
      bottom: "50%",
      zIndex: "5"
    }
  };

class ProjectCard extends Component {
  constructor(){
    super()
    this.state = {
      cardViewModalOpen: false
    }

    this.openCardView = this.openCardView.bind(this);
    this.closeCardView = this.closeCardView.bind(this);
  }

  openCardView(){
    this.setState({cardViewModalOpen: true})
  }

  closeCardView(){
    this.setState({cardViewModalOpen: false})
  }


  render() {
    return (

     
      <div >
            <li onClick={this.openCardView}><label>{this.props.cardTitle}</label><div className="edit-con"><img src={editIcon} alt="edit"/></div></li>
            
            
            <Modal 
              isOpen ={this.state.cardViewModalOpen} 
              onRequestClose={this.closeCardView}
              className="cardview-container"
              style={CardViewModalBox}
            >
              <CardView listName={this.props.listName} cardTitle={this.props.cardTitle} onCloseBtnClick={this.closeCardView} />
            </Modal>
            

            
      </div>
                       

                      
                  

   
    );
  }
}

export default ProjectCard;