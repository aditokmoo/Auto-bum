export const ACTIONS = {
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER',
    CLEAR_FORM: 'CLEAR_FORM',
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD'
}

export const AuthReducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.EMAIL:
            return {
                ...state,
                EMAIL: action.payload
            }
        case ACTIONS.PASSWORD:
            return {
                ...state,
                PASSWORD: action.payload
            }
        case ACTIONS.CLEAR_FORM:
            return {
                EMAIL: action.payload,
                PASSWORD: action.payload
            }
    }
}