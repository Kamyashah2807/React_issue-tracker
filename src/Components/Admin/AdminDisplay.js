import React, { useState, useEffect } from "react";
import { Modal, Badge, Button, Alert } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtnGroup } from "mdb-react-ui-kit";
import { deleteUser, loadUsers, loadPosts, addUser } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Display() {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState({
        user_id: localStorage.getItem("Userid"),
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = state;
    const [flag, setFlag] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let dispatch = useDispatch();

    const { users } = useSelector(state => state.data);
    const { posts } = useSelector(state => state.data);

    let history = useNavigate();

    useEffect(() => {
        dispatch(loadUsers());
        dispatch(loadPosts())
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure wanted to delete?")) {
            dispatch(deleteUser(id));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setFlag(true);
        } else {
            dispatch(addUser(state));
            window.location.reload();
            localStorage.setItem("Name", JSON.stringify(name));
            localStorage.setItem("Email", JSON.stringify(email));
            localStorage.setItem("Password", JSON.stringify(password));
            history(`/display`)
        }
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        history("/");
    }

    return (
        <MDBContainer>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Issue</Modal.Title>
                </Modal.Header>
                <form
                    onSubmit={handleSubmit}
                    style={{ margin: "5px", padding: "5px", textAlign: "left" }}
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
                </form>
                <button
                    style={{ margin: "20px", width: "100px" }}
                    type='submit'
                    className='btn btn-primary'
                    onClick={handleSubmit}
                >
                    Submit
                </button>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div style={{ marginTop: "20px", textAlign: "right" }}>
                <MDBBtnGroup className="btn btn-success" onClick={handleShow}>Add User</MDBBtnGroup> &nbsp;
                <MDBBtnGroup className="btn btn-warning" onClick={handleLogout}>Logout</MDBBtnGroup>

                <form style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center"
                }}
                    className="d-flex input-group w-auto"
                >
                    <input type="text" placeholder="Search here...." onChange={e => setSearchTerm(e.target.value)} />

                </form>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <h2>Display Table</h2>
                    <MDBRow>
                        <MDBCol size="12">
                            <MDBTable>
                                <MDBTableHead dark>
                                    <tr align="center">
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Action</th>
                                    </tr>
                                </MDBTableHead>

                                {users.filter((val) => {
                                    if (searchTerm === "") {
                                        return val
                                    }
                                    else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val;
                                    }
                                }).map((user) => (
                                    <MDBTableBody key={user.id}>
                                        <tr align="center">
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.password}</td>
                                            <td>
                                                <MDBBtnGroup className='btn btn-primary' onClick={() => history(`/edit-user/${user.id}`)}>Edit</MDBBtnGroup> &nbsp;
                                                <MDBBtnGroup className='btn btn-danger' onClick={() => handleDelete(user.id)}>Delete</MDBBtnGroup>
                                            </td>
                                        </tr>
                                    </MDBTableBody>
                                ))
                                }
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                </div>

                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <h2>Display Table</h2>
                    <MDBRow>
                        <MDBCol>
                            <MDBTable>
                                <MDBTableHead dark>
                                    <tr align="center">
                                        <th>User Id</th>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>
                                </MDBTableHead>

                                {users && posts.filter((val) => {
                                    if (searchTerm === "") {
                                        return val
                                    }
                                    else if (val.title.toLowerCase().includes(searchTerm.toLowerCase()) || val.description.toLowerCase().includes(searchTerm.toLowerCase()) || val.status.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val;
                                    }
                                }).map((post, user) => (
                                    <MDBTableBody key={post.id}>
                                        <tr align="center">
                                            <td>{post.user_id}</td>
                                            <td>{post.title}</td>
                                            <td>{post.image ? <img src={require(`../images/${post.image}`)} style={{ height: "100px", width: "100px" }} /> : null}</td>
                                            <td><div dangerouslySetInnerHTML={{ __html: post.description }} /></td>
                                            <td>
                                                {post.status === "Open" ? <Badge bg="primary">{post.status}</Badge> : null}
                                                {post.status === "Processing" ? <Badge bg="info">{post.status}</Badge> : null}
                                                {post.status === "In Review" ? <Badge bg="warning">{post.status}</Badge> : null}
                                                {post.status === "Completed" ? <Badge bg="success">{post.status}</Badge> : null}
                                            </td>
                                        </tr>
                                    </MDBTableBody>
                                ))
                                }
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        </MDBContainer>
    )
}

export default Display