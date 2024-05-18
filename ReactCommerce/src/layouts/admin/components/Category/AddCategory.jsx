import React, { useState } from 'react';
import './AddC.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const nav=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('image', image);
    try {
      const response = await axios.post('http://127.0.0.1:8001/api/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Category added successfully!',
        });
        setNom('');
        setDescription('');
        setImage(null);
        setErrors({}); 
nav('/dashboard/category')
      }
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
  }

  return (
    <>
      <div className="app">
        <form className='addCategForm' onSubmit={handleSubmit}>
          <h1>Add category</h1>
          <div className="formInput">
            <label>Name :</label>
            <input type='text' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} />
            { errors.nom && <span className='text-danger'>{errors.nom[0]}</span>}
            <label>Description :</label>
            <input type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
            { errors.description && <span className='text-danger'>{errors.description[0]}</span>}
            <label>Image</label>
            <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />
            { errors.image && <span className='text-danger'>{errors.image[0]}</span>}
          </div>
          <button type="submit" className='addCateg'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default AddCategory;
