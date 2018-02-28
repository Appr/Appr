const UPDATE_DASHBOARD = "UPDATE_DASHBOARD";
const UPDATE_USER = "UPDATE_USER";
const UPDATE_PROJECT = "UPDATE_PROJECT";

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateDashboard(dashboard){
    return {
        type: UPDATE_DASHBOARD,
        payload: dashboard
    }
}

export function updateProjectRedux(project){
    return {
        type: UPDATE_PROJECT,
        payload: project
    }
}