import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost, updatePost } from '../../Redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditPost = () => {
    const [state, setState] = useState({
        user_id: localStorage.getItem("Userid"),
        title: "",
        description: "",
        status: "",
    });
    const [show, setShow] = useState(false);

    let { id } = useParams();
    const { post } = useSelector(state => state.data)

    const { title, description, status } = state;
    const [flag, setFlag] = useState(false);

    let dispatch = useDispatch();
    let history = useNavigate();

    function handleInput(e, editor) {
        const data = editor.getData();
        setState({ ...state, description: data });
    }

    useEffect(() => {
        dispatch(getSinglePost(id))
    }, []);

    useEffect(() => {
        if (post) {
            setState({ ...post })
        }
    }, [post]);

    function handleSubmit(e) {

        e.preventDefault();
        if (!title || !description || !status) {
            setFlag(true);
        } else {
            dispatch(updatePost(state, id));
            localStorage.setItem("Title", JSON.stringify(title));
            localStorage.setItem("Description", JSON.stringify(description));
            localStorage.setItem("Status", JSON.stringify(status));
            setShow(false);
            history(`/display-data`)
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
                        value={title || ""}
                        name="title"
                        onChange={(e) => setState({ ...state, title: e.target.value })}
                    />
                </div>

                <div className='form-group'>
                    <label className='form-label'>Description</label>
                    <CKEditor editor={ClassicEditor}
                        onChange={handleInput}
                        value={description || ""}
                        name="description"
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Status</label>
                    <select
                        className='form-select'
                        onChange={(e) => setState({ ...state, status: e.target.value })}
                        value={status || ""}
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
                    Update
                </button>
            </form>
        </div>
    );
}


export default EditPost