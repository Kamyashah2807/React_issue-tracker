import * as types from './actionTypes';

const initialState = {
    users: [],
    user: {},
    posts: [],
    post: {},
    loading: true,
}

const usersReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case types.GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case types.DELETE_USER:
            return {
                ...state,
                loading: false
            }
        case types.ADD_USER:
            return {
                ...state,
                loading: false
            }
        case types.GET_SINGLE_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case types.ADD_POST:
            return {
                ...state,
                loading: false
            }
        case types.DELETE_POST:
            return {
                ...state,
                loading: false
            }
        case types.GET_SINGLE_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            }
        case types.UPDATE_POST:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default usersReducers;