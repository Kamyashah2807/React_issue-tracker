import * as types from './actionTypes';
import axios from 'axios'

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

const deleteUsers = () => ({
    type: types.DELETE_USER,
})

const addUsers = (user) => ({
    type: types.ADD_USER,
    payload: user
})

const getPosts = (posts) => ({
    type: types.GET_POSTS,
    payload: posts
})

const addPosts = (post) => ({
    type: types.ADD_POST,
    payload: post
})

const deletePosts = () => ({
    type: types.DELETE_POST,
})

export const loadUsers = () => {
    return function (dispatch) {
        axios.get(`http://localhost:8000/users`)
            .then((res) => {
                console.log(res);
                dispatch(getUsers(res.data));
            })
            .catch((err) => console.log(err));
    }
}

export const deleteUser = (id) => {
    return function (dispatch) {
        axios.delete(`http://localhost:8000/users/${id}`)
            .then((res) => {
                console.log(res);
                dispatch(deleteUsers());
                dispatch(loadUsers());

            })
            .catch((err) => console.log(err));
    }
}

export const addUser = (user) => {
    return function (dispatch) {
        axios.post(`http://localhost:8000/users`, user)
            .then((res) => {
                console.log(res);
                dispatch(addUsers());
            })
            .catch((err) => console.log(err));
    }
}

export const loadPosts = () => {
    return function (dispatch) {
        axios.get(`http://localhost:8000/posts`)
            .then((res) => {
                console.log(res);
                dispatch(getPosts(res.data));
            })
            .catch((err) => console.log(err));
    }
}

export const addPost = (post) => {
    return function (dispatch) {
        axios.post(`http://localhost:8000/posts`, post)
            .then((res) => {
                console.log(res);
                dispatch(addPosts());
            })
            .catch((err) => console.log(err));
    }
}

export const deletePost = (id) => {
    return function (dispatch) {
        axios.delete(`http://localhost:8000/posts/${id}`)
            .then((res) => {
                console.log(res);
                dispatch(deletePosts());
                dispatch(loadPosts());

            })
            .catch((err) => console.log(err));
    }
}