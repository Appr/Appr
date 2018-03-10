const UPDATE_PERSONAL_PROJECTS = "UPDATE_PERSONAL_PROJECTS";
const UPDATE_RECENT_PROJECTS = "UPDATE_RECENT_PROJECTS";
const UPDATE_AUTH = "UPDATE_AUTH";

const UPDATE_USER = "UPDATE_USER";
const UPDATE_PROJECT = "UPDATE_PROJECT";

export function updateAuth(boolean){
    return {
        type: UPDATE_AUTH,
        payload: boolean
    }
}

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updatePersonalProjects(personalProjects){
    return {
        type: UPDATE_PERSONAL_PROJECTS,
        payload: personalProjects
    }
}

export function updateRecentProjects(recentProjects){
    return {
        type: UPDATE_RECENT_PROJECTS,
        payload: recentProjects
    }
}

export function updateProjectRedux(project){
    return {
        type: UPDATE_PROJECT,
        payload: project
    }
}