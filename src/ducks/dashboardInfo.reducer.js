

var initialState={
    recentProjects: [],
    personalProjects: []
}

function dashboardInfo(state = initialState, action){
    switch(action.type) {

        case "UPDATE_PERSONAL_PROJECTS":
            return Object.assign( {}, state, { personalProjects: action.payload });

        case "UPDATE_RECENT_PROJECTS":
            return Object.assign( {}, state, { recentProjects: action.payload });


        default: return state;
    }
}

export default dashboardInfo;
