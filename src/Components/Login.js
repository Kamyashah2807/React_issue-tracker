import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers } from '../Redux/actions';
import { useNavigate, Link } from 'react-router-dom';
import "../App.css"

function Login() {
    let dispatch = useDispatch();
    let history = useNavigate();
    let { users } = useSelector(state => state.data)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    function handleLogin(e) {
        e.preventDefault();
        if (email === "" || password === "") {
            setFlag("please fill all data");
        }

        else {
            users.map((i) => {
                if (email === i.email && password === i.password) {
                    if (i.usertype === "User") {
                        localStorage.setItem("Userid", i.id);
                        localStorage.setItem("Email", JSON.stringify(email));
                        localStorage.setItem("Password", JSON.stringify(password));
                        localStorage.setItem("Usertype", i.usertype);
                        history(`display-data`);
                    }
                    else {
                        localStorage.setItem("Userid", i.id);
                        localStorage.setItem("Email", JSON.stringify(email));
                        localStorage.setItem("Password", JSON.stringify(password));
                        localStorage.setItem("Usertype", i.usertype);
                        history(`display`)
                    }
                }
                else {
                    setFlag('No login matched instead signup')
                }
            })
        }
    }

    return (
        <div className='outer'>
            <div className='inner'>
                <form
                    onSubmit={handleLogin}
                >
                    <h3 className='col mb-3'>Sign-In</h3>
                    {flag && (
                        <Alert color="primary" variant="danger">
                            Invalid Login Details
                        </Alert>
                    )}
                    <div className='form-group'>
                        <label className='form-label'>Email</label>
                        <input
                            type="email"
                            className='form-control'
                            placeholder='Enter Email'
                            value={email}
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}

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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        style={{ margin: "20px", width: "100px" }}
                        type='submit'
                        className='btn btn-primary'
                    >
                        Login
                    </button>
                    <Link to="/register">Not registerd?</Link>

                </form>
            </div>
        </div>
    )
}

export default Login;