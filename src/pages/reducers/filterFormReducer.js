export const filterFormReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_FITLER':
            return {
                ...state,
                [action.payload.id]: action.payload.value
            }
        case 'RESTART_FILTER':
            return {
                ...state,
                model: ''
            }
        default:
            return state
    }
}