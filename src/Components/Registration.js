import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Registration() {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        usertype: ""
    })

    const [flag, setFlag] = useState(false);
    const { name, email, password, usertype } = state;
    let dispatch = useDispatch();
    let history = useNavigate();

    function handleInput(e) {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !email || !password || !usertype) {
            setFlag(true);
            console.log("Fill details");
        } else {
            dispatch(addUser(state));
            setFlag(false);
            localStorage.setItem("Name", JSON.stringify(name));
            localStorage.setItem("Email", JSON.stringify(email));
            localStorage.setItem("Password", JSON.stringify(password));
            localStorage.setItem("Usertype", JSON.stringify(usertype));
            history('/')
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{
                    margin: "15px", padding: "30px", textAlign: "left"
                }}
            >
                <h1 align="center">Registration Form</h1>
                {flag && (
                    <Alert color="primary" variant="danger">
                        Please Fill Every Field
                    </Alert>
                )}
                <div className='form-group'>
                    <label className='form-label'>User Type</label>
                    <select
                        className='form-select'
                        onChange={handleInput}
                        name="usertype"
                        value={usertype}
                    >
                        <option value>--Select--</option>
                        <option>User</option>
                        <option>Admin</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label className='form-label'>Name</label>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Enter Name'
                        value={name}
                        name='name'
                        onChange={handleInput}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Email</label>
                    <input
                        type="email"
                        className='form-control'
                        placeholder='Enter Email'
                        value={email}
                        name='email'
                        onChange={handleInput}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Password</label>
                    <input
                        type="password"
                        className='form-control'
                        placeholder='Enter Password'
                        value={password}
                        name='password'
                        onChange={handleInput}
                    />
                </div>
                <button
                    style={{ margin: "20px", width: "100px" }}
                    type='submit'
                    className='btn btn-primary'
                >
                    Register
                </button>
                <Link to="/">Already registerd?</Link>
            </form>
        </div>
    )
}

export default Registration;
