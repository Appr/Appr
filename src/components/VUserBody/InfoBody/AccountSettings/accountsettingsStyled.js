const ModalBox = {
  overlay : {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
    width: "100%",
    zIndex: "5",
    
  },
  content : {
    borderRadius: "4px",
    outline: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "50%",
    transition: "0.2s ease-in-out",
    zIndex: "6",
  }
};

const ModalBoxBoardMenu = {
  overlay : {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: 'transparent',
    overflow: "hidden",
    width: "100%",
    zIndex: "5",
    
  },
  content : {
    borderRadius: "4px",
    outline: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "50%",
    transition: "0.2s ease-in-out",
    zIndex: "6",
  }
};

export {
    ModalBox,
    ModalBoxBoardMenu
}