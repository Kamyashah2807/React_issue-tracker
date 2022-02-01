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
        image: "",
        description: "",
        status: "",
    });

    let { id } = useParams();
    const { post } = useSelector(state => state.data)

    const { title, image, description, status } = state;
    const [flag, setFlag] = useState(false);

    let dispatch = useDispatch();
    let history = useNavigate();

    function handleInput(e, editor) {
        const data = editor.getData();
        setState({ ...state, description: data });
        console.log(data);
    }

    const handleImage = (e) => {
        console.log(e.target.files[0].name);
        var image = e.target.files[0].name;
        if (e.target.files && e.target.files[0] && e.target.files.length > 0) {
            setState({ ...state, image: image });
        }
        console.log(image);
    }

    useEffect(() => {
        dispatch(getSinglePost(id));
    }, []);

    useEffect(() => {
        if (post) {
            setState({ ...post })
        }
        console.log(post);
    }, [post]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!title || !description || !status || !image) {
            setFlag(true);
        } else {
            dispatch(updatePost(state, id));
            localStorage.setItem("Title", JSON.stringify(title));
            localStorage.setItem("Image", JSON.stringify(image));
            localStorage.setItem("Description", JSON.stringify(description));
            localStorage.setItem("Status", JSON.stringify(status));
            history(`/display-data`)
        }
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
                    <label className='form-label'>File</label>
                    <input
                        type="file"
                        className='form-control'
                        placeholder='Enter File'
                        name="image"
                        onChange={(e) => handleImage(e)}
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