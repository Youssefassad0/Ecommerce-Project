import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {
    const { id } = useParams();
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function getCategory() {
            try {
                const res = await axios.get(`http://127.0.0.1:8001/api/category/${id}`);
                setNom(res.data.data.nom);
                setDescription(res.data.data.description);
            } catch (err) {
                console.log('Error de Server : ' + err);
            }
        }
        getCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await axios.put(`http://127.0.0.1:8001/api/category/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessMessage('Category updated successfully!');
            console.log(response.data.message);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    const errorData = error.response.data;
                    setErrorMessage(errorData.message);
                }
            } else {
                console.error('Request failed:', error.message);
            }
        }
    };

    return (
        <div className="app">
            <form className='addCategForm' onSubmit={handleSubmit}>
                <h1>Edit category</h1>
                <div className="formInput">
                    <label>Name :</label>
                    <input type='text' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} />
                    <label>Description :</label>
                    <input type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label>Image</label>
                    <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />
                </div>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" className='addCateg'>Update</button>
            </form>
        </div>
    );
}

export default Edit;
