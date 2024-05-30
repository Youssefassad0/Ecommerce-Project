import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Edit() {
    const { id } = useParams();
    const [inputs, setInputs] = useState([]);
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});

    const nav = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const uploadProduct = async (e) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nom', inputs.nom);
        formData.append('description', inputs.description);
        formData.append('image', image)
        const response = await axios.post("http://127.0.0.1:8001/api/category/" + id, formData, {
            headers: { 'Content-Type': "multipart/form-data" },
        })
        console.log(response);
        setTimeout(() => {
            nav('/dashboard/category')
        }, 1000)

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadProduct();
    }
    useEffect(() => {
        getCategory();
    }, [])

    function getCategory() {
        axios.get('http://127.0.0.1:8001/api/category/' + id).then(function (res) {
            console.log(res);
            setInputs(res.data.data)
        })
    }
    return (
        <div className="app">
            <form className='addCategForm' onSubmit={handleSubmit} >
                <h1>Edit category</h1>
                <div className="formInput">
                    <label>Name :</label>
                    <input type='text' name='nom' value={inputs.nom} onChange={handleChange} />
                    {errors.nom && <span className='text-danger'>{errors.nom[0]}</span>}
                    <label>Description :</label>
                    <input type='text' name='description' value={inputs.description} onChange={handleChange} />
                    {errors.description && <span className='text-danger'>{errors.description[0]}</span>}
                    <label>Image</label>
                    <img src={`http://127.0.0.1:8001/${inputs.image}`} alt="img category" style={{ width: '30px', height: '30px' }} />
                    <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />
                    {errors.image && <span className='text-danger'>{errors.image[0]}</span>}
                </div>
                <button type="submit" className='addCateg'>Update</button>
            </form>
        </div>
    )
}

export default Edit