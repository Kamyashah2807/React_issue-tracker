import React, { useState, useEffect } from "react";
import {  Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from 'react-redux';
import { loadUsers,  addUser } from '../../Redux/actions';
import { useNavigate,  } from 'react-router-dom';

const AddUser = () => {
    const [state, setState] = useState({
        user_id: localStorage.getItem("Userid"),
        name: "",
        email: "",
        password: "",
    });
    const [show, setShow] = useState(false);

    const { name, email, password } = state;
    const [flag, setFlag] = useState(false);

    let dispatch = useDispatch();
    let history = useNavigate();

    useEffect(() => {
        dispatch(loadUsers())
    }, []);

    function handleSubmit(e) {
    
        e.preventDefault();
        if (!name || !email || !password) {
            setFlag(true);
        } else {
            dispatch(addUser(state));
            localStorage.setItem("Name", JSON.stringify(name));
            localStorage.setItem("Email", JSON.stringify(email));
            localStorage.setItem("Password", JSON.stringify(password));
            setShow(false);
            history(`/display`)
        }
        setShow(false);
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{ margin: "5px", padding: "5px", textAlign: "left"}}
            >
                {flag && (
                    <Alert color="primary" variant="danger">
                        Please Fill Every Field
                    </Alert>
                )}

                <div className='form-group'>
                    <label className='form-label'>Name</label>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Enter Name'
                        value={name || ""}
                        name="name"
                        onChange={(e) => setState({ ...state, name: e.target.value })}
                    />
                </div>

                <div className='form-group'>
                    <label className='form-label'>Email</label>
                    <input
                        type="email"
                        className='form-control'
                        placeholder='Enter Email'
                        value={email || ""}
                        name="email"
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Password</label>
                    <input
                        type="password"
                        className='form-control'
                        placeholder='Enter password'
                        value={password || ""}
                        name="password"
                        onChange={(e) => setState({ ...state, password: e.target.value })}
                    />
                </div>
                <button
                    style={{ margin: "20px", width: "100px" }}
                    type='submit'
                    className='btn btn-primary'
                >
                    Add
                </button>
            </form>
        </div>
    );
}


export default AddUser