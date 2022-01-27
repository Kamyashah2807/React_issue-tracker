import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtnGroup } from "mdb-react-ui-kit";
import { deleteUser, loadUsers, loadPosts } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Display() {
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        history("/");
    }

    const handleAdd = (e) => {
        e.preventDefault();
        history(`/adduser`);
    }

    return (
        <MDBContainer>
            <div style={{ marginTop: "20px", textAlign: "right" }}>
            <MDBBtnGroup className="btn btn-success" onClick={handleAdd}>Add User</MDBBtnGroup> &nbsp;
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
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </MDBTableHead>

                                {posts.filter((val) => {
                                    if (searchTerm === "") {
                                        return val
                                    }
                                    else if (val.title.toLowerCase().includes(searchTerm.toLowerCase()) || val.description.toLowerCase().includes(searchTerm.toLowerCase()) || val.status.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val;
                                    }
                                }).map((post) => (
                                    <MDBTableBody key={post.id}>
                                        <tr align="center">
                                            <td>{post.title}</td>
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