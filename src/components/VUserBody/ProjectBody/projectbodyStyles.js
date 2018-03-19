import styled from 'styled-components';

let ProjectBodyContainer = styled.div `
    display: flex;

    .project-mobile-bar{
        display: none;
    }


    @media (max-width: 640px){
        flex-directin: column;
        .project-mobile-bar{
            height: 40px;
            display: block;
            position: absolute;
            z-index: 5;
            width: 100%;
        }
        .mobile-project-nav{
            display: block;
        }
        .project-section-header{
            margin-top: 20px;
            label{
                display: none;
            }
        }
    }
`

let Frame = styled.div `
    width: 100%;
    height: calc(100vh - 40px);
    z-index: 0.1; 
    position: absolute;
    overflow: hidden;
`
let BlurOverlay = styled.div `
    top: -10px;
    width: 103%;
    height: 103%;
    filter: blur(7px);
    // background-size: cover;
    // background-repeat: no-repeat;
    z-index: 0; 
    background: ${propsie => propsie.colorTheme || '#FFF'} url("${propsie => propsie.backgroundImage}") 50%/cover no-repeat;
    position: absolute;
    overflow: none;
    transition: 0.3s ease-in-out;
`
export {
    ProjectBodyContainer,
    Frame,
    BlurOverlay
}
