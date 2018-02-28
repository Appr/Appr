import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './backgroundmenu.scss';
import { findProjectBackgrounds } from '../../../../../services/project.background.services';
import BackgroundItem from './BackgroundItem/BackgroundItem';


export default class BackgroundMenu extends Component {
        constructor(props) {
        super(props);
        this.state = {
            backgrounds: [],
            UI: {backgroundMenu: false}
        };
    }

    componentDidMount(){
        findProjectBackgrounds()
            .then( res => {
                if (res.status !== 200){
                    console.log(res);
                }
                else{
                    this.setState({ backgrounds: res.data })
                }
            })
    }


    render() {


        const { handleProjectBackground, selectedBackground, changeProjectBackground, toggleBackgroundMenu } = this.props;
        const backgrounds = this.state.backgrounds;
        const displayBackgroundItems = backgrounds.map( background => {
            const index = backgrounds.indexOf(background);
            return(
                <BackgroundItem key={index} selected={background.background_url === selectedBackground} backgroundImageSource={background.background_url} creatorName={background.creator_name} portfolio={background.portfolio} handleProjectBackground={handleProjectBackground}/> 
            )
        })


        

        return (
            <div>
                 
                    <div className='project-background-header'>
                        <input className="change-background-url" type="url" placeholder="Enter Image URL" onChange={(e) => this.props.handleProjectBackground(e.target.value)} />
                    </div>
                    
                    <ul className='background-list'>
                            <li className="no-background-box" onClick={(e) => handleProjectBackground('', '#FFF')}>  <label>No Background</label>  </li>
                            {displayBackgroundItems}
                    </ul>

                    <div className='project-background-footer'>
                        <div className="project-sidebar-buttonset">
                            <button onClick={(e) => {changeProjectBackground(), toggleBackgroundMenu()} } className="changeBackgroundBtn">Change</button>
                            <div onClick={(e) => {toggleBackgroundMenu()}} className="closeBackgroundList"> <span /> </div>
                        </div>
                        
                    </div>
                
            </div>
        )
    }
}