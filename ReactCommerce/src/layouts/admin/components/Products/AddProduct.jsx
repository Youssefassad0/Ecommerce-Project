// src/components/ProductForm.js

import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        gender: '',
        original_price: '',
        new_price: '',
        stock: '',
        image: null,
        category_id: '',
        brand: '',
        rating: '',
        rating_count: '',
        sizes: '',
        colors: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'sizes' || key === 'colors') {
                data.append(key, JSON.stringify(formData[key].split(',')));
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post('http://127.0.0.1:8001/api/products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product created successfully:', response.data);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
            <input type="number" step="0.01" name="original_price" value={formData.original_price} onChange={handleChange} placeholder="Original Price" required />
            <input type="number" step="0.01" name="new_price" value={formData.new_price} onChange={handleChange} placeholder="New Price" />
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
            <input type="file" name="image" onChange={handleFileChange} required />
            <input type="number" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required />
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required />
            <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating"  />
            <input type="number" name="rating_count" value={formData.rating_count} onChange={handleChange} placeholder="Rating Count"  />
            <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} placeholder="Sizes (comma-separated)" />
            <input type="text" name="colors" value={formData.colors} onChange={handleChange} placeholder="Colors (comma-separated)" />
            <button type="submit">Create Product</button>
        </form>
    );
};

export default ProductForm;
