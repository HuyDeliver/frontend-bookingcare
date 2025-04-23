import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    position: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoading = true
            console.log("check start : ", action)
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state }
            copyState.isLoading = false
            copyState.genders = action.data
            console.log("check success : ", copyState)
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log("check failed : ", action)
            state.isLoading = true
            state.genders = []
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.isLoading = false
            state.position = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoading = true
            state.position = []
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.isLoading = false
            state.roles = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoading = true
            state.roles = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;