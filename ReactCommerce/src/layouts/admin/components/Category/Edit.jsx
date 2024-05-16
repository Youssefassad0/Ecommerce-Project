import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        async function getCategory() {
            try {
                const res = await axios.get(`http://127.0.0.1:8001/api/category/${id}`);
                const categoryData = res.data.data;
                setData(categoryData);
                setNom(categoryData.nom);
                setDescription(categoryData.description);
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
            const response = await axios.put(`http://127.0.0.1:8001/api/category/${id}`, formData);
            setSuccessMessage('Category updated successfully!');
            console.log(response.data.message);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    console.log(errors);
                }
            } else {
                console.error('Request failed:', error.message);
            }
        }
    };

    return (
        <>
            <div className="app">
                <form className='addCategForm' onSubmit={handleSubmit}>
                    <h1>Edit category</h1>
                    {successMessage && <div className='text-success'>{successMessage}</div>}
                    <div className="formInput">
                        <label>Name :</label>
                        <input type='text' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} />
                        {errors.nom && <span className='text-danger'>{errors.nom[0]}</span>}
                        <label>Description :</label>
                        <input type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        {errors.description && <span className='text-danger'>{errors.description[0]}</span>}
                        <label>Image</label>
                        <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />
                        {errors.image && <span className='text-danger'>{errors.image[0]}</span>}
                    </div>
                    <button type="submit" className='addCateg'>Submit</button>
                </form>
            </div>
        </>
    );
}

export default Edit;
