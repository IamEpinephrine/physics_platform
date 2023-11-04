import React, {useId, useState} from 'react';
import "../styles/AddModel.css";

function AddModel(setErrorMessage) {
    const [image, setImage] = useState()
    const [model, setModel] = useState()
    const [name, setName] = useState()
    const [imgname, setImgName] = useState()
    const [modelname, setModelName] = useState()

    function handleImage(event) {
        setImage(event.target.files[0])
        setImgName(event.target.files[0].name)
        console.log(event.target.files[0])
    }

    function handleModel(event) {
        setModel(event.target.files[0])
        setModelName(event.target.files[0].name)
        console.log(event.target.files[0])
    }

    function handleUpload(e){
        handleModelUpload(e);
    }
    const handleModelUpload= async (e) => {
        e.preventDefault();

        const formData = new FormData;
        formData.append('name', name)
        formData.append('imgname', imgname)
        formData.append('modelname', modelname)
        formData.append('icon', image)
        formData.append('model', model)

        const requestOptions = {
            method: "POST",
            body: formData
        };
        const response = await fetch("http://localhost:8000/api/models", requestOptions);
        if(!response) {
            setErrorMessage("Model cannot be uploaded")
        } else {
        }
    };
    /* const handleImageUpload= async (e) => {
        e.preventDefault();
        const formData = new FormData;
        formData.append('icon', image)
        formData.append('model', model)
        const requestOptions = {
            method: "POST",
            body: formData
        };
        const response = await fetch("http://localhost:8000/api/uploadModel", requestOptions);
        if(!response) {
            setErrorMessage("Model cannot be uploaded")
        } else {
        }
    };*/

    return (
        <div>
            <h2>Upload your JS model</h2>
            <form onSubmit={handleUpload}>
                <div className='field'>
                    <label className='label'>Name</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='field'>
                    <label className='label'>Small image</label>
                    <input type="file" name="image" onChange={handleImage}/>
                </div>
                <div className='field'>
                    <label className='label'>Source code file</label>
                    <input type="file" name="model" onChange={handleModel}/>
                </div>
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}


export default AddModel;