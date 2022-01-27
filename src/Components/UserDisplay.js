import React, { useState, useEffect } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, loadPosts} from '../Redux/actions';
import { useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtnGroup } from "mdb-react-ui-kit";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const AddPost = () => {
    const [state, setState] = useState({
        user_id: localStorage.getItem("Userid"),
        title: "",
        description: "",
        status: "",
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { title, description, status } = state;
    const [flag, setFlag] = useState(false);

    let dispatch = useDispatch();

    function handleInput(e, editor) {
        const data = editor.getData();
        setState({ ...state, description: data });
    }

    useEffect(() => {
        dispatch(loadPosts());
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!title || !description || !status) {
            setFlag(true);
        } else {
            dispatch(addPost(state));
            localStorage.setItem("Title", JSON.stringify(title));
            localStorage.setItem("Description", JSON.stringify(description));
            localStorage.setItem("Status", JSON.stringify(status));
            setShow(false);
        }
        setShow(false);
    }

    return (
        <div>
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
                <button
                    style={{ margin: "20px", width: "100px" }}
                    type='submit'
                    className='btn btn-primary'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default function DisplayPost() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let dispatch = useDispatch();
    const { posts } = useSelector(state => state.data);
    let history = useNavigate();

    useEffect(() => {
        dispatch(loadPosts());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(false);
        handleClose(false);
    };

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

    return (
        <div style={{ marginTop: "20px", textAlign: "right" }}>
            <MDBContainer>
                <MDBBtnGroup className="btn btn-success" onClick={handleShow}>Add Issue</MDBBtnGroup> &nbsp;
                <MDBBtnGroup className="btn btn-danger" onClick={handleLogout}>Logout</MDBBtnGroup>

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
                                        <th scope="col">Action</th>
                                    </tr>
                                </MDBTableHead>

                                {posts.filter((user) => { return localStorage.getItem("Userid") === user.user_id }).map(post => (
                                    <MDBTableBody key={post.id}>
                                        <tr align="center">
                                            <td>{post.title}</td>
                                            <td> <div dangerouslySetInnerHTML={{ __html: post.description }} /></td>
                                            <td>{post.status}</td>
                                            <td>
                                                <MDBBtnGroup className='btn btn-primary' onClick={() => handleDelete(post.id)}>Delete</MDBBtnGroup>
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Issue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddPost onSubmit={handleSubmit} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}