

var initialState={
    id: '',
    username: '',
    avatar: '',
    first_name: '',
    last_name: '',
    email: '',
    
}

function userInfo(state = initialState, action){
console.log('REDUCER HIT: Action ->', action );
    switch(action.type) {
        case "UPDATE_USER":
            return Object.assign( action.payload );     

        default: return state;
    }
}

export default userInfo;