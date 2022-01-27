import * as types from './actionTypes';
import axios from 'axios'

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

const deleteUsers = () => ({
    type: types.DELETE_USER,
})

const getsingleUsers = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user
})

const updatedUsers = () => ({
    type: types.UPDATE_USER,
})

const addUsers = (user) => ({
    type: types.ADD_USER,
    payload: user
})

const getPosts = (posts) => ({
    type: types.GET_POSTS,
    payload: posts
})

const addPosts = () => ({
    type: types.ADD_POST,
})

const getsinglePosts = (post) => ({
    type: types.GET_SINGLE_POST,
    payload: post
})

const updatedPosts = () => ({
    type: types.UPDATE_POST,
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

export const getSingleUser = (id) => {
    return function (dispatch) {
        axios.get(`http://localhost:8000/users/${id}`)
            .then((res) => {
                console.log(res);
                dispatch(getsingleUsers(res.data));

            })
            .catch((err) => console.log(err));
    }
}

export const updateUser = (user, id) => {
    return function (dispatch) {
        axios.put(`http://localhost:8000/users/${id}`, user)
            .then((res) => {
                console.log(res);
                dispatch(updatedUsers());

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

export const getSinglePost = (id) => {
    return function (dispatch) {
        axios.get(`http://localhost:8000/posts/${id}`)
            .then((res) => {
                console.log(res);
                dispatch(getsinglePosts(res.data));

            })
            .catch((err) => console.log(err));
    }
}

export const updatePost = (post, id) => {
    return function (dispatch) {
        axios.put(`http://localhost:8000/posts/${id}`, post)
            .then((res) => {
                console.log(res);
                dispatch(updatedPosts());

            })
            .catch((err) => console.log(err));
    }
} 