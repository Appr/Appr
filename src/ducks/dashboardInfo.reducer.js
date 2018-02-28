

var initialState={
    groups: [],
    projects: []

}

function dashboardInfo(state = initialState, action){
console.log('REDUCER HIT: Action ->', action );
    switch(action.type) {
        case "UPDATE_DASHBOARD":
            return Object.assign( action.payload );     

        default: return state;
    }
}

export default dashboardInfo;
