import React, { useState, useEffect } from "react";
import { Modal, Button, Alert, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, loadPosts } from '../../Redux/actions';
import { useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtnGroup } from "mdb-react-ui-kit";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Home() {
    const [state, setState] = useState({
        user_id: localStorage.getItem("Userid"),
        title: "",
        description: "",
        status: "",
    });
    const [flag, setFlag] = useState(false);

    let dispatch = useDispatch();
    let history = useNavigate();
    let { posts } = useSelector(state => state.data);

    useEffect(() => {
        dispatch(loadPosts());
    }, []);

    const [show, setShow] = useState(false);

    const { title, description, status } = state;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInput = (e, editor) => {
        const data = editor.getData();
        setState({ ...state, description: data });
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        history("/");
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure wanted to delete?")) {
            dispatch(deletePost(id));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !status) {
            setFlag(true);
        } else {
            dispatch(addPost(state));
            window.location.reload();
            localStorage.setItem("Title", JSON.stringify(title));
            localStorage.setItem("Description", JSON.stringify(description));
            localStorage.setItem("Status", JSON.stringify(status));
            history(`/display-data`)
        }
        setShow(false);
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Issue</Modal.Title>
                </Modal.Header>
                <form
                   
                    style={{ margin: "5px", padding: "5px", textAlign: "left" }}
                >
                    {flag && (
                        <Alert color="primary" variant="danger">
                            Please Fill Every Field
                        </Alert>
                    )}

                    <div className='form-group'>
                        <label className='form-label'>Title</label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter Title'
                            value={title}
                            name="title"
                            onChange={(e) => setState({ ...state, title: e.target.value })}
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label'>Description</label>
                        <CKEditor editor={ClassicEditor}
                            onChange={handleInput}
                            value={description}
                            name="description"
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Status</label>
                        <select
                            className='form-select'
                            onChange={(e) => setState({ ...state, status: e.target.value })}
                            value={status}
                            name="status"
                        >
                            <option value>--Select--</option>
                            <option>Open</option>
                            <option>Processing</option>
                            <option>In Review</option>
                            <option>Completed</option>
                        </select>
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
                <MDBContainer>
                    <MDBBtnGroup className="btn btn-success" onClick={handleShow}>Add Issue</MDBBtnGroup> &nbsp;
                    <MDBBtnGroup className="btn btn-warning" onClick={handleLogout}>Logout</MDBBtnGroup>

                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <h2>Display Table</h2>
                        <MDBRow>
                            <MDBCol>
                                <MDBTable>
                                    <MDBTableHead dark>
                                        <tr align="center">
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </MDBTableHead>

                                    {posts.filter((user) => { return localStorage.getItem("Userid") === user.user_id }).map(post => (
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
                                                <td>
                                                    <MDBBtnGroup className='btn btn-primary' onClick={() => history(`/edit/${post.id}`)}>Edit</MDBBtnGroup> &nbsp;
                                                    <MDBBtnGroup className='btn btn-danger' onClick={() => handleDelete(post.id)}>Delete</MDBBtnGroup>
                                                </td>
                                            </tr>
                                        </MDBTableBody>
                                    ))
                                    }
                                </MDBTable>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </MDBContainer>
            </div>
        </div>
    )
}

export default Home